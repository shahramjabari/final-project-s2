import { useState } from "react";
import styles from "./SignUp.module.css";
import { createUserWithEmailAndPassword, auth } from "/src/FirebaseConfig.js";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.terms) {
      setError("Du må godta vilkårene.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passordene matcher ikke.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      console.log("Bruker opprettet (mock):", userCredential.user);
      navigate("/homepage");
    } catch (err) {
      setError("Kunne ikke opprette bruker.");
    }
  };

  return (
    <div className={styles.signUpContainer}>
      <form className={styles.signUpForm} onSubmit={handleSignUp}>
        <h1>Sign Up 🆙</h1>

        <div className={styles.inputGroup}>
          <label htmlFor="firstname">First Name:</label>
          <input
            type="text"
            name="firstname"
            id="firstname"
            value={formData.firstname}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="lastname">Last Name:</label>
          <input
            type="text"
            name="lastname"
            id="lastname"
            value={formData.lastname}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.term}>
          <input
            type="checkbox"
            name="terms"
            id="terms"
            checked={formData.terms}
            onChange={handleChange}
          />
          <label htmlFor="terms">I agree to the terms and conditions</label>
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" className={styles.submitButton}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
