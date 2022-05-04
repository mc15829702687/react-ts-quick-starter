import React from "react";
import { Authenticated } from "./authenticated-app";
import { useAuth } from "./context/auth-context";
import { UnauthenticatedApp } from "./unauthenticated-app";
import { ErrorBoundary } from "./components/error-boundary";
import { FullPageError } from "./components/lib";

import "./app.css";

function App() {
  const { user } = useAuth();

  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageError}>
        {user ? <Authenticated /> : <UnauthenticatedApp />}{" "}
      </ErrorBoundary>
    </div>
  );
}

export default App;
