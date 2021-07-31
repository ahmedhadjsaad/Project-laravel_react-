import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import CalendarApp from "./Components/CalendarApp";


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
        <Route path="/" component={CalendarApp} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
