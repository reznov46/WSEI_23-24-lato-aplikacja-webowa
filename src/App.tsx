import React, { useState } from "react";
import { ProjectDashboard } from "./components/ProjectDashboard";
import "./styles/three-column.css";
import UserService from "./services/UserService";
import { Login } from "./components/Login";
import { Register } from "./components/Register";

type NotLoggedScreen = "login" | "register";

const App: React.FC = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(
    UserService.isUserLoggedIn()
  );
  const [notLoggedScreen, setNotLoggedScreen] =
    useState<NotLoggedScreen>("register");

  const changePage = () => {
    setNotLoggedScreen(notLoggedScreen === "login" ? "register" : "login");
  };

  const handleLogin = () => {
    setIsUserLoggedIn(UserService.isUserLoggedIn());
  };

  if (!isUserLoggedIn) {
    if (notLoggedScreen === "login") {
      return <Login changePage={changePage} onLogin={handleLogin} />;
    }
    if (notLoggedScreen === "register") {
      return <Register changePage={changePage} />;
    }
  }
  return (
    <>
      <button
        onClick={() => {
          UserService.logout();
          setIsUserLoggedIn(false);
        }}
      >
        Logout
      </button>
      <ProjectDashboard />;
    </>
  );
};

export default App;
