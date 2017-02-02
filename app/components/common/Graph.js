import React from 'react';
import hashHistory from 'react-router';
// import './Graph.scss';
// import {LineChart} from 'react-easy-chart';

import {VictoryLine, VictoryAxis, VictoryLabel, VictoryBar, VictoryPie, VictoryTooltip, VictoryVoronoiTooltip, VictoryChart, VictoryZoom, VictoryGroup } from 'victory';

import {Scrollbars} from 'react-custom-scrollbars';


class Graph extends React.Component {
  render() {
    //check to see if user has selected anything first





    //these are defined below the return statement
    const styles = this.getStyles();
    const dataSet1 = this.getDataSet1();
    const dataSet2 = this.getDataSet2();
    const dataSet3 = this.getDataSet3();
    const dataSet4 = this.getDataSet4();
    const dataSetTOOLTIP = this.getDataSetTOOLTIP();
    const dataSetTOOLTIP2 = this.getDataSetTOOLTIP2();
    // const tickValues = this.getTickValues();

    const dataSetTemp = this.getDataSetTemp();
    const dataSetRX_SEC = this.getDataSetRX_SEC();
    const dataSetTX_SEC = this.getDataSetTX_SEC();
    const dataSetActiveMemory = this.getDataSetActiveMemory();
    const dataSetSwapUsedMemory = this.getDataSetSwapUsedMemory();

    const data = this.props.data;
    let filtered = data.cpu.filter(function(el) {
      return el.value.avg >0
    })

    // if (!this.props.data) {
    //   return(
    //     <h3>Please select a time frame from the left, and give me a minute to collect all your data</h3>
    //   )
    // }

    return (

      <div>
        {/* {this.props.nums} */}

        <Scrollbars style={{
          height:800,
          color: 'white'
        }}>
        {/* /////////////        CPU   /////////////// */}
        <svg
          width={400} height={300}
          style={styles.parent}
          viewBox="0 0 400 325">

          <VictoryLabel x={175} y={25}        style={styles.title}
          text="CPU" />

          <VictoryLabel x={150} y={317}        style={styles.title}
          text="Interval Time" />

          <VictoryLabel x={25} y={45}        style={styles.title}
          text={"% of \n CPU"} />

          <g transform={"translate(-10,30)"}>
        {/*First VictoryAxis removed as VictoryZoom/Chart inserts x axis values automatically*/}
          {/* <VictoryAxis
            standalone={false}
            style={styles.axisTime}
            tickValues={tickValues}
            tickFormat={(x)=>x.toPrecision(1)}
          /> */}

            {/* This will be the first data line */}
            {/* Removed lines 1 2 and 4 as tooltip only functions on a single one */}
            <VictoryZoom>
              <VictoryChart>
                <VictoryAxis dependentAxis
                  domain={[0,4]}
                  orientation="left"
                  standalone={false}
                  style={styles.leftVerticalAxis}
                  offsetX={50}
                />
                <VictoryAxis
                  style={styles.axisTime}
                />
                <VictoryLine
                  data={dataSet1}
                  domain={{
                    x:[0,5],
                    y:[0,4]
                  }}
                  interpolation="monotoneX"
                  style={styles.lineSix}
                />
                <VictoryVoronoiTooltip
                  data={dataSet1}
                />
              </VictoryChart>
            </VictoryZoom>
          </g>
        </svg>

{/* ////////////////// NETWORK /////////////////// */}
        <svg
          width={400} height={300}
          style={styles.parent}
          viewBox="0 0 400 325">

          <VictoryLabel x={175} y={25}        style={styles.title}
          text="Network" />

          <VictoryLabel x={150} y={317}        style={styles.title}
          text="Interval Time" />

          <VictoryLabel x={25} y={40}        style={styles.network_titles1}
          text={"received bytes/sec"} />
          <VictoryLabel x={25} y={55}        style={styles.network_titles2}
          text={"transmitted bytes/sec"} />

          <g transform={"translate(-20,30)"}>

            {/* this axis must be dependentAxis */}

            <VictoryZoom>
              <VictoryChart>
                <VictoryAxis dependentAxis
                  domain={[0,60000]}
                  orientation="left"
                  standalone={false}
                  style={styles.leftNETWORKVerticalAxis}
                  offsetX={50}
                />
                <VictoryAxis
                  style={styles.axisTime}
                />
                {/* This will be the first data line */}
                {/* <VictoryZoom>
                  <VictoryChart> */}
                  <VictoryBar
                    // labelComponent={<VictoryTooltip/>}
                    data={dataSetRX_SEC}
                    domain={{
                      x:[0,10],
                      y:[0,100000]
                    }}
                    interpolation="natural"
                    style={styles.lineOne}
                  />

                  <VictoryAxis dependentAxis
                    domain={[0,4000]}
                    orientation="right"
                    standalone={true}
                    style={styles.rightNETWORKVerticalAxis}
                    offsetX={50}
                    //  offsetY={450}

                  />
                  {/* <VictoryAxis
                    style={styles.axisTime}
                  /> */}
                  <VictoryBar
                    // labelComponent={<VictoryTooltip/>}
                    data={dataSetTX_SEC}
                    domain={{
                      x:[0,10],
                      y:[0,4000]
                    }}
                    interpolation="monotoneX"
                    style={styles.lineTwo}
                  />
              </VictoryChart>
            </VictoryZoom>

                {/* <VictoryVoronoiTooltip
                  data={dataSet1}
                /> */}
              {/* </VictoryChart>
            </VictoryZoom> */}

          </g>
        </svg>

{/* //////////////////  TEMPERATURE  ////////////// */}
        <svg
          width={400} height={300}
          style={styles.parent}
          viewBox="0 0 400 325">

          <VictoryLabel x={175} y={25}        style={styles.title}
          text="Temperature" />

          <VictoryLabel x={150} y={317}        style={styles.title}
          text="Interval Time" />

          <VictoryLabel x={25} y={45}        style={styles.title}
          text={"Main Temps"} />

          <g transform={"translate(-10,30)"}>
            {/* <VictoryAxis dependentAxis
              //  domain={[0,4]}
               orientation="left"
               standalone={false}
               style={styles.leftVerticalAxis}
               offsetX={50}
            /> */}
            <VictoryZoom>
              <VictoryChart
                domain={{
                  x:[0,5],
                  y:[0,100]
                }}
                style={{
                  axis:{
                    axis: {stroke: "white", strokeWidth:3},
                  }
                }}
                >
                  <VictoryAxis
                    //  domain={[0,4]}
                    //  orientation="left"
                    //  standalone={false}
                     style={styles.axisTime}
                    //  offsetX={50}
                  />
                  <VictoryAxis dependentAxis
                    //  domain={[0,4]}
                    //  orientation="left"
                    //  standalone={false}
                     style={styles.leftVerticalAxis}
                    //  offsetX={50}
                  />
                <VictoryLine
                  data={dataSetTemp}
                  domain={{
                    x:[0,5],
                    y:[0,100]
                  }}
                  interpolation="monotoneX"
                  style={styles.lineFive}
                />
                <VictoryVoronoiTooltip
                  data={dataSet1}
                />
              </VictoryChart>
            </VictoryZoom>
          </g>
        </svg>

{/* //////////   MEMORY 1?? //////////////////////////  */}
        <svg
          width={400} height={300}
          style={styles.parent}
          viewBox="0 0 400 325">

          <VictoryLabel x={175} y={25}        style={styles.title}
          text="Active Memory" />

          <VictoryLabel x={150} y={317}        style={styles.title}
          text="Interval Time" />

          <VictoryLabel x={25} y={45}        style={styles.title}
          text={"Used Actively"} />

          <g transform={"translate(-10,30)"}>
            <VictoryZoom>
              <VictoryChart>
                <VictoryAxis dependentAxis
                  // domain={[0,3000000000]}
                  orientation="left"
                  standalone={false}
                  style={styles.leftMEMORYVerticalAxis}
                  offsetX={50}
                />
                <VictoryAxis
                  style={styles.axisTime}
                />
                <VictoryLine
                  data={dataSetActiveMemory}
                  domain={{
                    x:[0,10],
                    y:[2000000000,3000000000]
                  }}
                  interpolation="monotoneX"
                  style={styles.lineFour}
                />
                {/* <VictoryVoronoiTooltip
                  data={dataSetActiveMemory}
                /> */}
              </VictoryChart>
            </VictoryZoom>
          </g>
        </svg>


{/* ////////////  swapUsedMemory ////////////////////// */}
        <svg
          width={400} height={300}
          style={styles.parent}
          viewBox="0 0 400 325">

          <VictoryLabel x={175} y={25}        style={styles.title}
          text="Used Swap Memory" />

          <VictoryLabel x={150} y={317}        style={styles.title}
          text="Interval Time" />

          <VictoryLabel x={25} y={45}        style={styles.title}
          text={"Used \n bytes Swap Memory"} />

          <g transform={"translate(-10,30)"}>
            <VictoryZoom>
              <VictoryChart>
                <VictoryAxis dependentAxis
                  domain={[0,3000000000]}
                  orientation="left"
                  standalone={false}
                  style={styles.leftMEMORYVerticalAxis}
                  offsetX={50}
                />
                <VictoryAxis
                  style={styles.axisTime}
                />
                <VictoryLine
                  data={dataSetSwapUsedMemory}
                  domain={{
                    x:[0,10],
                    y:[3000000000,4000000000]
                  }}
                  interpolation="monotoneX"
                  style={styles.lineSeven}
                />
              </VictoryChart>
            </VictoryZoom>
          </g>
        </svg>

      </Scrollbars>
      </div>
    );
  }
// ///////////  GET DATA AND STYLES /////////////////////
  getDataSet1() {
    return this.props.nums
  }

