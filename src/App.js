import React from 'react';
import './App.css';
// import rockGlass from './images/rockGlass.svg';
import { Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Pages/Login';
import RecipeDetails from './Pages/RecipeDetails';
import Recipes from './Pages/Recipes';
import RecipeInProgress from './Pages/RecipeInProgress';
import DoneRecipes from './Pages/DoneRecipes';
import FavoriteRecipes from './Pages/FavoriteRecipes';
import Profile from './Pages/Profile';

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
