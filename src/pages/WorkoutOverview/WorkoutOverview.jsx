import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, database } from "../../FirebaseConfig";
import styles from "./WorkoutOverview.module.css";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";

const WorkoutOverview = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUserEmail(firebaseUser.email);
        try {
          const userDocRef = doc(database, "users", firebaseUser.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const data = userDocSnap.data();
            setGoals(data.dailyGoals || []);
          }
        } catch {
          setError("Failed to fetch your goals. Please try again later.");
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className={styles.workoutOverviewContainer}>
      <h1 className={styles.title}>📊 Your Fitness Goals</h1>

      {error && <p className={styles.errorMessage}>{error}</p>}

      {goals.length ? (
        <ul className={styles.goalList}>
          {goals.map((goal, index) => (
            <li key={index} className={styles.goalItem}>
              {goal}
            </li>
          ))}
        </ul>
      ) : (
        !error && (
          <p>
            No goals found for {userEmail || "user"}. Go to{" "}
            <strong>"Set Goals"</strong> to add your goals.
          </p>
        )
      )}
    </div>
  );
};

export default WorkoutOverview;
