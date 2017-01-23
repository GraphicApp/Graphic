import React from 'react';
import hashHistory from 'react-router';
// import './Graph.scss';
// import {LineChart} from 'react-easy-chart';

import {VictoryLine, VictoryAxis, VictoryLabel, VictoryBar, VictoryPie, VictoryTooltip} from 'victory';

import {Scrollbars} from 'react-custom-scrollbars';


class Graph extends React.Component {
  render() {
    //these are defined below the return statement
    const styles = this.getStyles();
    const dataSet1 = this.getDataSet1();
    const dataSet2 = this.getDataSet2();
    const dataSet3 = this.getDataSet3();
    const dataSet4 = this.getDataSet4();
    const dataSetTOOLTIP = this.getDataSetTOOLTIP();
    const dataSetTOOLTIP2 = this.getDataSetTOOLTIP2();
    const tickValues = this.getTickValues();


    return (

      <div>
        <Scrollbars style={{
          height:600,
          color: 'white'
        }}>
        <svg
          width={400} height={300}
          style={styles.parent}
          viewBox="0 0 400 325">

          <VictoryLabel x={175} y={25}        style={styles.title}
          text="CPU" />

          <VictoryLabel x={150} y={317}        style={styles.title}
          text="Time in Seconds" />

          <VictoryLabel x={25} y={45}        style={styles.title}
          text={"% of \n CPU"} />

          <g transform={"translate(-10,30)"}>
            <VictoryAxis
              standalone={false}
              style={styles.axisTime}
              tickValues={tickValues}
              tickFormat={(x)=>x.toPrecision(1)}
            />

            <VictoryAxis dependentAxis
               domain={[0,4]}
               orientation="left"
               standalone={false}
               style={styles.leftVerticalAxis}
               offsetX={50}
            />
            {/* This will be the first data line */}
            <VictoryLine
              labelComponent={<VictoryTooltip/>}
              data={dataSet1}
              domain={{
                x:[0,5],
                y:[0,4]
              }}
              interpolation="monotoneX"
              style={styles.lineOne}
            />
            <VictoryLine
              data={dataSet2}
              domain={{
                x:[0,5],
                y:[0,4]
              }}
              interpolation="monotoneX"
              style={styles.lineTwo}
            />
            <VictoryLine
              data={dataSet3}
              domain={{
                x:[0,5],
                y:[0,4]
              }}
              interpolation="monotoneX"
              style={styles.lineThree}
            />
            <VictoryLine
              data={dataSet4}
              domain={{
                x:[0,5],
                y:[0,4]
              }}
              interpolation="monotoneX"
              style={styles.lineFour}
            />
          </g>
        </svg>

        <svg
          width={400} height={300}
          style={styles.parent}
          viewBox="0 0 400 325">

          <VictoryLabel x={175} y={25}        style={styles.title}
          text="Network" />

          <VictoryLabel x={150} y={317}        style={styles.title}
          text="Time in Seconds" />

          <VictoryLabel x={25} y={45}        style={styles.title}
          text={"network \n metric"} />

          <g transform={"translate(-10,30)"}>
            <VictoryAxis
              standalone={false}
              style={styles.axisTime}
              tickValues={tickValues}
              tickFormat={(x)=>x.toPrecision(1)}
            />
            {/* this axis must be dependentAxis */}
            <VictoryAxis dependentAxis
               domain={[0,4]}
               orientation="left"
               standalone={false}
               style={styles.leftVerticalAxis}
               offsetX={50}
            />
            {/* This will be the first data line */}
            <VictoryLine
              data={dataSet1}
              domain={{
                x:[0,5],
                y:[0,4]
              }}
              interpolation="bundle"
              style={styles.lineOne}
            />
            <VictoryAxis dependentAxis
              domain={[0,200]}
              orientation="right"
              standalone={false}
              style={styles.rightAxis}
              offsetX={70}
            />
            <VictoryLine
              data={dataSet2}
              domain={{
                x:[0,5],
                y:[0,4]
              }}
              interpolation="monotoneX"
              style={styles.lineTwo}
            />
          </g>
        </svg>

        <svg
          width={400} height={300}
          style={styles.parent}
          viewBox="0 0 400 325">

          <VictoryLabel x={175} y={25}        style={styles.title}
          text="CPU" />

          <VictoryLabel x={150} y={317}        style={styles.title}
          text="Time in Seconds" />

          <VictoryLabel x={25} y={45}        style={styles.title}
          text={"% of \n CPU"} />

          <g transform={"translate(-10,30)"}>
            <VictoryAxis
              standalone={false}
              style={styles.axisTime}
              tickValues={tickValues}
              tickFormat={(x)=>x.toPrecision(1)}
            />
            <VictoryAxis dependentAxis
               domain={[0,4]}
               orientation="left"
               standalone={false}
               style={styles.leftVerticalAxis}
               offsetX={50}
            />
            <VictoryLine
              data={dataSet1}
              domain={{
                x:[0,5],
                y:[0,4]
              }}
              interpolation="cardinal"
              style={styles.lineOne}
            />

            <VictoryLine
              data={dataSet2}
              domain={{
                x:[0,5],
                y:[0,4]
              }}
              interpolation="monotoneX"
              style={styles.lineTwo}
            />
          </g>
        </svg>

        <svg
          width={400} height={300}
          style={styles.parent}
          viewBox="0 0 400 325">

          <VictoryLabel x={175} y={25}        style={styles.title}
          text="Battery" />

          <VictoryLabel x={150} y={317}        style={styles.title}
          text="Time in Seconds" />

          <VictoryLabel x={25} y={45}        style={styles.title}
          text={"% of \n Battery Remaining"} />

          <g transform={"translate(-10,30)"}>
            <VictoryAxis
              standalone={false}
              style={styles.axisTime}
              tickValues={tickValues}
              tickFormat={(x)=>x.toPrecision(1)}
            />
            <VictoryAxis dependentAxis
               domain={[0,4]}
               orientation="left"
               standalone={false}
               style={styles.leftVerticalAxis}
               offsetX={50}
            />

            <VictoryBar
              labelComponent={<VictoryTooltip/>}
              data={dataSetTOOLTIP}
              domain={{
                x:[0,5],
                y:[0,4]
              }}
              interpolation="natural"
              style={styles.lineOne}
            />

            <VictoryBar
              labelComponent={<VictoryTooltip/>}
              data={dataSetTOOLTIP2}
              domain={{
                x:[0,5],
                y:[0,4]
              }}
              interpolation="monotoneX"
              style={styles.lineTwo}
            />
          </g>
        </svg>

      </Scrollbars>
      </div>
    );
  }

