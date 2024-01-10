import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import AddUser from "./users/AddUser";
import EditUser from "./users/EditUser";
import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Home/>
        </Route>
        <Route path="/register">
          <Register/>
        </Route>
        <Route path="/dashboard">
          <Dashboard/>
          </Route>
        <Route exact path="/login">
          <Login/>
        </Route>
        <Route path="/add">
          <AddUser/>
        </Route>
        <Route path="/edit/:id">
          <EditUser/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;