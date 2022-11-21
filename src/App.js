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
  const [user, setUser] = useState(undefined);
  const [transaction, setTransaction] = useState(undefined);

  return (
    <AppContext.Provider
      value={{ user, setUser, transaction, setTransaction }}
    >
      <BrowserRouter>
        <GlobalStyle />
        <Routes>
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/" element={<SignIn />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/transactions/:id" element={<Transaction />}/>
          <Route path="/transactions/:id/edit" element={<Edit />}/>
          <Route path="/transactions/add-inflow" element={ <Inflow />} />
          <Route path="/transactions/add-outflow" element={<Outflow />} />
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  )
};
