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
    if (isFavorite) {
      await updateDoc(userRef, {
        favorites: arrayRemove({ id: exercise.id }),
      });
    } else {
      await updateDoc(userRef, {
        favorites: arrayUnion({
          id: exercise.id,
          name: exercise.name,
          gifUrl: exercise.gifUrl,
        }),
      });
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3>{exercise.name}</h3>
        <button className={styles.favoriteBtn} onClick={toggleFavorite}>
          {isFavorite ? "⭐" : "☆"}
        </button>
      </div>
      {exercise.gifUrl && <img src={exercise.gifUrl} alt={exercise.name} />}
      <p>
        <strong>Muscle:</strong> {exercise.target}
      </p>
      <p>
        <strong>Equipment:</strong> {exercise.equipment}
      </p>
    </div>
  );
};

export default ExerciseCard;
