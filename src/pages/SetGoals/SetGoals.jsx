import { useState, useEffect } from "react";
import styles from "./SetGoals.module.css";
import { auth, database } from "../../FirebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";

const SetGoals = () => {
  const [goalInput, setGoalInput] = useState("");
  const [goals, setGoals] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        const userDocRef = doc(database, "users", firebaseUser.uid);

        try {
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            const data = userDocSnap.data();
            setGoals(data.dailyGoals || []);
          } else {
            // Opprett dokument hvis det ikke finnes
            await setDoc(userDocRef, { dailyGoals: [] });
            setGoals([]);
          }
        } catch (error) {
          console.error("Feil ved henting av mål:", error);
        }
      } else {
        setUser(null);
        setGoals([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleAddGoal = (e) => {
    e.preventDefault();
    if (!goalInput.trim()) return;

    setGoals((prevGoals) => [...prevGoals, goalInput.trim()]);
    setGoalInput("");
    setMessage("");
  };

  const handleDeleteGoal = (indexToDelete) => {
    setGoals((prevGoals) =>
      prevGoals.filter((_, index) => index !== indexToDelete)
    );
    setMessage("");
  };

  const handleSave = async () => {
    if (!user) {
      setMessage("Du må være logget inn for å lagre målene dine.");
      return;
    }

    const userDocRef = doc(database, "users", user.uid);
    try {
      await updateDoc(userDocRef, {
        dailyGoals: goals,
      });
      setMessage("Målene dine er lagret! ✅");
    } catch (error) {
      console.error("Feil ved lagring:", error);
      setMessage("Kunne ikke lagre målene dine.");
    }
  };

  return (
    <section className={styles.goalSection}>
      <div className={styles.container}>
        <h1 className={styles.heading}>🎯 Set Your Fitness Goals</h1>

        <form onSubmit={handleAddGoal} className={styles.goalForm}>
          <input
            type="text"
            value={goalInput}
            onChange={(e) => setGoalInput(e.target.value)}
            placeholder="Add a goal (e.g., Run 5km)"
            className={styles.goalInput}
          />
          <button type="submit" className={styles.addButton}>
            Add
          </button>
        </form>

        <ul className={styles.goalList}>
          {goals.map((goal, index) => (
            <li key={index} className={styles.goalItem}>
              {goal}
              <button
                onClick={() => handleDeleteGoal(index)}
                className={styles.deleteButton}
              >
                ❌
              </button>
            </li>
          ))}
        </ul>

        <button onClick={handleSave} className={styles.saveButton}>
          Save Goals
        </button>

        {message && <p className={styles.feedback}>{message}</p>}
      </div>
    </section>
  );
};

export default SetGoals;
