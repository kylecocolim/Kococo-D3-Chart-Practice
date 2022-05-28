import { LayoutType } from "../types";
import Header from "./Header";
import "../styles/layout.css";
export default function Layout({ children }: LayoutType) {
  return (
    <main className="main-layout">
      <Header></Header>
      {children}
    </main>
  );
}
