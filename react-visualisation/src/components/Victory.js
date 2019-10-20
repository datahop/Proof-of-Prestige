<div className={styles.chart}>
  <VictoryChart
    domainPadding={20}
    theme={VictoryTheme.material}
    height={200}
    width={300}
    containerComponent={<VictoryContainer />}
  >
    <VictoryAxis
      tickValues={[1, 2, 3, 4]}
      tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
    />
    <VictoryAxis dependentAxis tickFormat={x => `$${x / 1000}k`} />
    <VictoryBar data={data} x="quarter" y="earnings" />
  </VictoryChart>
</div>;

onst myTreeData = [
    {
      name: "Top Level",
      attributes: {
        key: "value"
      },
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
