import React from "react";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryContainer
} from "victory";
import styles from "./App.module.css";
import Tree from "./components/TreeComponent";
import { BrowserRouter, Route } from "react-router-dom";
import SpecificUser from "./components/SpecificUser";

function App() {
  const data = [
    { quarter: 1, earnings: 13000 },
    { quarter: 2, earnings: 16500 },
    { quarter: 3, earnings: 14250 },
    { quarter: 4, earnings: 19000 }
  ];
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <Route exact path="/">
          <Tree />
        </Route>
        <Route exact path="/details">
          <SpecificUser />
        </Route>
      </div>
    </BrowserRouter>
  );
}

export default App;
