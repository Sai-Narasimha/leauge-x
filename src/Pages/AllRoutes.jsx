import React from "react";
import { Routes, Route } from "react-router-dom";
import { Cart } from "./Cart";
import { Home } from "./Home";
export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
};
