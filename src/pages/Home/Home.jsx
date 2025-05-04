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
    </section>
  );
};

export default Home;
