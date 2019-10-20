import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  VictoryArea,
  VictoryChart,
  VictoryContainer,
  VictoryTheme
} from "victory";
import styles from "../App.module.css";

class SpecificUser extends Component {
  render() {
    console.log(this.props.location.state.data);
    return (
      <div className={styles.chart}>
        <VictoryChart
          theme={VictoryTheme.material}
          height={300}
          width={400}
          containerComponent={<VictoryContainer />}
        >
          <VictoryArea
            style={{ data: { fill: "blue" } }}
            data={this.props.location.state.data}
            interpolation="natural"
          />
        </VictoryChart>
      </div>
    );
  }
}

export default withRouter(SpecificUser);
