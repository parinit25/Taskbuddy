import React from "react";
import { Outlet } from "react-router";
import Header from "../components/header/Header";

const ProtectedLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default ProtectedLayout;
