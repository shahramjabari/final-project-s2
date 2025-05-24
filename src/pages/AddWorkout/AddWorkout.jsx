import React, { useEffect, useState } from "react";
import styles from "./AddWorkout.module.css";
import ExerciseCard from "../../Components/ExerciseCard/ExerciseCard";
import { auth, database } from "../../FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const muscleGroups = [
  "abductors",
  "adductors",
  "biceps",
  "calves",
  "chest",
  "forearms",
  "glutes",
  "hamstrings",
  "lats",
  "traps",
  "triceps",
];

const AddWorkout = () => {
  const [muscle, setMuscle] = useState("biceps");
  const [exercises, setExercises] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Fetch exercises from API
  useEffect(() => {
    const fetchExercises = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(
          `https://exercisedb.p.rapidapi.com/exercises/target/${muscle}`,
          {
            method: "GET",
            headers: {
              "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY,
              "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
            },
          }
        );

        const data = await response.json();
        if (!Array.isArray(data)) throw new Error("Invalid response format");

        setExercises(data.slice(0, 15));
      } catch (err) {
        setError("Could not fetch exercises.");
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, [muscle]);

  // Fetch user favorites
  useEffect(() => {
    const fetchFavorites = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(database, "users", user.uid));
        const favs = userDoc.data()?.favorites || [];
        setFavorites(favs);
      }
    };

    fetchFavorites();
  }, [muscle, showFavoritesOnly]); // Update when muscle or view changes

  const filteredExercises = showFavoritesOnly ? favorites : exercises;

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>💪 Exercises for {muscle}</h1>

      <div className={styles.controls}>
        <label htmlFor="muscle-select">Muscle group:</label>
        <select
          id="muscle-select"
          value={muscle}
          onChange={(e) => setMuscle(e.target.value)}
          className={styles.dropdown}
        >
          {muscleGroups.map((group) => (
            <option key={group} value={group}>
              {group.toUpperCase()}
            </option>
          ))}
        </select>

        <label>
          <input
            type="checkbox"
            checked={showFavoritesOnly}
            onChange={(e) => setShowFavoritesOnly(e.target.checked)}
          />
          Show favorites only
        </label>
      </div>

      {loading && <p className={styles.loading}>Loading exercises...</p>}
      {error && <p className={styles.error}>{error}</p>}
      {!loading && !error && filteredExercises.length === 0 && (
        <p className={styles.noResults}>No exercises found.</p>
      )}

      <div className={styles.exerciseGrid}>
        {filteredExercises.map((exercise, index) => (
          <ExerciseCard key={index} exercise={exercise} />
        ))}
      </div>
    </div>
  );
};

export default AddWorkout;
