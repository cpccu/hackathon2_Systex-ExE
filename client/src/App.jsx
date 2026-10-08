
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import Resources from "./pages/Resources";
import LostFound from "./pages/LostFound";
import Notices from "./pages/Notices";
import Events from "./pages/Events";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* =========================================
            PUBLIC
        ========================================= */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* =========================================
            PROTECTED
        ========================================= */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/resources"
          element={
            <ProtectedRoute>
              <Resources />
            </ProtectedRoute>
          }
        />

        <Route
          path="/lost-found"
          element={
            <ProtectedRoute>
              <LostFound />
            </ProtectedRoute>
          }
        />

        <Route
          path="/notices"
          element={
            <ProtectedRoute>
              <Notices />
            </ProtectedRoute>
          }
        />

        <Route
          path="/events"
          element={
            <ProtectedRoute>
              <Events />
            </ProtectedRoute>
          }
        />


        {/* =========================================
            UNKNOWN ROUTE
        ========================================= */}

        <Route
          path="*"
          element={<Home />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

