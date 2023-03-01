import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { CssVarsProvider } from "@mui/joy/styles";

import HeaderContainer from "./containers/HeaderContainer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import SearchWorkouts from "./pages/searchWorkout";
import MyWorkouts from "./pages/myWorkout";
import Detail from "./pages/Detail";
import NoMatch from "./pages/NoMatch";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <CssVarsProvider>
        <div className="App">
          <Router>
            <HeaderContainer />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/workouts" element={<SearchWorkouts />} />
              <Route path="/myworkouts" element={<MyWorkouts />} />
              <Route path="/workout/detail/:workoutId" element={<Detail />} />
              <Route path="*" element={<NoMatch />} />
            </Routes>
          </Router>
        </div>
      </CssVarsProvider>
    </ApolloProvider>
  );
}

export default App;
