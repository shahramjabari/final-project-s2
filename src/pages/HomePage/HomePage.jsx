// src/pages/HomePage/HomePage.jsx
import React from "react";
import styles from "./HomePage.module.css";

const HomePage = () => {
  return (
    <div className={styles.container}>
      <section className={styles.intro}>
        <h1>Velkommen til [AppNavn]</h1>
        <p>Din digitale treningspartner!</p>
      </section>
      <section className={styles.membership}>
        <h2>Medlemskap</h2>
        <ul>
          <li>Fullt medlemskap</li>
          <li>Dagtidsmedlemskap</li>
          <li>Student-/Honnørmedlemskap</li>
        </ul>
      </section>
      <section className={styles.features}>
        <h2>Hva som er inkludert</h2>
        <ul>
          <li>Tilgang til et bredt utvalg av øvelser</li>
          <li>Personlige treningsplaner</li>
          <li>Sporing av fremgang</li>
          <li>Integrasjon med eksterne enheter</li>
        </ul>
      </section>
      <section className={styles.contact}>
        <h2>Kontakt oss</h2>
        <p>E-post: support@appnavn.no</p>
      </section>
    </div>
  );
};

export default HomePage;
