import AppRoutes from "./routes/AppRoutes.tsx";
import {Worker} from "@react-pdf-viewer/core";

function App() {
  return (
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <AppRoutes/>
      </Worker>

  );
}

export default App
