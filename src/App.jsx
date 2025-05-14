import { Outlet } from "react-router-dom";
import styles from "./App.module.css";
import Navbar from "./Components/NavBar/Navbar";

function App() {
  return (
    <div className={styles.rootContainer}>
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
