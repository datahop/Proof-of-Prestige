import React from "react";
import Tree from "react-d3-tree";
import { Redirect } from "react-router-dom";

const containerStyles = {
  width: "100%",
  height: "100vh"
};

export default class CenteredTree extends React.PureComponent {
  state = {};

  componentDidMount() {
    const dimensions = this.treeContainer.getBoundingClientRect();
    this.setState({
      translate: {
        x: dimensions.width / 2,
        y: 50
      },
      redirectApproved: false,
      node: {}
    });
  }

  setRedirect = nodeData => {
    this.setState({ redirectApproved: true, node: nodeData });
  };

  renderRedirect = () => {
    if (this.state.redirectApproved) {
      console.log(this.state.node);
      return (
        <Redirect
          push
          to={{
            pathname: "/details",
            state: {
              nodeName: this.state.node.name,
              data: this.state.node.prestigeGraph
            }
          }}
        />
      );
    }
  };

  render() {
    const color = "blue";
    return (
      <div style={containerStyles} ref={tc => (this.treeContainer = tc)}>
        {this.renderRedirect()}
        <Tree
          data={this.props.data}
          translate={this.state.translate}
          orientation={"vertical"}
          collapsible={false}
          zoomable={false}
          onClick={nodeData => this.setRedirect(nodeData)}
          //styles={{
          //nodes: { node: { circle: { fill: `${color}` } } }
          //}}
        />
      </div>
    );
  }
}
