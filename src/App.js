import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Components/Header";
import styled from "styled-components";
import Sidebar from "./Components/Sidebar";
import Chat from "./Components/Chat";
import { useAuthState } from "react-firebase-hooks/auth";
import Login from "./Components/Login";
import { auth } from "./firebase";
function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <Router>
        {!user ? (
          <Login />
        ) : (
          <>
            <Header />
            <AppBody>
              <Sidebar />
              <Switch>
                <Route path="/" exact>
                  <Chat />
                </Route>
              </Switch>
            </AppBody>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;

const AppBody = styled.div`
  display: flex;
  height: 100vh;
`;
