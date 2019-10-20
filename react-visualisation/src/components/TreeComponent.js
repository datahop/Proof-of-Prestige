import React, { useEffect, useState } from "react";
import Tree from "react-d3-tree";
import styles from "./TreeComponent.module.css";
import CenteredTree from "./CenteredTree";
import { exportDefaultSpecifier } from "@babel/types";

const checkSender = el => {
  if (el.name === "Top Level") {
    return el;
  }
};

const myTreeData = [
  {
    name: "Top Level",
    nodeSvgShape: {
      shape: "circle",
      shapeProps: {
        fill: "green",
        r: 10
      }
    },
    children: [
      {
        name: "Level 2: A",
        nodeSvgShape: {
          shape: "circle",
          shapeProps: {
            fill: "green",
            r: 10
          }
        },
        prestigeGraph: [
          {
            x: 1,
            y: 10
          },
          {
            x: 2,
            y: 20
          },
          {
            x: 3,
            y: 15
          },
          {
            x: 4,
            y: 30
          }
        ],
        children: [
          {
            name: "Level 3: A",
            nodeSvgShape: {
              shape: "circle",
              shapeProps: {
                fill: "orange",
                r: 10
              }
            },
            children: [
              {
                name: "Level 4: A",
                nodeSvgShape: {
                  shape: "circle",
                  shapeProps: {
                    fill: "orange",
                    r: 10
                  }
                }
              }
            ],
            prestigeGraph: [
              {
                x: 1,
                y: 7
              },
              {
                x: 2,
                y: 18
              },
              {
                x: 3,
                y: 11
              },
              {
                x: 4,
                y: 14
              }
            ]
          },
          {
            name: "Level 3: B",
            nodeSvgShape: {
              shape: "circle",
              shapeProps: {
                fill: "yellow",
                r: 10
              }
            },
            children: [
              {
                name: "Level 4: B",
                nodeSvgShape: {
                  shape: "circle",
                  shapeProps: {
                    fill: "red",
                    r: 10
                  }
                }
              },
              {
                name: "Level 4: C",
                nodeSvgShape: {
                  shape: "circle",
                  shapeProps: {
                    fill: "yellow",
                    r: 10
                  }
                }
              },
              {
                name: "Level 4: D",
                nodeSvgShape: {
                  shape: "circle",
                  shapeProps: {
                    fill: "orange",
                    r: 10
                  }
                }
              }
            ],
            prestigeGraph: [
              {
                x: 1,
                y: 2
              },
              {
                x: 2,
                y: 6
              },
              {
                x: 3,
                y: 12
              },
              {
                x: 4,
                y: 20
              }
            ]
          },
          {
            name: "Level 3: C",
            nodeSvgShape: {
              shape: "circle",
              shapeProps: {
                fill: "orange",
                r: 10
              }
            },
            children: [
              {
                name: "Level 4: E",
                nodeSvgShape: {
                  shape: "circle",
                  shapeProps: {
                    fill: "red",
                    r: 10
                  }
                }
              },
              {
                name: "Level 4: F",
                nodeSvgShape: {
                  shape: "circle",
                  shapeProps: {
                    fill: "yellow",
                    r: 10
                  }
                }
              },
              {
                name: "Level 4: G",
                nodeSvgShape: {
                  shape: "circle",
                  shapeProps: {
                    fill: "orange",
                    r: 10
                  }
                }
              },
              {
                name: "Level 4: H",
                nodeSvgShape: {
                  shape: "circle",
                  shapeProps: {
                    fill: "orange",
                    r: 10
                  }
                }
              }
            ],
            prestigeGraph: [
              {
                x: 1,
                y: 1
              },
              {
                x: 2,
                y: 1
              },
              {
                x: 3,
                y: 15
              },
              {
                x: 4,
                y: 16
              }
            ]
          }
        ]
      },
      {
        name: "Level 2: B",
        nodeSvgShape: {
          shape: "circle",
          shapeProps: {
            fill: "yellow",
            r: 10
          }
        },
        children: [
          {
            name: "Level 3: A",
            nodeSvgShape: {
              shape: "circle",
              shapeProps: {
                fill: "red",
                r: 10
              }
            },
            prestigeGraph: [
              {
                x: 1,
                y: 2
              },
              {
                x: 2,
                y: 1
              },
              {
                x: 3,
                y: 7
              },
              {
                x: 4,
                y: 21
              }
            ]
          },
          {
            name: "Level 3: B",
            nodeSvgShape: {
              shape: "circle",
              shapeProps: {
                fill: "yellow",
                r: 10
              }
            },
            prestigeGraph: [
              {
                x: 1,
                y: 8
              },
              {
                x: 2,
                y: 6
              },
              {
                x: 3,
                y: 7
              },
              {
                x: 4,
                y: 9
              }
            ]
          },
          {
            name: "Level 3: C",
            nodeSvgShape: {
              shape: "circle",
              shapeProps: {
                fill: "yellow",
                r: 10
              }
            },
            prestigeGraph: [
              {
                x: 1,
                y: 10
              },
              {
                x: 2,
                y: 9
              },
              {
                x: 3,
                y: 8
              },
              {
                x: 4,
                y: 7
              }
            ]
          }
        ]
      }
    ]
  }
];

const TreeComponent = () => {
  const [nodes, setNodes] = [{ name: "Undefined" }];

  useEffect(() => {
    fetch("http://192.168.43.70:5000/transfer", {
      method: "GET"
    })
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function(data) {
        const newNodes = [{ name: "hello", children: [{ name: "hi" }] }];
        console.log(data);
        data.forEach(element => {
          fetch("http://192.168.43.70:5000/transfers", {
            method: "POST",
            body: element
          })
            .then(function(response) {
              if (response.status >= 400) {
                throw new Error("Bad response from server");
              }

              return response.json();
            })
            .then(function(data) {
              console.log(data);

              const searchSender = el => {
                if (el.name === "bye") {
                  console.log(el.children.length);
                } else if (el.children.length > 0) {
                  el.children.forEach(edge => {
                    console.log(edge.name);
                  });
                }
              };
              newNodes.forEach(node => {
                searchSender(node);
              });
            });
        });
      });
  }, []);

  //addArrayEntry();
  return (
    <div className={styles.tree}>
      <CenteredTree data={myTreeData} orientation="vertical" />;
    </div>
  );
};

export default TreeComponent;
