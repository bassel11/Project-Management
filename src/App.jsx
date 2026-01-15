import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Pages
import Layout from "./pages/Layout";
import StartPage from "./pages/StartPage";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Team from "./pages/Team";
import ProjectDetails from "./pages/ProjectDetails";
import TaskDetails from "./pages/TaskDetails";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

// Admin Pages (تأكد من مسار الملفات حسب المجلد الذي أنشأته)
import AdminDashboard from './pages/AdminDashboard';
import RegisterUser from './pages/admin/RegisterUser'; // تأكد من المسار
import MfaSettings from './pages/admin/MfaSettings';   // تأكد من المسار

// Security Components
import ProtectedRoute from "./components/ProtectedRoute";
import AdminProtectedRoute from './components/AdminProtectedRoute';

const App = () => {
    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />
            
            <Routes>
                {/* Public Routes */}
                <Route path="/" element={<StartPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />

                {/* Protected App Routes (User & Admin) */}
                <Route path="/app" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                    
                    {/* General User Routes */}
                    <Route index element={<Dashboard />} />
                    <Route path="team" element={<Team />} />
                    <Route path="projects" element={<Projects />} />
                    <Route path="projectsDetail" element={<ProjectDetails />} />
                    <Route path="taskDetails" element={<TaskDetails />} />

                    {/* Admin Only Routes (Restricted Access) */}
                    
                    {/* 1. Admin Dashboard: /app/admin */}
                    <Route 
                        path="admin" 
                        element={
                            <AdminProtectedRoute>
                                <AdminDashboard />
                            </AdminProtectedRoute>
                        } 
                    />

                    {/* 2. Register New User: /app/admin/register */}
                    <Route 
                        path="admin/register" 
                        element={
                            <AdminProtectedRoute>
                                <RegisterUser />
                            </AdminProtectedRoute>
                        } 
                    />

                    {/* 3. MFA Settings: /app/admin/mfa */}
                    <Route 
                        path="admin/mfa" 
                        element={
                            <AdminProtectedRoute>
                                <MfaSettings />
                            </AdminProtectedRoute>
                        } 
                    />

                </Route>
            </Routes>
        </>
    );
};

export default App;