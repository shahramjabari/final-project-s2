import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, auth } from "/src/FirebaseConfig.js";
import styles from "./Navbar.module.css";

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
          {!isLoggedIn && (
            <li>
              <NavLink to="/" className={styles.navLink}>
                Hjem
              </NavLink>
            </li>
          )}

          {isLoggedIn && (
            <>
              <li>
                <NavLink to="/homepage" className={styles.navLink}>
                  Homepage
                </NavLink>
              </li>
              <li>
                <NavLink to="/add-workout" className={styles.navLink}>
                  Øvelser
                </NavLink>
              </li>
            </>
          )}
          {!isLoggedIn && (
            <>
              <li>
                <NavLink to="/sign-up" className={styles.navLink}>
                  Sign Up
                </NavLink>
              </li>
              <li>
                <NavLink to="/sign-in" className={styles.navLink}>
                  Sign In
                </NavLink>
              </li>
            </>
          )}
        </ul>

        {isLoggedIn && (
          <button onClick={handleSignOut} className={styles.logoutButton}>
            Logg ut
          </button>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
