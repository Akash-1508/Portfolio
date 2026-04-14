import React, { Suspense, lazy, useState, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import PageLoader from "./components/PageLoader.jsx";
import ScrollProgress from "./components/ScrollProgress.jsx";
import CustomCursor from "./components/CustomCursor.jsx";
import { pageTransition } from "./utils/motionVariants.js";
import Home from "./pages/Home.jsx";

const NotFound = lazy(() => import("./pages/NotFound.jsx"));
const Admin = lazy(() => import("./pages/Admin.jsx"));

function RouteFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-bg-primary)] text-[var(--color-text-secondary)]">
      <p className="font-secondary text-sm font-medium">Loading…</p>
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              variants={pageTransition}
              initial="initial"
              animate="animate"
              exit="exit"
              className="min-h-screen w-full"
            >
              <Home />
            </motion.div>
          }
        />
        <Route
          path="/admin"
          element={
            <motion.div
              variants={pageTransition}
              initial="initial"
              animate="animate"
              exit="exit"
              className="min-h-screen w-full"
            >
              <Admin />
            </motion.div>
          }
        />
        <Route
          path="*"
          element={
            <motion.div
              variants={pageTransition}
              initial="initial"
              animate="animate"
              exit="exit"
              className="min-h-screen w-full"
            >
              <NotFound />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const handleLoaded = useCallback(() => setLoading(false), []);

  return (
    <Router>
      {loading ? <PageLoader onComplete={handleLoaded} /> : null}
      <ScrollProgress />
      <CustomCursor />
      <Suspense fallback={<RouteFallback />}>
        <AnimatedRoutes />
      </Suspense>
    </Router>
  );
}

export default App;
