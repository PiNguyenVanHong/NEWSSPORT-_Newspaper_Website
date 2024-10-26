import "@/index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/lib/i18n.ts";

import App from "@/App.tsx";
import { ModalProvider } from "@/providers/modal-provider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ModalProvider />
    <App />
  </StrictMode>
);
