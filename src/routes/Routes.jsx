// src/routes/router.jsx
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from "react-router-dom";

import App from "../App";

// Pages
import Home from "../pages/Home/Home";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SingUp/SignUp";
import MainPage from "../pages/MainPage/MainPage";
import AddWorkout from "../pages/AddWorkout/AddWorkout";
import SetGoals from "../pages/SetGoals/SetGoals";
import WorkoutOverview from "../pages/WorkoutOverview/WorkoutOverview";
import AddProgress from "../pages/AddProgress/AddProgress";
import VerifyEmail from "../pages/VerifyEmail/VerifyEmail";

import { useAuthContext } from "../context/authContext";

const RouteGuard = ({ children }) => {
  const { user, loading } = useAuthContext();

  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/sign-in" replace />;

  return children;
};

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="sign-up" element={<SignUp />} />
      <Route path="sign-in" element={<SignIn />} />
      <Route path="verify-email" element={<VerifyEmail />} />{" "}
      <Route path="mainpage" element={<MainPage />} />
      {/* Protected Routes */}
      <Route
        path="add-workout"
        element={
          <RouteGuard>
            <AddWorkout />
          </RouteGuard>
        }
      />
      <Route
        path="set-goals"
        element={
          <RouteGuard>
            <SetGoals />
          </RouteGuard>
        }
      />
      <Route
        path="workout-overview"
        element={
          <RouteGuard>
            <WorkoutOverview />
          </RouteGuard>
        }
      />
      <Route
        path="add-progress"
        element={
          <RouteGuard>
            <AddProgress />
          </RouteGuard>
        }
      />
    </Route>
  )
);
