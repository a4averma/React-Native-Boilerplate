// Redux Imports
import { createStore, applyMiddleware, compose } from "redux";
import { connect } from "react-redux";
import ReduxThunk from "redux-thunk";

// React Navigation integration with Redux Imports
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware
} from "react-navigation-redux-helpers";

// Redux Persist Imports
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

// Offline Support
import { reducer as network } from "react-native-offline";

//Redux Devtools
import devTools from "remote-redux-devtools";

// File Imports
import Navigator from "../navigators";
import reducers from "../reducers";

const navMiddleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav
);
const ReduxApp = reduxifyNavigator(Navigator, "root");

// Map Navigation State to Props
const mapStateToProps = state => ({
  state: state.nav
});

// Persisted Storage Configurations
const persistConfig = {
  key: "root",
  storage: storage,
  stateReconciler: autoMergeLevel2,
  blacklist: ["nav"]
};

const persistedReducer = persistReducer(persistConfig, reducers);

// Redux Connect Initialization
export const ReduxNavigator = connect(mapStateToProps)(ReduxApp);
export const store = createStore(
  persistedReducer,
  {},
  network,
  compose(applyMiddleware(navMiddleware, ReduxThunk)),
  devTools({
    name: "offline",
    realtime: true
  })
);

// Persist the store
export const persistedStore = persistStore(store);
