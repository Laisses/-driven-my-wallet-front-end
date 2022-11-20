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
import { Edit } from "./components/Edit";

export const App = () => {
  const userProfile = {
    username: "Anita",
    token: "7d00b82c-0c94-469e-85f1-535672e3fa1b",
  };

  const [user, setUser] = useState(userProfile);
  const [transactionId, setTransactionId] = useState("");

  return (
    <AppContext.Provider
      value={{ user, setUser, transactionId, setTransactionId }}
    >
      <BrowserRouter>
        <GlobalStyle />
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/transactions/:id" element={<Transaction />}/>
          <Route path="/transactions/edit/:id" element={<Edit />}/>
          <Route path="/add-inflow" element={ <Inflow />} />
          <Route path="/add-outflow" element={<Outflow />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  )
};
