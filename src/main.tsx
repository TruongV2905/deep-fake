import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import DeepfakePresentation from "../DeepfakePresentation";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DeepfakePresentation />
  </StrictMode>,
);
