import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import RecipeDetails from './pages/RecipeDetails';
import Recipes from './pages/Recipes';
import RecipeInProgress from './pages/RecipeInProgress';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Profile from './pages/Profile';

function App() {
  return (

  // <div className="meals">
  //   <span className="logo">TRYBE</span>
  //   <object
  //     className="rocksGlass"
  //     type="image/svg+xml"
  //     data={ rockGlass }
  //   >
  //     Glass
  //   </object>
  // </div>

    <Switch>
      <Route exact path="/" component={ Login } />
      <Route
        exact
        path="/meals"
        render={ (props) => <Recipes { ...props } type="meals" /> }
      />
      <Route
        exact
        path="/drinks"
        render={ (props) => <Recipes { ...props } type="drinks" /> }
      />
      <Route
        exact
        path="/meals/:id"
        render={ (props) => <RecipeDetails { ...props } type="meals" /> }
      />
      <Route
        exact
        path="/drinks/:id"
        render={ (props) => <RecipeDetails { ...props } type="drinks" /> }
      />
      <Route
        exact
        path="/meals/:id/in-progress"
        render={ (props) => <RecipeInProgress { ...props } type="meals" /> }
      />
      <Route
        exact
        path="/drinks/:id/in-progress"
        render={ (props) => <RecipeInProgress { ...props } type="drinks" /> }
      />
      <Route exact path="/profile" component={ Profile } />
      <Route exact path="/done-recipes" component={ DoneRecipes } />
      <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
    </Switch>
  );
}

export default App;
