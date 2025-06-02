// src/pages/Home.jsx
import React from "react";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className={styles.homeSection}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          🏋️ Welcome to <span className={styles.appName}>The Fitness App</span>!
        </h1>
        <p className={styles.heroSubtitle}>
          Track your workouts, set goals, and achieve your health ambitions.
        </p>
        <Link to="/sign-in" className={styles.getStartedButton}>
          Get Started Now
        </Link>
      </div>

      <div className={styles.motivationSection}>
        <h2>💥 Why Train With Us?</h2>
        <div className={styles.motivationGrid}>
          <div className={styles.motivationItem}>
            <img src="src/assets/Images/training.jpg" alt="Training" />
            <h3>Stay in Shape</h3>
            <p>Track your progress and keep your body active and strong.</p>
          </div>
          <div className={styles.motivationItem}>
            <img src="src/assets/Images/workout.jpg" alt="Workout" />
            <h3>Personal Goals</h3>
            <p>Set your own fitness goals and reach them with custom plans.</p>
          </div>
          <div className={styles.motivationItem}>
            <img src="src/assets/Images/Gym.jpg" alt="Gym" />
            <h3>Get Inspired</h3>
            <p>Receive daily workout inspiration and tips from our API.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
