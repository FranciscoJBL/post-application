import { AppProps } from "next/app";
import { Provider } from 'react-redux';
import { store, persistor } from '../store/store';
import { PersistGate } from 'redux-persist/integration/react'
import "../styles.css";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} >
      <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
};

export default App;
