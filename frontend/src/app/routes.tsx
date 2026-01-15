import { Routes, Route, Navigate } from "react-router-dom";
import { getToken } from "../api/auth";

// Public Pages
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";

// Dashboard Components

import Dashboard from "../pages/Dashboard";
import Insights from "../pages/Insights";
import TasksPage from "../pages/Tasks"; 
import SettingsPage from "../pages/Settings";

// Guard Component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  // Mock token for demo if API isn't ready, remove 'true ||' for production
  const token = true || getToken(); 
  return token ? children : <Navigate to="/login" />;
};

export default function AppRoutes() {
  return (
    <Routes>
      {/* --- Public Routes --- */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* --- Protected Dashboard Routes --- */}
      {/* This Route wraps everything inside DashboardLayout & ProtectedRoute */}
      
        {/* These render INSIDE the <Outlet /> of DashboardLayout */}
        <Route path="/dashboard" element={<DashboardWrapper />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/settings" element={<SettingsPage />} />

      {/* --- 404 --- */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

// Helper wrapper to extract Context from Outlet and pass to Dashboard
// Put this at the bottom of routes.tsx or in a separate file
import { useOutletContext } from "react-router-dom";
import { Task } from "../components/dashboard/TaskPreview";

function DashboardWrapper() {
  const context = useOutletContext<{ 
    tasks: Task[], 
    toggleTask: (id: number) => void, 
    onOpenAI: () => void 
  }>();
  
  return <Dashboard {...context} />;
}