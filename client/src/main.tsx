import "@/index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/lib/i18n.ts";

import App from "@/App.tsx";
import { ModalProvider } from "@/providers/modal-provider.tsx";
import { AuthContextProvider } from "./context/auth-context";
import { Toaster } from "@/components/ui/sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthContextProvider >
      <Toaster richColors theme="light" />
      <ModalProvider />
      <App />
    </AuthContextProvider>
  </StrictMode>
);
