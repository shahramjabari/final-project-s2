import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, database } from "../../FirebaseConfig";
import { useNavigate } from "react-router-dom";
import styles from "./MainPage.module.css";
import Button from "../../Components/Button/Button";

const MainPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDocRef = doc(database, "users", firebaseUser.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setUser({
              email: firebaseUser.email,
              name: `${userData.firstname} ${userData.lastname}`,
              dailyGoals: userData.dailyGoals || [],
              dateOfBirth: userData.dateOfBirth || "Not provided",
            });
          } else {
            setUser({
              email: firebaseUser.email,
              name: "Unknown User",
              dailyGoals: [],
              dateOfBirth: "Unknown",
            });
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <p>Loading your dashboard...</p>;
  if (!user) return <p>You must be logged in to view this page.</p>;

  return (
    <div className={styles.mainContainer}>
      <h1>
        Welcome, <span className={styles.name}>{user.name}</span>! 🎉
      </h1>
      <p className={styles.subtitle}>
        We're glad to have you here. Let's make progress on your fitness
        journey!
      </p>

      <div className={styles.userInfo}>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Date of birth:</strong> {user.dateOfBirth}
        </p>
      </div>

      <div className={styles.section}>
        <h2>Your Fitness Goals 💪</h2>
        {user.dailyGoals.length > 0 ? (
          <ul className={styles.goalList}>
            {user.dailyGoals.map((goal, index) => (
              <li key={index}>{goal}</li>
            ))}
          </ul>
        ) : (
          <p>You haven't set any goals yet.</p>
        )}

        <Button
          onClick={() => navigate("/set-goals")}
          className={styles.actionButton}
        >
          Add or Edit Goals
        </Button>
      </div>

      <div className={styles.section}>
        <h2>Workout Inspiration 🏋️‍♂️</h2>
        <p>Discover exercises tailored to your focus areas.</p>
        <Button
          onClick={() => navigate("/add-workout")}
          className={styles.actionButton}
        >
          Explore Workouts
        </Button>
      </div>
    </div>
  );
};

export default MainPage;
