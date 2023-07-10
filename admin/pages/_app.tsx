import "@/styles/globals.scss";
import "@/styles/dark.scss";
import type { AppProps } from "next/app";
import { DarkModeContextProvider } from "@/context/darkModeContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <DarkModeContextProvider>
      <Component {...pageProps} />
    </DarkModeContextProvider>
  );
}