  getDataSetTemp() {
    return this.props.temp
  }

  getDataSetRX_SEC() {
    return this.props.rx_sec
  }

  getDataSetTX_SEC() {
    return this.props.tx_sec
  }

  getDataSetActiveMemory() {
    return this.props.activeMemory
  }

  getDataSetSwapUsedMemory() {
    return this.props.swapMemory
  }

  getDataSetTOOLTIP() {
    return [
      {x:0, y:0, label: "Hello"},
      {x:1, y:1, label: "Jason"},
      {x:2, y:2, label: "How"},
      {x:3, y:2, label: "Are"},
      {x:4, y:3, label: "You"},
      {x:5, y:4, label: "Today?"},
    ]
  }

  getDataSetTOOLTIP2() {
    return [
      {x:0.5, y:0, label: "..."},
      {x:1.5, y:1, label: "..."},
      {x:2.5, y:2, label: "..."},
      {x:3.5, y:2, label: "..."},
      {x:4.5, y:3, label: "..."},
    ]
  }

  getDataSet2() {
    return [
      {x:0, y:4, label: "data"},
      {x:1, y:4, label: "data"},
      {x:2, y:1, label: "data"},
      {x:3, y:0, label: "data"},
      {x:4, y:1, label: "data"},
      {x:5, y:2, label: "data"},
    ]
  }

