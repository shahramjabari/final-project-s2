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
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const { validateSignIn, signInErrors } = useSignInValidation();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignInFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!validateSignIn(signInFormData)) return;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        signInFormData.email,
        signInFormData.password
      );
      console.log("User signed in:", userCredential.user);
      setSignInFormData({ email: "", password: "" });
      navigate("/mainpage");
    } catch (error) {
      console.error("Sign in error:", error.message);
      setResetMessage("Feil ved innlogging. Sjekk e-post og passord.");
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!resetEmail.trim()) {
      setResetMessage("E-postadresse er påkrevd for å tilbakestille passordet");
      return;
    } else if (!emailRegex.test(resetEmail.trim())) {
      setResetMessage("Skriv inn en gyldig e-postadresse");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setResetMessage("E-post for tilbakestilling sendt. Sjekk innboksen din.");
      setResetEmail("");
    } catch (error) {
      console.error("Feil ved tilbakestilling:", error.message);
      setResetMessage("Noe gikk galt. Prøv igjen senere.");
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

        {resetMessage && <p className={styles.errorMessage}>{resetMessage}</p>}

        <p>
          Do you not have an account?{" "}
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

      {/* Modal for passordreset */}
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
