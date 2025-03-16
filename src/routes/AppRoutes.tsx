import React from "react";
import { Routes, Route } from "react-router-dom";
import { Top } from "../pages/Top";
import { Detail } from "../pages/Detail";
import Login from "../pages/Login";
import AdminIndex from "../pages/Admin/Posts/Index";
import AdminCreate from "../pages/Admin/Posts/Create";
import AdminUpdate from "../pages/Admin/Posts/Update";
import { ProtectedRoute } from "../middleware/ProtectedRoute";

export const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<Top />} />
    <Route path="/login" element={<Login />} />
    <Route path="/:year/:month/:day/:post_key" element={<Detail />} />
    <Route
      path="/admin/"
      element={
        <ProtectedRoute>
          <AdminIndex />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/post/"
      element={
        <ProtectedRoute>
          <AdminCreate />
        </ProtectedRoute>
      }
    />
    <Route
      path="/admin/post/:post_key"
      element={
        <ProtectedRoute>
          <AdminUpdate />
        </ProtectedRoute>
      }
    />
  </Routes>
);
