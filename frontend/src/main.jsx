import "bootstrap/dist/css/bootstrap.min.css";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/staff/teacher/App.jsx";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";
import store from "./store.js";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    {/* <AlertProvider template={AlertTemplate} {...options}> */}
    <App />
    <Toaster
      position="bottom-center"
      toastOptions={{
        duration: 5000,
      }}
    />
    {/* </AlertProvider> */}
  </Provider>,
);
