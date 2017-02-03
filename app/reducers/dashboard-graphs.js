import React from 'react';

import {VictoryLine, VictoryAxis, VictoryLabel, VictoryBar, VictoryPie, VictoryTooltip, VictoryVoronoiTooltip, VictoryChart, VictoryZoom, VictoryGroup } from 'victory';


const BLUE_LINE = "rgb(30, 219, 231)";
const PURPLE_LINE = "rgb(169, 32, 226)";
const ORANGE_LINE = "rgb(238, 169, 14)";
const GREEN_LINE = 'rgb(43, 191, 31)';
const HIGHLIGHTER_LINE= 'rgb(238, 230, 29)';
const RED_LINE = 'rgb(241, 10, 58)';
const PINK_LINE = 'rgb(246, 36, 206)';


export default function() {
    return [
      {
        id:1,
        first: 'CPU',
        last:'Example',
        age: 43,
        details: 'CPU average load is a measure of ',
        description: 'CPU DATA',
        exampleGraph: <svg
          width={400} height={300}
          viewBox="0 0 400 325"
          style={{
            background: "#333334",
            boxSizing: "border-box",
            display: "inline",
            margin: 25,
          }}>
          <VictoryLabel x={175} y={25}
            style={{
            fill: "white",
            fontFamily: "inherit",
            fontSize: "16px",
            fontWeight: "bold"
          }}
          text="CPU" />

          <VictoryLabel x={150} y={317}
            style={{
            fill: "white",
            fontFamily: "inherit",
            fontSize: "16px",
            fontWeight: "bold"
          }}
          text="Interval Time" />

          <VictoryLabel x={25} y={45}
            style={{
            fill: "white",
            fontFamily: "inherit",
            fontSize: "16px",
            fontWeight: "bold"
          }}
          text={"% of \n CPU"} />

          <g transform={"translate(-10,30)"}>
            <VictoryZoom>
              <VictoryChart>
                <VictoryAxis dependentAxis
                  domain={[0,4]}
                  orientation="left"
                  standalone={false}
                  offsetX={50}
                  style={{
                    grid: {
                      stroke: (tick) =>
                        tick === -10 ? "transparent" : "rgb(83, 80, 93)",
                      strokeWidth: 2
                    },

                    axis: {stroke: "white", strokeWidth:3},
                    ticks: {stroke: "white", strokeWidth:3},
                    tickLabels: {
                      fill: "white",
                      fontFamily: "inherit",
                      fontSize:15
                    }
                  }}
                />
                <VictoryAxis
                  style={{
                    axis: {stroke: "white", strokeWidth:3},
                    tickLabels: {
                      fill: "white",
                      fontFamily: "inherit",
                      fontSize: 16
                    }
                  }}
                />
                <VictoryLine
                  data={[
                    {x:0, y:0, label: "0"},
                    {x:1, y:1, label: "1"},
                    {x:2, y:2, label: "2"},
                    {x:3, y:2, label: "2"},
                    {x:4, y:2, label: "2"},
                    {x:5, y:0, label: "0"},
                  ]}
                  domain={{
                    x:[0,5],
                    y:[0,4]
                  }}
                  style={{
                  data: {stroke: RED_LINE, strokeWidth:4},
                  labels: {fontSize: 12},
                  parent: {border: "1px solid #ccc"}
                  }}
                  interpolation="monotoneX"
                />
                <VictoryVoronoiTooltip
                  data={[
                    {x:0, y:0, label: "0"},
                    {x:1, y:1, label: "1"},
                    {x:2, y:2, label: "2"},
                    {x:3, y:2, label: "2"},
                    {x:4, y:2, label: "2"},
                    {x:5, y:0, label: "0"},
                  ]}
                />
              </VictoryChart>
            </VictoryZoom>
          </g>
        </svg>

      },
      ////////////////////////////////////////////////
      {
        id:2,
        first: 'Network',
        last:'Example',
        age: 21,
        details: 'network details',
        description: 'NETWORK DATA',
        exampleGraph: <svg
          width={400} height={300}
          style={{
              background: "#333334",
              boxSizing: "border-box",
              display: "inline",
              margin: 25,
            }}
          viewBox="0 0 400 325">

          <VictoryLabel
            x={175}
            y={25}
            style={{
            fill: "white",
            fontFamily: "inherit",
            fontSize: "16px",
            fontWeight: "bold"
          }}
          text="Network" />

          <VictoryLabel
          x={150} y={317}
          style={{
          fill: "white",
          fontFamily: "inherit",
          fontSize: "16px",
          fontWeight: "bold"
          }}
          text="Interval Time" />

          <VictoryLabel x={25} y={40}
            style={{
            fill:BLUE_LINE,
            fontFamily: "inherit",
            fontSize: "13px",
            fontWeight: "bold"
          }}
          text={"received bytes/sec"} />
          <VictoryLabel x={25} y={55}
            style={{
            fill:PURPLE_LINE,
            fontFamily: "inherit",
            fontSize: "13px",
            fontWeight: "bold"
          }}
          text={"transmitted bytes/sec"} />

          <g transform={"translate(-20,30)"}>

            <VictoryZoom>
              <VictoryChart>
                <VictoryAxis dependentAxis
                  domain={[0,10]}
                  orientation="left"
                  standalone={false}
                  style={{
                    grid: {
                      stroke: (tick) =>
                        tick === -10 ? "transparent" : "rgb(83, 80, 93)",
                      strokeWidth: 2
                    },

                    axis: {stroke: "white", strokeWidth:3},
                    ticks: {stroke: BLUE_LINE, strokeWidth:3},
                    tickLabels: {
                      fill: "white",
                      fontFamily: "inherit",
                      fontSize:10
                    }
                  }}
                  offsetX={50}
                />
                <VictoryAxis
                  style={{
                    axis: {stroke: "white", strokeWidth:3},
                    tickLabels: {
                      fill: "white",
                      fontFamily: "inherit",
                      fontSize:15
                    }
                  }}
                />

                  <VictoryBar
                    labelComponent={<VictoryTooltip/>}
                    data={
                      [
                        {x:0, y:4, label: "4"},
                        {x:1, y:7, label: "7"},
                        {x:2, y:1, label: "1"},
                        {x:3, y:0, label: "0"},
                        {x:4, y:1, label: "1"},
                        {x:5, y:6, label: "6"},
                        {x:6, y:2, label: "2"},
                        {x:7, y:2, label: "2"},
                        {x:8, y:8, label: "8"},
                        {x:9, y:2, label: "2"},
                      ]
                    }
                    domain={{
                      x:[0,10],
                      y:[0,10]
                    }}
                    interpolation="natural"
                    style={{
                    data: {fill: BLUE_LINE, strokeWidth:4},
                    labels: {fontSize: 12},
                    parent: {border: "1px solid #ccc"}
                    }}
                  />


                  <VictoryBar
                    labelComponent={<VictoryTooltip/>}
                    data={[
                      {x:0.5, y:1, label: "1"},
                      {x:1.5, y:3, label: "3"},
                      {x:2.5, y:0, label: "0"},
                      {x:3.5, y:4, label: "4"},
                      {x:4.5, y:8, label: "8"},
                      {x:5.5, y:2, label: "2"},
                      {x:6.5, y:1, label: "1"},
                      {x:7.5, y:6, label: "6"},
                      {x:8.5, y:0, label: "0"},
                      {x:9.5, y:4, label: "4"},
                    ]}
                    domain={{
                      x:[0,10],
                      y:[0,10]
                    }}
                    interpolation="monotoneX"
                    style={{
                      data: {fill: PURPLE_LINE, strokeWidth:3},
                    }}
                  />
              </VictoryChart>
            </VictoryZoom>


          </g>
        </svg>
      },
      //////////////////////////////////////////////////
      {
        id:3,
        first: 'Temperature',
        last:'Example',
        age: 5668,
        details: 'details for temp',
        description: 'TEMPERATURE DATA',
        exampleGraph: <svg
          width={400} height={300}
          viewBox="0 0 400 325"
          style={{
            background: "#333334",
            boxSizing: "border-box",
            display: "inline",
            margin: 25,
          }}>
          <VictoryLabel x={175} y={25}
            style={{
            fill: "white",
            fontFamily: "inherit",
            fontSize: "16px",
            fontWeight: "bold"
          }}
          text="TEMPERATURE" />

          <VictoryLabel x={150} y={317}
            style={{
            fill: "white",
            fontFamily: "inherit",
            fontSize: "16px",
            fontWeight: "bold"
          }}
          text="Interval Time" />

          <VictoryLabel x={25} y={45}
            style={{
            fill: "white",
            fontFamily: "inherit",
            fontSize: "16px",
            fontWeight: "bold"
          }}
          text={"Degrees"} />


          <g transform={"translate(-10,30)"}>
            <VictoryZoom>
              <VictoryChart>
                <VictoryAxis dependentAxis
                  // domain={[50.75]}
                  orientation="left"
                  standalone={false}
                  offsetX={50}
                  style={{
                    grid: {
                      stroke: (tick) =>
                        tick === -10 ? "transparent" : "rgb(83, 80, 93)",
                      strokeWidth: 2
                    },

                    axis: {stroke: "white", strokeWidth:3},
                    ticks: {stroke: "white", strokeWidth:3},
                    tickLabels: {
                      fill: "white",
                      fontFamily: "inherit",
                      fontSize:15
                    }
                  }}
                />
                <VictoryAxis
                  style={{
                    axis: {stroke: "white", strokeWidth:3},
                    tickLabels: {
                      fill: "white",
                      fontFamily: "inherit",
                      fontSize:15
                    }
                  }}
                />
                <VictoryLine
                  data={[
                    {x:0,y:66, label:"66"},
                    {x:1,y:58, label:"58"},
                    {x:2,y:61, label:"61"},
                    {x:3,y:60, label:"60"},
                    {x:4,y:64, label:"64"},
                    {x:5,y:72, label:"72"},
                    {x:6,y:69, label:"69"},
                    {x:7,y:64, label:"64"},
                    {x:8,y:70, label:"70"},
                    {x:9,y:66, label:"66"},
                    {x:10,y:58, label:"58"},
                    {x:11,y:59, label:"59"},
                    {x:12,y:61, label:"61"},
                    {x:13,y:60, label:"60"},
                    {x:14,y:62, label:"62"},
                  ]}
                  domain={{
                    x:[0,15],
                    y:[50,75]
                  }}
                  style={{
                  data: {stroke: HIGHLIGHTER_LINE, strokeWidth: 3},
                  labels: {fontSize: 12},
                  parent: {border: "1px solid #ccc"}
                  }}
                  interpolation="monotoneX"
                />
                <VictoryVoronoiTooltip
                  data={[
                    {x:0,y:66, label:"66"},
                    {x:1,y:58, label:"58"},
                    {x:2,y:61, label:"61"},
                    {x:3,y:60, label:"60"},
                    {x:4,y:64, label:"64"},
                    {x:5,y:72, label:"72"},
                    {x:6,y:69, label:"69"},
                    {x:7,y:64, label:"64"},
                    {x:8,y:70, label:"70"},
                    {x:9,y:66, label:"66"},
                    {x:10,y:58, label:"58"},
                    {x:11,y:59, label:"59"},
                    {x:12,y:61, label:"61"},
                    {x:13,y:60, label:"60"},
                    {x:14,y:62, label:"62"},
                  ]}
                />
              </VictoryChart>
            </VictoryZoom>
          </g>
        </svg>
      },
      ////////////////////////////////////////////////////
      {
        id:4,
        first: 'Active Memory',
        last:'Example',
        details: 'active memory details',
        age: 42232,
        description: 'MEMORY ACTIVELY USED',
        exampleGraph: <svg
          width={400} height={300}
          viewBox="0 0 400 325"
          style={{
            background: "#333334",
            boxSizing: "border-box",
            display: "inline",
            margin: 25,
          }}>
          <VictoryLabel x={110} y={25}
            style={{
            fill: "white",
            fontFamily: "inherit",
            fontSize: "16px",
            fontWeight: "bold"
          }}
          text="ACTIVE MEMORY USED" />

          <VictoryLabel x={150} y={317}
            style={{
            fill: "white",
            fontFamily: "inherit",
            fontSize: "16px",
            fontWeight: "bold"
          }}
          text="Interval Time" />

          <VictoryLabel x={25} y={45}
            style={{
            fill: "white",
            fontFamily: "inherit",
            fontSize: "16px",
            fontWeight: "bold"
          }}
          text={"GB"} />


          <g transform={"translate(-10,30)"}>
            <VictoryZoom>
              <VictoryChart>
                <VictoryAxis dependentAxis
                  domain={[0,4]}
                  orientation="left"
                  standalone={false}
                  offsetX={50}
                  style={{
                    grid: {
                      stroke: (tick) =>
                        tick === -10 ? "transparent" : "rgb(83, 80, 93)",
                      strokeWidth: 2
                    },

                    axis: {stroke: "white", strokeWidth:3},
                    ticks: {stroke: "white", strokeWidth:3},
                    tickLabels: {
                      fill: "white",
                      fontFamily: "inherit",
                      fontSize:15
                    }
                  }}
                />
                <VictoryAxis
                  style={{
                    axis: {stroke: "white", strokeWidth:3},
                    tickLabels: {
                      fill: "white",
                      fontFamily: "inherit",
                      fontSize:15
                    }
                  }}
                />
                <VictoryLine
                  data={[

                    {x:0,y:3.9,label:"3.9"},
                    {x:1,y:2.7,label:"2.7"},
                    {x:2,y:2.9,label:"2.9"},
                    {x:3,y:3.9,label:"3.9"},
                    {x:4,y:3.3,label:"3.3"},
                    {x:5,y:2.9,label:"2.9"},
                    {x:6,y:3.2,label:"3.2"},
                    {x:7,y:2.6,label:"2.6"},
                    {x:8,y:2.8,label:"2.8"},
                    {x:9,y:2.4,label:"2.4"},
                    {x:10,y:2.5,label:"2.5"},
                    {x:11,y:3.2,label:"3.2"},
                    {x:12,y:2.4,label:"2.4"},
                    {x:13,y:3.9,label:"3.9"},
                    {x:14,y:2.6,label:"2.6"},

                  ]}
                  domain={{
                    x:[0,5],
                    y:[0,4]
                  }}
                  style={{
                  data: {stroke: GREEN_LINE, strokeWidth:3},
                  labels: {fontSize: 12},
                  parent: {border: "1px solid #ccc"}
                  }}
                  interpolation="monotoneX"
                />
                <VictoryVoronoiTooltip
                  data={[

                    {x:0,y:3.9,label:"3.9"},
                    {x:1,y:2.7,label:"2.7"},
                    {x:2,y:2.9,label:"2.9"},
                    {x:3,y:3.9,label:"3.9"},
                    {x:4,y:3.3,label:"3.3"},
                    {x:5,y:2.9,label:"2.9"},
                    {x:6,y:3.2,label:"3.2"},
                    {x:7,y:2.6,label:"2.6"},
                    {x:8,y:2.8,label:"2.8"},
                    {x:9,y:2.4,label:"2.4"},
                    {x:10,y:2.5,label:"2.5"},
                    {x:11,y:3.2,label:"3.2"},
                    {x:12,y:2.4,label:"2.4"},
                    {x:13,y:3.9,label:"3.9"},
                    {x:14,y:2.6,label:"2.6"},

                  ]}
                />
              </VictoryChart>
            </VictoryZoom>
          </g>
        </svg>
      },
      ///////////////////////////////////////////////////
      {
        id:5,
        first: 'Swap Memory',
        last:'Example',
        details: 'swap memory details',
        age: 42232,
        description: 'SWAP MEMORY CURRENTLY USED',
        exampleGraph: <svg
          width={400} height={300}
          viewBox="0 0 400 325"
          style={{
            background: "#333334",
            boxSizing: "border-box",
            display: "inline",
            margin: 25,
          }}>
          <VictoryLabel x={100} y={25}
            style={{
            fill: "white",
            fontFamily: "inherit",
            fontSize: "16px",
            fontWeight: "bold"
          }}
          text="SWAP MEMORY CURRENTLY USED" />

          <VictoryLabel x={150} y={317}
            style={{
            fill: "white",
            fontFamily: "inherit",
            fontSize: "16px",
            fontWeight: "bold"
          }}
          text="Interval Time" />

          <VictoryLabel x={25} y={45}
            style={{
            fill: "white",
            fontFamily: "inherit",
            fontSize: "16px",
            fontWeight: "bold"
          }}
          text={"GB"} />


          <g transform={"translate(-10,30)"}>
            <VictoryZoom>
              <VictoryChart>
                <VictoryAxis dependentAxis
                  domain={[0,4]}
                  orientation="left"
                  standalone={false}
                  offsetX={50}
                  style={{
                    grid: {
                      stroke: (tick) =>
                        tick === -10 ? "transparent" : "rgb(83, 80, 93)",
                      strokeWidth: 2
                    },

                    axis: {stroke: "white", strokeWidth:3},
                    ticks: {stroke: "white", strokeWidth:3},
                    tickLabels: {
                      fill: "white",
                      fontFamily: "inherit",
                      fontSize:15
                    }
                  }}
                />
                <VictoryAxis
                  style={{
                    axis: {stroke: "white", strokeWidth:3},
                    tickLabels: {
                      fill: "white",
                      fontFamily: "inherit",
                      fontSize:15
                    }
                  }}
                />
                <VictoryLine
                  data={[
                    {x:0,y:3.8,label:"3.8"},
                    {x:1,y:3.9,label:"3.9"},
                    {x:2,y:4.1,label:"4.1"},
                    {x:3,y:3.3,label:"3.3"},
                    {x:4,y:3.3,label:"3.3"},
                    {x:5,y:3.9,label:"3.9"},
                    {x:6,y:4.0,label:"4.0"},
                    {x:7,y:4.1,label:"4.1"},
                    {x:8,y:3.5,label:"3.5"},
                    {x:9,y:4.1,label:"4.1"},
                    {x:10,y:4.2,label:"4.2"},
                    {x:11,y:4.1,label:"4.1"},
                    {x:12,y:3.7,label:"3.7"},
                    {x:13,y:3.8,label:"3.8"},
                    {x:14,y:3.7,label:"3.7"},

                  ]}
                  domain={{
                    x:[0,5],
                    y:[2,5]
                  }}
                  style={{
                  data: {stroke: PINK_LINE, strokeWidth:3},
                  labels: {fontSize: 12},
                  parent: {border: "1px solid #ccc"}
                  }}
                  interpolation="monotoneX"
                />
                <VictoryVoronoiTooltip
                  data={[
                    {x:0,y:3.8,label:"3.8"},
                    {x:1,y:3.9,label:"3.9"},
                    {x:2,y:4.1,label:"4.1"},
                    {x:3,y:3.3,label:"3.3"},
                    {x:4,y:3.3,label:"3.3"},
                    {x:5,y:3.9,label:"3.9"},
                    {x:6,y:4.0,label:"4.0"},
                    {x:7,y:4.1,label:"4.1"},
                    {x:8,y:3.5,label:"3.5"},
                    {x:9,y:4.1,label:"4.1"},
                    {x:10,y:4.2,label:"4.2"},
                    {x:11,y:4.1,label:"4.1"},
                    {x:12,y:3.7,label:"3.7"},
                    {x:13,y:3.8,label:"3.8"},
                    {x:14,y:3.7,label:"3.7"},

                  ]}
                />
              </VictoryChart>
            </VictoryZoom>
          </g>
        </svg>
      }
    ]
}
