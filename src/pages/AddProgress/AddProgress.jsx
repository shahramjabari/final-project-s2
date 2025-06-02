import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { auth, database } from "../../FirebaseConfig";
import styles from "./AddProgress.module.css";
import Button from "../../Components/Button/Button";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";

const AddProgress = () => {
  const [entry, setEntry] = useState({
    exercise: "",
    sets: "",
    reps: "",
    note: "",
  });

  const [progressList, setProgressList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEntry((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    const user = auth.currentUser;
    if (!user) return;

    if (
      !entry.exercise.trim() ||
      !entry.sets ||
      !entry.reps ||
      parseInt(entry.sets) <= 0 ||
      parseInt(entry.reps) <= 0
    ) {
      setErrorMessage("Please enter valid exercise details.");
      return;
    }

    try {
      await addDoc(collection(database, "users", user.uid, "progress"), {
        ...entry,
        createdAt: serverTimestamp(),
      });

      setEntry({ exercise: "", sets: "", reps: "", note: "" });
      fetchProgress();
    } catch {
      setErrorMessage("Failed to save progress. Please try again.");
    }
  };

  const fetchProgress = async () => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      const snapshot = await getDocs(
        collection(database, "users", user.uid, "progress")
      );

      const list = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProgressList(list);
    } catch {
      setErrorMessage("Error loading progress list.");
    } finally {
      setLoading(false);
    }
  };

  const deleteProgress = async (id) => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      await deleteDoc(doc(database, "users", user.uid, "progress", id));
      setProgressList((prev) => prev.filter((item) => item.id !== id));
    } catch {
      setErrorMessage("Failed to delete progress. Try again.");
    }
  };

  useEffect(() => {
    fetchProgress();
  }, []);

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Log Your Workout Progress 📝</h2>

        <input
          name="exercise"
          type="text"
          placeholder="Exercise name"
          value={entry.exercise}
          onChange={handleChange}
          required
        />
        <input
          name="sets"
          type="number"
          placeholder="Sets"
          value={entry.sets}
          onChange={handleChange}
          min="0"
          required
        />
        <input
          name="reps"
          type="number"
          placeholder="Reps"
          value={entry.reps}
          onChange={handleChange}
          min="0"
          required
        />
        <textarea
          name="note"
          placeholder="Additional notes"
          value={entry.note}
          onChange={handleChange}
          rows="4"
        />
        {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
        <Button type="submit">Save Progress</Button>
      </form>

      <div className={styles.progressList}>
        <h3>📋 Logged Workouts</h3>
        {loading ? (
          <LoadingSpinner />
        ) : progressList.length === 0 ? (
          <p>No workouts logged yet.</p>
        ) : (
          <ul className={styles.list}>
            {progressList.map((item) => (
              <li key={item.id} className={styles.item}>
                <div>
                  <p>
                    <strong>{item.exercise}</strong> – {item.sets} x {item.reps}
                  </p>
                  {item.note && <p>📝 {item.note}</p>}
                  <p className={styles.date}>
                    {item.createdAt?.toDate
                      ? `Logged on: ${item.createdAt.toDate().toLocaleString()}`
                      : "Date unknown"}
                  </p>
                </div>
                <Button
                  className={styles.deleteButton}
                  onClick={() => deleteProgress(item.id)}
                >
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AddProgress;
