import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalStyle } from "./assets/styles/GlobalStyle";
import { useState } from "react";
import { AppContext } from "./components/context";
import { SignIn } from "./components/SignIn";
import { SignUp } from "./components/SignUp";
import { Transactions } from "./components/Transactions";
import { Transaction } from "./components/Transaction";
import { Inflow } from "./components/Inflow";
import { Outflow } from "./components/Outflow";


export const App = () => {
  const userProfile = {
    username: "",
    email: "",
    password: "",
    token: "",
  };

  const [user, setUser] = useState(userProfile);

  return (
    <AppContext.Provider
      value={{ user, setUser }}
    >
      <BrowserRouter>
        <GlobalStyle />
        <Routes>
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/SignIn" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  )
};