  getDataSet3() {
    return [
      {x:0, y:1, label: "data"},
      {x:1, y:3, label: "data"},
      {x:2, y:0, label: "data"},
      {x:3, y:4, label: "data"},
      {x:4, y:2, label: "data"},
      {x:5, y:2, label: "data"},
    ]
  }

  getDataSet4() {
    return [
      {x:0, y:0},
      {x:1, y:2},
      {x:2, y:3},
      {x:3, y:4},
      {x:4, y:1},
      {x:5, y:3},
    ]
  }

  // getTickValues() {
  //   return [0,1,2,3,4,5];
  // }

  getStyles() {
    //rgb(176, 148, 27)
    //define constants here?
    const BLUE_LINE = "rgb(30, 219, 231)";
    const PURPLE_LINE = "rgb(169, 32, 226)";
    const ORANGE_LINE = "rgb(238, 169, 14)";
    const GREEN_LINE = 'rgb(43, 191, 31)';
    const HIGHLIGHTER_LINE= 'rgb(238, 230, 29)';
    const RED_LINE = 'rgb(241, 10, 58)';
    const PINK_LINE = 'rgb(246, 36, 206)';
    //this will return an object, not an array
    return {
      parent: {
        background: "#333334",
        boxSizing: "border-box",
        display: "inline",
        margin: 25,
        // width: "100%",
        // height: "auto"
      },

      //label styles
      title: {
        fill: "white",
        fontFamily: "inherit",
        fontSize: "16px",
        fontWeight: "bold"
      },

      network_titles1: {
        fill:BLUE_LINE,
        fontFamily: "inherit",
        fontSize: "13px",
        fontWeight: "bold"
      },

      network_titles2: {
        fill:PURPLE_LINE,
        fontFamily: "inherit",
        fontSize: "13px",
        fontWeight: "bold"
      },

      pie: {
        axis: {fill: PURPLE_LINE, strokeWidth:3},
        labels: {fill: "white", fontSize:14},
        parent: {border: "1px solid red"}
      },

      //axis styles
      axisTime: {
        axis: {stroke: "white", strokeWidth:1},
        ticks: {
          stroke: "white",
          strokeWidth:1
        },
        tickLabels: {
          fill: "white",
          fontFamily: "inherit",
          fontSize: 16
        }
      },

      leftVerticalAxis: {
        grid: {
          stroke: (tick) =>
            tick === -10 ? "transparent" : "rgba(127, 125, 129, 0.71)",
          strokeWidth: 2
        },

        axis: {stroke: "white", strokeWidth:3},
        ticks: {stroke: "white", strokeWidth:3},
        tickLabels: {
          fill: "white",
          fontFamily: "inherit",
          fontSize:15
        }
      },

      leftNETWORKVerticalAxis: {
        grid: {
          stroke: (tick) =>
            tick === -10 ? "transparent" : "rgba(127, 125, 129, 0.71)",
          strokeWidth: 2
        },

        axis: {stroke: BLUE_LINE, strokeWidth:3},
        ticks: {stroke: BLUE_LINE, strokeWidth:3},
        tickLabels: {
          fill: BLUE_LINE,
          fontFamily: "inherit",
          fontSize:10
        }
      },

      rightNETWORKVerticalAxis: {
        axis: {stroke: PURPLE_LINE, strokeWidth:3},
        ticks: {stroke: PURPLE_LINE, strokeWidth:3},
        tickLabels: {
          fill: PURPLE_LINE,
          fontFamily: "inherit",
          fontSize:10
      }
    },

      leftMEMORYVerticalAxis: {
        grid: {
          stroke: (tick) =>
            tick === -10 ? "transparent" : "rgba(127, 125, 129, 0.71)",
          strokeWidth: 2
        },

        axis: {stroke: "white", strokeWidth:3},
        ticks: {stroke: "white", strokeWidth:3},
        tickLabels: {
          fill: "white",
          fontFamily: "inherit",
          fontSize:8
        }
      },

      //line styles
      lineOne: {
        data: {stroke: BLUE_LINE, strokeWidth:3}
      },
      lineTwo: {
        data: {stroke: PURPLE_LINE, strokeWidth:3}
      },
      lineThree: {
        data: {stroke: ORANGE_LINE, strokeWidth:3}
      },
      lineFour: {
        data: {stroke: GREEN_LINE, strokeWidth:3}
      },
      lineFive: {
        data: {stroke: HIGHLIGHTER_LINE, strokeWidth:3}
      },
      lineSix: {
        data: {stroke: RED_LINE, strokeWidth:3}
      },
      lineSeven: {
        data: {stroke: PINK_LINE, strokeWidth:3}
      }
    }
  }
}

export default Graph;
