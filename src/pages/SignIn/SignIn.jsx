import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./SignIn.module.css";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import Button from "../../Components/Button/Button";
import Modal from "../../Components/Modal/Modal";
import useSignInValidation from "../../Hooks/useSignInValidation";
import { auth } from "../../FirebaseConfig";

const SignIn = () => {
  const [signInFormData, setSignInFormData] = useState({
    email: "",
    password: "",
  });
  const [resetEmail, setResetEmail] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  const [error, setError] = useState("");
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const { validateSignIn, signInErrors } = useSignInValidation();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignInFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");
    if (!validateSignIn(signInFormData)) return;

    try {
      await signInWithEmailAndPassword(
        auth,
        signInFormData.email,
        signInFormData.password
      );
      setSignInFormData({ email: "", password: "" });
      navigate("/mainpage");
    } catch {
      setError("Login failed. Please check your email and password.");
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!resetEmail.trim()) {
      setResetMessage("Email address is required to reset password.");
      return;
    } else if (!emailRegex.test(resetEmail.trim())) {
      setResetMessage("Please enter a valid email address.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setResetMessage("Password reset email sent. Please check your inbox.");
      setResetEmail("");
    } catch {
      setResetMessage("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className={styles.formWrapper}>
      <form className={styles.signInForm} noValidate onSubmit={handleSignIn}>
        <h2>Sign in</h2>

        <fieldset className={styles.formGroup}>
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Write your e-mail"
            className={styles.formInput}
            value={signInFormData.email}
            onChange={handleInputChange}
          />
          {signInErrors?.email && (
            <p className={styles.errorMessage}>{signInErrors.email}</p>
          )}

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Write your password"
            className={styles.formInput}
            value={signInFormData.password}
            onChange={handleInputChange}
          />
          {signInErrors?.password && (
            <p className={styles.errorMessage}>{signInErrors.password}</p>
          )}
        </fieldset>

        {error && <p className={styles.errorMessage}>{error}</p>}

        <p>
          Don't have an account?{" "}
          <Link to="/sign-up" className={styles.link}>
            Register here
          </Link>
        </p>

        <p>
          Forgot your password?{" "}
          <Button
            type="button"
            className={styles.forgotPasswordButton}
            onClick={() => setShowForgotPasswordModal(true)}
          >
            Click here
          </Button>
        </p>

        <Button className={styles.signInButton}>Sign in</Button>
      </form>

      {/* Modal for password reset */}
      {showForgotPasswordModal && (
        <Modal>
          <form className={styles.resetFormContainer}>
            <p>
              Enter your email address to receive a link to reset your password.
            </p>

            <label htmlFor="resetEmail">E-mail</label>
            <input
              type="email"
              id="resetEmail"
              name="resetEmail"
              className={styles.formInput}
              placeholder="Your email address"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
            />

            <div className={styles.resetButtonsContainer}>
              <Button
                type="button"
                className={styles.resetPasswordButton}
                onClick={handlePasswordReset}
              >
                Reset password
              </Button>
              <Button
                type="button"
                className={styles.closeButton}
                onClick={() => {
                  setShowForgotPasswordModal(false);
                  setResetMessage("");
                  setResetEmail("");
                }}
              >
                Close
              </Button>
            </div>

            {resetMessage && (
              <p className={styles.errorMessage}>{resetMessage}</p>
            )}
          </form>
        </Modal>
      )}
    </div>
  );
};

export default SignIn;
