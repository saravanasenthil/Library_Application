import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  // Navigate,
} from "react-router-dom";
import HomePage from "./components/Home/HomePage";
import UserSignIn from "./components/Auth/UserSignIn";
import UserSignUp from "./components/Auth/UserSignUp";
import "./App.css";
import UserDashboard from "./components/User/UserDashboard ";
import MyBooks from "./components/User/MyBooks";
import AdminDashboard from "./components/Admin/AdminDashboard";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
// import { useAuth, AuthProvider } from "./components/Auth/AuthService";



const App: React.FC = () => {
  // const { token, role } = useAuth();

  return (
    // <AuthProvider>
    <Router>
      
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<UserSignUp />} />
          <Route path="/signin" element={<UserSignIn />} />
          
             <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
                <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
          <Route path="/my-books" element={<ProtectedRoute>
              <MyBooks />
            </ProtectedRoute>} />
          
        </Routes>
      
    </Router>
    // </AuthProvider>
  );
};



export default App;
