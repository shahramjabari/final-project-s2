import { useState, useRef } from "react";
import styles from "./SignUp.module.css";
import { useSignUpValidation } from "../../hooks/useSignUpValidation";
import { useNavigate } from "react-router-dom";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { database } from "../../FirebaseConfig";
import { useAuth } from "../../Hooks/useAuth";
import Button from "../../Components/Button/Button";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    profilePicture: null,
    previewUrl: "",
  });

  const fileInputRef = useRef(null);
  const { validate, errors } = useSignUpValidation();
  const { signUp, signUpErrors } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    if (e.target.type === "file") return;
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const previewUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        profilePicture: file,
        previewUrl,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        profilePicture: null,
        previewUrl: "",
      }));
    }
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({
      ...prev,
      profilePicture: null,
      previewUrl: "",
    }));
    fileInputRef.current.value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate(formData)) return;

    try {
      const userCredential = await signUp(formData.email, formData.password);
      const user = userCredential.user;

      await setDoc(doc(database, "users", user.uid), {
        uid: user.uid,
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        dateOfBirth: formData.dateOfBirth || "",
        profilePicture: "", // TODO: Legg til faktisk URL hvis du laster opp bildet senere
        createdAt: serverTimestamp(),
      });

      // Reset form
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
        dateOfBirth: "",
        profilePicture: null,
        previewUrl: "",
      });
      fileInputRef.current.value = "";

      navigate("/verify-email");
    } catch (error) {
      console.error("Signup failed:", error);
    }
  };

  return (
    <div className={styles.formWrapper}>
      <form className={styles.signUpForm} onSubmit={handleSubmit} noValidate>
        <h2>Sign-up Form</h2>

        <fieldset className={styles.formGroup}>
          <legend className={styles.formGroupTitle}>
            Personal Information
          </legend>

          <label htmlFor="firstname">First name</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            placeholder="Enter your first name"
            value={formData.firstname}
            onChange={handleInputChange}
            className={styles.formInput}
          />
          {errors.firstname && (
            <p className={styles.errorMessage}>{errors.firstname}</p>
          )}

          <label htmlFor="lastname">Last name</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            placeholder="Enter your last name"
            value={formData.lastname}
            onChange={handleInputChange}
            className={styles.formInput}
          />
          {errors.lastname && (
            <p className={styles.errorMessage}>{errors.lastname}</p>
          )}

          <label htmlFor="dateOfBirth">Date of birth</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            className={styles.formInput}
          />

          <label htmlFor="profilePicture">Profile picture</label>
          <input
            type="file"
            id="profilePicture"
            name="profilePicture"
            accept=".jpg, .jpeg, .png"
            onChange={handleImageChange}
            ref={fileInputRef}
            className={styles.formInput}
          />
          {formData.previewUrl && (
            <div className={styles.imagePreviewContainer}>
              <img
                src={formData.previewUrl}
                alt="Preview"
                className={styles.imagePreview}
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className={styles.removeImageButton}
              >
                Remove photo
              </button>
            </div>
          )}
        </fieldset>

        <fieldset className={styles.formGroup}>
          <legend className={styles.formGroupTitle}>Account Information</legend>

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
            className={styles.formInput}
          />
          {errors.email && (
            <p className={styles.errorMessage}>{errors.email}</p>
          )}

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
            className={styles.formInput}
          />
          {errors.password && (
            <p className={styles.errorMessage}>{errors.password}</p>
          )}

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Re-enter your password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className={styles.formInput}
          />
          {errors.confirmPassword && (
            <p className={styles.errorMessage}>{errors.confirmPassword}</p>
          )}
        </fieldset>

        {signUpErrors && <p className={styles.errorMessage}>{signUpErrors}</p>}

        <Button className={styles.createAccountButton}>Create Account</Button>
      </form>
    </div>
  );
};

export default SignUp;
