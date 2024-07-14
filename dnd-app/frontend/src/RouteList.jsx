import { Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "./DataContextWrapper";

import { Home } from "./Home";
import { LoginSignup } from "./LoginSignup";
import { Logout } from "./Logout";
import { Profile } from "./Profile";
import { Redirect } from "./Redirect";

export function RouteList() {
  const { user } = useContext(DataContext);

  if (!user.isLoggedIn) {
    return (
      <main>
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="/login/signup" element={<LoginSignup />}></Route>
          <Route exact path="/login" element={<Redirect />}></Route>
          <Route exact path="/signup" element={<Redirect />}></Route>
          <Route exact path="/*" element={<Redirect />}></Route>
        </Routes>
      </main>
    );
  }

  return (
    <main>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/profile" element={<Profile />}></Route>
        <Route exact path="/login/signup" element={<LoginSignup />}></Route>
        <Route exact path="/login" element={<Redirect />}></Route>
        <Route exact path="/logout" element={<Logout />}></Route>
        <Route exact path="/signup" element={<Redirect />}></Route>
      </Routes>
    </main>
  );
}
