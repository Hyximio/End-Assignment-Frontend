import './App.css';
import Header from "./components/Header/Header";
import {Route, Switch} from 'react-router-dom';
import HomePage from "./pages/HomePage/HomePage";
import OverviewPage from "./pages/OverviewPage/OverviewPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import BeerFocusPage from "./pages/BeerFocusPage/BeerFocusPage";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

function App() {

  return (
    <div>
        <Header />
        <Switch>
            <Route exact path="/">
                <HomePage />
            </Route>
            <Route exact path="/overview">
                <OverviewPage />
            </Route>
            <Route path="/login">
                <LoginPage />
            </Route>
            <PrivateRoute path="/beers/:id">
                <BeerFocusPage />
            </PrivateRoute>
        </Switch>
    </div>
  );
}

export default App;
