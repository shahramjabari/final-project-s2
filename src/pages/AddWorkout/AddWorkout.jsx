import React, { useEffect, useState } from "react";
import styles from "./AddWorkout.module.css";
import ExerciseCard from "../../Components/ExerciseCard/ExerciseCard";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

      if (!response.ok) {
        const message = await response.text();
        throw new Error(`API error: ${message}`);
      }

      const data = await response.json();
      if (!Array.isArray(data)) {
        throw new Error("Invalid response format");
      }

      setExercises(data.slice(0, 10));
    } catch (err) {
      console.error("API error:", err.message);
      setError("Kunne ikke hente øvelser. Sjekk API-nøkkel eller valg.");
      setExercises([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExercises();
  }, [muscle]);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>
        💪 Øvelser for {muscle.replace("_", " ")}
      </h1>

      <div className={styles.controls}>
        <label htmlFor="muscle-select">Velg muskelgruppe:</label>
        <select
          id="muscle-select"
          value={muscle}
          onChange={(e) => setMuscle(e.target.value)}
          className={styles.dropdown}
        >
          {muscleGroups.map((group) => (
            <option key={group} value={group}>
              {group.replace("_", " ").toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      {loading && <p className={styles.loading}>Laster øvelser...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {!loading && !error && exercises.length === 0 && (
        <p className={styles.noResults}>Ingen øvelser funnet.</p>
      )}

      <div className={styles.exerciseGrid}>
        {exercises.map((exercise, index) => (
          <ExerciseCard key={index} exercise={exercise} />
        ))}
      </div>
    </div>
  );
};

export default AddWorkout;
