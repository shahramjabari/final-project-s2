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
      console.log("Bruker logget ut");
      navigate("/sign-in");
    } catch (error) {
      console.error("Feil ved utlogging:", error.message);
    }
  };

  return (
    <nav className={styles.navbar}>
      <ul className={styles.navList}>
        <li>
          <NavLink to="/" className={styles.navLink}>
            Hjem
          </NavLink>
        </li>

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

        {isLoggedIn && (
          <>
            <li>
              <NavLink to="/dashboard" className={styles.navLink}>
                Dashboard
              </NavLink>
            </li>
            <li>
              <button onClick={handleSignOut} className={styles.signOutButton}>
                Logg ut
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
