import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/global.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { AppProvider } from "./context/AppContext.jsx";
import { SmoothScrollProvider } from "./context/SmoothScrollContext.jsx";

gsap.registerPlugin(ScrollTrigger);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <AppProvider>
        <SmoothScrollProvider>
          <App />
        </SmoothScrollProvider>
      </AppProvider>
    </ThemeProvider>
  </React.StrictMode>
);
