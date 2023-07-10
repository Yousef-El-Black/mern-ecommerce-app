import Home from "@/components/HomePage/HomePage";
import { DarkModeContext } from "@/context/darkModeContext";
import { useContext } from "react";

export default function Index() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <Home />
    </div>
  );
}
