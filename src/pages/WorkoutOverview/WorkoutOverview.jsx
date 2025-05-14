import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, database } from "../../FirebaseConfig";
import styles from "./WorkoutOverview.module.css";

const WorkoutOverview = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState(null);

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
        } catch (error) {
          console.error("Feil ved henting av mål:", error);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <p>Laster treningsmål...</p>;

  return (
    <div className={styles.workoutOverviewContainer}>
      <h1 className={styles.title}>📊 Dine treningsmål</h1>
      {goals.length ? (
        <ul className={styles.goalList}>
          {goals.map((goal, index) => (
            <li key={index} className={styles.goalItem}>
              {goal}
            </li>
          ))}
        </ul>
      ) : (
        <p>
          Ingen mål funnet for {userEmail || "bruker"}. Gå til{" "}
          <strong>"Sett mål"</strong> for å legge til.
        </p>
      )}
    </div>
  );
};

export default WorkoutOverview;
