import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../FirebaseConfig";
import { sendEmailVerification } from "firebase/auth";
import Button from "../../Components/Button/Button";
import styles from "./VerifyEmail.module.css";

const VerifyEmail = () => {
  const [emailVerified, setEmailVerified] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkEmailStatus = async () => {
      await auth.currentUser.reload();
      const verified = auth.currentUser.emailVerified;
      setEmailVerified(verified);

      if (verified) {
        navigate("/mainpage");
      }
    };

    const interval = setInterval(checkEmailStatus, 5000);
    return () => clearInterval(interval);
  }, [navigate]);

  const resendVerificationEmail = async () => {
    setError(null);
    try {
      await sendEmailVerification(auth.currentUser);
      setEmailSent(true);
    } catch (err) {
      setError("Failed to resend email. Please try again later.");
    }
  };

  return (
    <div className={styles.container}>
      {emailVerified ? (
        <h1 className={styles.redirectMessage}>
          ✅ Email verified! Redirecting...
        </h1>
      ) : (
        <div className={styles.card}>
          <h2 className={styles.heading}>Verify Your Email 📩</h2>
          <p className={styles.instruction}>
            A verification link has been sent to your inbox. After confirming
            your email, you'll be redirected to the main page.
          </p>
          <p className={styles.subtext}>
            Didn’t get the email? Click below to resend:
          </p>

          <Button
            className={styles.resendButton}
            onClick={resendVerificationEmail}
          >
            Resend Email
          </Button>

          {emailSent && (
            <p className={styles.success}>
              A new verification email was sent ✅
            </p>
          )}
          {error && <p className={styles.error}>{error}</p>}
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
