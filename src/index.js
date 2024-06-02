import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { ListProvider } from "./components/context/list";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ListProvider>
      <RouterProvider router={router}></RouterProvider>
    </ListProvider>
  </React.StrictMode>,
);
