import React from "react";
import logo from "./logo.svg";
import DrawerHeader from "./features/common/DrawerHeader";
import "./App.css";

const App: React.FC = ({ children }) => {
  return (
    <div className="App">
      <DrawerHeader>{children}</DrawerHeader>
    </div>
  );
};

export default App;
