import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "/src/FirebaseConfig";
import styles from "./Navbar.module.css";
import Button from "../Button/Button"; // Bruk din egen Button

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/sign-in");
    } catch (error) {
      console.error("Feil ved utlogging:", error.message);
    }
  };

  return (
    <header className={styles.navbarWrapper}>
      <nav className={styles.navbar}>
        <div className={styles.logo}>FitnessApp 🏋️</div>

        <ul className={styles.navList}>
          {/* ✅ Hjem vises kun når ikke innlogget */}
          {!isLoggedIn && (
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${styles.navLink} ${isActive ? styles.active : ""}`
                }
              >
                Hjem
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
                  MainPage
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/add-workout"
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.active : ""}`
                  }
                >
                  Øvelser
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/set-goals"
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.active : ""}`
                  }
                >
                  Sett mål
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/workout-overview"
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.active : ""}`
                  }
                >
                  Oversikt
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
                  Registrer deg
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/sign-in"
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.active : ""}`
                  }
                >
                  Logg inn
                </NavLink>
              </li>
            </>
          )}
        </ul>

        {isLoggedIn && (
          <Button onClick={handleSignOut} className={styles.logoutButton}>
            Logg ut
          </Button>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
