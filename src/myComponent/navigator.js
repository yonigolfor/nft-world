import React from "react";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

// screens list
import World from './world';
import WelcomeScreen from "./welcomeScreen";
// import SignSuccess from "./signSuccess";
import BuyScreen from "./buyScreen";

export default function Navigator() {
    return(
        <BrowserRouter>
          <Routes> 
            <Route path="/" exact element={<WelcomeScreen />} />
            <Route path="/world/:userId/:money" exact element={<World />} />
            <Route path="/buy/:id/:userId/:money/" 
              exact element={<BuyScreen />} />
            
          </Routes>
      </BrowserRouter>
    )

}


