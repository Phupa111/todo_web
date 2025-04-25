import React from "react";
import AppRoute from "./routers/AppRoute"; // นำเข้า AppRoute
import { BrowserRouter } from "react-router-dom";

// ห่อหุ้ม AppRoute ด้วย BrowserRouter
function App() {
  return (
    <BrowserRouter>
      <AppRoute />
    </BrowserRouter>
  );
}

export default App;
