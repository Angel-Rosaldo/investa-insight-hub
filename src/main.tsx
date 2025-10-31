import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Importa el registro del SW generado por vite-plugin-pwa
import { registerSW } from "virtual:pwa-register";

createRoot(document.getElementById("root")!).render(<App />);

// Inicializa el service worker con autoUpdate
registerSW({
  immediate: true,
  onNeedRefresh() {
    console.log(
      "Nueva versión disponible, refresca la página para actualizar."
    );
  },
  onOfflineReady() {
    console.log("La app está lista para usarse offline 🚀");
  },
});
