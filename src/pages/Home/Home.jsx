// src/pages/Home.jsx
import React from "react";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <section className={styles.homeSection}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          🏋️ Velkommen til <span className={styles.appName}>Fitness Appen</span>
          !
        </h1>
        <p className={styles.heroSubtitle}>
          Følg med på treningen din, sett mål og oppnå dine helseambisjoner.
        </p>
        <a href="/sign-up" className={styles.getStartedButton}>
          Kom i gang nå
        </a>
      </div>

      <div className={styles.motivationSection}>
        <h2>💥 Hvorfor trene med oss?</h2>
        <div className={styles.motivationGrid}>
          <div className={styles.motivationItem}>
            <img src="src/assets/Images/training.jpg" alt="Trening" />
            <h3>Hold deg i form</h3>
            <p>Følg fremgangen din og hold kroppen aktiv og sterk.</p>
          </div>
          <div className={styles.motivationItem}>
            <img src="src/assets/Images/workout.jpg" alt="Workout" />
            <h3>Personlige mål</h3>
            <p>Sett mål og nå dem med hjelp av treningsplaner.</p>
          </div>
          <div className={styles.motivationItem}>
            <img src="src/assets/Images/Gym.jpg" alt="Gym" />
            <h3>Bli inspirert</h3>
            <p>Få daglig treningsinspirasjon og tips fra vårt API.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
