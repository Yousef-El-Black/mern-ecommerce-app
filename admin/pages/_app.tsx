import "@/styles/globals.scss";
import "@/styles/dark.scss";
import type { AppProps } from "next/app";
import { DarkModeContextProvider } from "@/context/darkModeContext";
import { Provider } from "react-redux";
import { persistor, store } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store as any}>
      <PersistGate loading={null} persistor={persistor}>
        <DarkModeContextProvider>
          <Component {...pageProps} />
        </DarkModeContextProvider>
      </PersistGate>
    </Provider>
  );
}
