import { HashRouter, Routes, Route } from "react-router-dom";
import App from "./App";
export default function Router() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App></App>}></Route>
      </Routes>
    </HashRouter>
  );
}
