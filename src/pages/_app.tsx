import type { AppProps } from "next/app";
import "./globals.css";
import RootLayout from "./layout";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@/redux/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RootLayout>
          <Component {...pageProps} />
        </RootLayout>
      </PersistGate>
    </Provider>
  );
}
