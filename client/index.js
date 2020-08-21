// import React from "react";
// import ReactDOM from "react-dom";
// import App from "./App";
// // import * as serviceWorker from "./serviceWorker";
// import * as Redux from "redux";
// import { Provider } from "react-redux";
// import ReduxThunk from 'redux-thunk';

// const initialState = {
//   myclasses: [],
// }

// const reducer = function (state = initialState, action) {
//   switch (action.type) {
//     case "ADD_MYCLASS":
//       return { ...state, myclasses: [...state.myclasses, action.payload] };

//     default:
//       return state;
//   }
// }

// const store = Redux.createStore(
//   reducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ &&
//   window.__REDUX_DEVTOOLS_EXTENSION__()
//   // Thunk middleware to be added
// )

// ReactDOM.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </React.StrictMode>,
//   document.getElementById("root")
// );