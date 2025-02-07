import React from "react";
import { Routes, Route } from "react-router";
import { AuthProvider } from "./context/useAuth";
import ProtectedRoute from "./utils/ProtectedRoute";
import ProtectedLayout from "./utils/ProtectedLayout";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";

export const App = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <ProtectedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};
