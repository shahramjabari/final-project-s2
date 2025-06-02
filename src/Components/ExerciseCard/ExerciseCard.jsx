import { useState, useEffect } from "react";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from "firebase/firestore";
import { auth, database } from "../../FirebaseConfig";
import styles from "./ExerciseCard.module.css";

const ExerciseCard = ({ exercise }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const checkFavorite = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(database, "users", user.uid);
        const userSnap = await getDoc(userRef);
        const favs = userSnap.data()?.favorites || [];
        setIsFavorite(favs.some((fav) => fav.id === exercise.id));
      }
    };
    checkFavorite();
  }, [exercise.id]);

  const toggleFavorite = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const userRef = doc(database, "users", user.uid);
    const userSnap = await getDoc(userRef);
    const favs = userSnap.data()?.favorites || [];

    const favObj = favs.find((fav) => fav.id === exercise.id) || {
      id: exercise.id,
      name: exercise.name,
      gifUrl: exercise.gifUrl,
      target: exercise.target,
      equipment: exercise.equipment,
    };

    try {
      setError("");
      if (isFavorite) {
        await updateDoc(userRef, {
          favorites: arrayRemove(favObj),
        });
      } else {
        await updateDoc(userRef, {
          favorites: arrayUnion(favObj),
        });
      }
      setIsFavorite(!isFavorite);
    } catch {
      setError("Failed to update favorites. Please try again.");
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3>{exercise.name}</h3>
        <button className={styles.favoriteButton} onClick={toggleFavorite}>
          {isFavorite ? "⭐" : "☆"}
        </button>
      </div>
      {exercise.gifUrl && (
        <img
          src={exercise.gifUrl}
          alt={exercise.name}
          className={styles.exerciseGif}
        />
      )}
      <p>
        <strong>Muscle:</strong> {exercise.target}
      </p>
      <p>
        <strong>Equipment:</strong> {exercise.equipment}
      </p>
      {error && <p className={styles.errorMessage}>{error}</p>}
    </div>
  );
};

export default ExerciseCard;
