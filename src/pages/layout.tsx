import { ReactNode } from "react";
import Header from "../components/Header";
import Menu from "../components/Menu/menuHome";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <Menu />
      <div className="container-layout">
        {children}
      </div>
    </>
  );
}
