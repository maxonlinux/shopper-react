import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Fonts
// Supports weights 300-900
import "@fontsource-variable/rubik";

// Contexts
import CartContext from "./components/Context/CartContext.tsx";
import ToasterProvider from "./components/Context/ToasterContext.tsx";
import UserProvider from "./components/Context/UserContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CartContext>
      <UserProvider>
        <ToasterProvider>
          <App />
        </ToasterProvider>
      </UserProvider>
    </CartContext>
  </React.StrictMode>
);
