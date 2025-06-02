import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "/src/FirebaseConfig";
import styles from "./Navbar.module.css";
import Button from "../Button/Button";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [signOutError, setSignOutError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      setSignOutError("");
      await signOut(auth);
      navigate("/sign-in");
    } catch {
      setSignOutError("Failed to sign out. Please try again.");
    }
  };

  return (
    <header className={styles.navbarWrapper}>
      <nav className={styles.navbar}>
        <div className={styles.logo}>FitnessApp 🏋️</div>

        <ul className={styles.navList}>
          {!isLoggedIn && (
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.active : ""}`
                }
              >
                Home
              </NavLink>
            </li>
          )}

          {isLoggedIn ? (
            <>
              <li>
                <NavLink
                  to="/mainpage"
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.active : ""}`
                  }
                >
                  Main Page
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/add-workout"
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.active : ""}`
                  }
                >
                  Exercises
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/set-goals"
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.active : ""}`
                  }
                >
                  Set Goals
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/workout-overview"
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.active : ""}`
                  }
                >
                  Overview
                </NavLink>
              </li>

              <NavLink
                to="/add-progress"
                className={({ isActive }) =>
                  `${styles.navLink} ${styles.logWorkoutLink} ${
                    isActive ? styles.active : ""
                  }`
                }
              >
                Log Workout
              </NavLink>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to="/sign-up"
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.active : ""}`
                  }
                >
                  Sign Up
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/sign-in"
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.active : ""}`
                  }
                >
                  Sign In
                </NavLink>
              </li>
            </>
          )}
        </ul>

        {isLoggedIn && (
          <Button onClick={handleSignOut} className={styles.logoutButton}>
            Sign Out
          </Button>
        )}
      </nav>
      {signOutError && <p className={styles.errorMessage}>{signOutError}</p>}
    </header>
  );
};

export default Navbar;
