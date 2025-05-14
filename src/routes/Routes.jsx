// src/routes/router.jsx
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

// Layout med <Outlet />
import App from "../App";

// Importer dine sider
import Home from "../pages/Home/Home";
import SignIn from "../pages/SignIn/SignIn";
import AddWorkout from "../pages/AddWorkout/AddWorkout";
import SetGoals from "../pages/SetGoals/SetGoals";
import WorkoutOverview from "../pages/WorkoutOverview/WorkoutOverview";
import SignUp from "../pages/SingUp/SignUp";
import MainPage from "../pages/MainPage/MainPage";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Nested pages vises i <Outlet /> i App.jsx */}
      <Route index element={<Home />} />
      <Route path="sign-up" element={<SignUp />} />
      <Route path="sign-in" element={<SignIn />} />
      <Route path="mainpage" element={<MainPage />} />
      <Route path="add-workout" element={<AddWorkout />} />
      <Route path="set-goals" element={<SetGoals />} />
      <Route path="workout-overview" element={<WorkoutOverview />} />
    </Route>
  )
);
