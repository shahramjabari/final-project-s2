import { useState } from "react";
import styles from "./SignIn.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, auth } from "/src/FirebaseConfig.js";

const SignIn = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      console.log("Signed in (mock):", userCredential.user);
      navigate("/dashboard");
    } catch (err) {
      setError("Feil ved innlogging");
    }
  };

  return (
    <div className={styles.signInContainer}>
      <form className={styles.signInForm} onSubmit={handleSignIn}>
        <h1>Sign In ✍🏽</h1>

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

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" className={styles.submitButton}>
          Sign In
        </button>

        <p>
          Don’t have an account?{" "}
          <NavLink to="/sign-up">Create one here</NavLink>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
