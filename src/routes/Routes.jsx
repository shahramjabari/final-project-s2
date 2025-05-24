import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import App from "../App";

// Import your pages
import Home from "../pages/Home/Home";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SingUp/SignUp";
import MainPage from "../pages/MainPage/MainPage";
import AddWorkout from "../pages/AddWorkout/AddWorkout";
import SetGoals from "../pages/SetGoals/SetGoals";
import WorkoutOverview from "../pages/WorkoutOverview/WorkoutOverview";
import AddProgress from "../pages/AddProgress/AddProgress";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="sign-up" element={<SignUp />} />
      <Route path="sign-in" element={<SignIn />} />
      <Route path="mainpage" element={<MainPage />} />
      <Route path="add-workout" element={<AddWorkout />} />
      <Route path="set-goals" element={<SetGoals />} />
      <Route path="workout-overview" element={<WorkoutOverview />} />
      <Route path="add-progress" element={<AddProgress />} />
    </Route>
  )
);
