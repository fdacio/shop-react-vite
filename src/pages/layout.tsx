import { ReactNode } from "react";
import Header from "../components/Header";
import Menu from "../components/Menu";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <Menu  />
      <div id="container">
        {children}
      </div>
    </>
  );
}
