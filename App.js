/**
 * React Native App
 * @author Aditya Verma
 *
 */

import React from "react";
import store from "./src/store";
import React from "react";
import { Provider } from "react-redux";
import { ReduxNetworkProvider } from "react-native-offline";
import { PersistGate } from "redux-persist/lib/integration/react";
import { ReduxNavigator, store, persistor } from "./src/store";
export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <ReduxNetworkProvider>
            <ReduxNavigator />
          </ReduxNetworkProvider>
        </PersistGate>
      </Provider>
    );
  }
}