  getDataSet1() {
    return [
      {x:0, y:0, label:0},
      {x:1, y:1, label:1},
      {x:2, y:2, label:2},
      {x:3, y:2, label:2},
      {x:4, y:3, label:3},
      {x:5, y:4, label:4},
    ]
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
      {x:0.5, y:0},
      {x:1.5, y:1},
      {x:2.5, y:2},
      {x:3.5, y:2},
      {x:4.5, y:3},
    ]
  }

  getDataSet2() {
    return [
      {x:0, y:4},
      {x:1, y:4},
      {x:2, y:1},
      {x:3, y:0},
      {x:4, y:1},
      {x:5, y:2},
    ]
  }

  getDataSet3() {
    return [
      {x:0, y:1},
      {x:1, y:3},
      {x:2, y:0},
      {x:3, y:4},
      {x:4, y:2},
      {x:5, y:2},
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

  getTickValues() {
    return [0,1,2,3,4,5];
  }

  getStyles() {
    //define constants here?
    const BLUE_LINE = "rgb(30, 219, 231)";
    const PURPLE_LINE = "rgb(169, 32, 226)"
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

      rightAxis: {
        axis: {stroke: PURPLE_LINE, strokeWidth:3},
        ticks: {stroke: PURPLE_LINE, strokeWidth:3},
        tickLabels: {
          fill: PURPLE_LINE,
          fontFamily: "inherit",
          fontSize:15
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
        data: {stroke: 'rgb(176, 148, 27)', strokeWidth:3}
      },
      lineFour: {
        data: {stroke: 'rgb(43, 191, 31)', strokeWidth:3}
      }
    }
  }
}

export default Graph;