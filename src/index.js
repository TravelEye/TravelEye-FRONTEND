import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { createStore } from "redux";
import rootReducer from "./reducers";
import { TripProvider } from "./pages/TripContext";

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <TripProvider>
      <App />
    </TripProvider>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
