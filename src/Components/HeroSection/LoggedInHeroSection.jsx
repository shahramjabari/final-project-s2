import styles from "./LoggedInHeroSection.module.css";

const LoggedInHeroSection = ({ user }) => {
  return (
    <section className={styles.heroSection}>
      <div className={styles.overlay}>
        <div className={styles.contentWrapper}>
          <h1 className={styles.greetingTitle}>Hei, {user.name} 👋</h1>
          <p className={styles.subText}>Klar for å nå dagens mål?</p>

          <div className={styles.dailyGoals}>
            <h2 className={styles.sectionTitle}>Dagens treningsmål</h2>
            <ul className={styles.goalList}>
              {user.dailyGoals.map((goal, index) => (
                <li key={index}>{goal}</li>
              ))}
            </ul>
          </div>

          <a href="/dashboard" className={styles.dashboardButton}>
            Se treningsoversikt
          </a>
        </div>
      </div>
    </section>
  );
};

export default LoggedInHeroSection;
