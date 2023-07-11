import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
// import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <main>
      <Switch>
        <Route exact path="/" component={ Login } />
        {/* <Route path="/meals" component={ Foods } />
        <Route path="/drinks" component={ Drinks } />
        <Route path="/meals/:id" component={ RecipeDetails } />
      <Route path="/drinks/:id" component={ DrinkDetails } />
      <Route path="/meals/:id/in-progress" component={ FoodInProgress } />
      <Route path="/drinks/:id/in-progress" component={ DrinkInProgress } />
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } /> */}
      </Switch>
    </main>
  );
}

export default App;
