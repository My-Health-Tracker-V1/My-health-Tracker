import "./App.css";
import React from "react";
import { Route, Redirect } from "react-router-dom";

//Components for general views
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import Home from "./components/Home";
import Dashboard from "./components/nav-bar-options/Dashboard";

// Food Entry
import FoodEntry from "./components/add-entries/food/FoodEntry";
import DrinkEntry from "./components/add-entries/drink/DrinkEntry";
import FoodEdit from "./components/add-entries/food/FoodEdit";
import DrinkEdit from "./components/add-entries/drink/DrinkEdit";

//Components for the BottomNavBar Links
import Analysis from "./components/nav-bar-options/Analysis";
import Recipes from "./components/nav-bar-options/Recipes";
import Settings from "./components/nav-bar-options/Settings";
import AddItem from "./components/nav-bar-options/AddItem";

//Components for adding entries
import AddEnergy from "./components/add-entries/AddEnergy";
import AddExercise from "./components/add-entries/AddExercise";
import AddSleep from "./components/add-entries/AddSleep";
import AddSymptoms from "./components/add-entries/AddSymptoms";

class App extends React.Component {
  state = {
    user: this.props.user,
  };

  setUser = (user) => {
    this.setState({
      user: user,
    });
  };

  render() {
    return (
      <div className="App">
        <Route
          exact
          path="/"
          render={(props) => <Home setUser={this.setUser} {...props} />}
        />

        {/* Routes for Dashboard */}
        <Route
          exact
          path="/dashboard"
          render={(props) => {
            if (this.state.user)
              return (
                <Dashboard
                  setUser={this.setUser}
                  user={this.state.user}
                  {...props}
                />
              );
            else return <Redirect to="/" />;
          }}
        />

        {/* Routes for Signup and Login */}
        <Route
          exact
          path="/signup"
          render={(props) => <Signup setUser={this.setUser} {...props} />}
        />
        <Route
          exact
          path="/login"
          render={(props) => <Login setUser={this.setUser} {...props} />}
        />

        {/* Routes in BottomNavBar  */}
        <Route exact path="/add-item" component={AddItem} />
        <Route
          exact
          path="/analysis"
          render={(props) => <Analysis user={this.state.user} {...props} />}
        />
        <Route
          exact
          path="/add-recipes"
          render={(props) => <Recipes user={this.state.user} {...props} />}
        />
        <Route
          exact
          path="/settings"
          render={(props) => (
            <Settings
              user={this.state.user}
              setUser={this.setUser}
              {...props}
            />
          )}
        />

        {/* Routes to add entries */}
        <Route
          exact
          path="/add/Energy"
          render={(props) => <AddEnergy user={this.state.user} {...props} />}
        />
        <Route
          exact
          path="/add/Exercise"
          render={(props) => <AddExercise user={this.state.user} {...props} />}
        />
        <Route
          exact
          path="/add/Sleep"
          render={(props) => <AddSleep user={this.state.user} {...props} />}
        />
        <Route
          exact
          path="/add/Symptoms"
          render={(props) => <AddSymptoms user={this.state.user} {...props} />}
        />
        <Route
          exact
          path="/add/Foods"
          render={(props) => <FoodEntry user={this.state.user} {...props} />}
        />
        <Route
          exact
          path="/add/Drinks"
          render={(props) => <DrinkEntry user={this.state.user} {...props} />}
        />
        <Route
          exact
          path="/edit/Foods"
          render={(props) => <FoodEdit user={this.state.user} {...props} />}
        />
        <Route
          exact
          path="/edit/Drinks"
          render={(props) => <DrinkEdit user={this.state.user} {...props} />}
        />
      </div>
    );
  }
}

export default App;
