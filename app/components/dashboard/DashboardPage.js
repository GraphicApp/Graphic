import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import Graph from '../common/Graph';
import InfoDisplay from '../common/InfoDisplay';
import InfoQuery from '../common/InfoQuery';
import * as infoActions from '../../actions/infoActions';
import * as dataActions from '../../actions/dataActions';
import toastr from 'toastr';



import TimeSelect from '../monitor/TimeSelect';
import Snapshot from '../common/Snapshot';


class Dashboard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      nums: [],
      rx_sec: [],
      tx_sec: [],
      //testing
      tx_sec2:[],
      temp: [],
      disk: [],
      battery: [],
      activeMemory: [],
      swapUsedMemory:[]
    }

    this.getAll = this.getAll.bind(this);
    this.getToday = this.getToday.bind(this);
    this.getLastThreeHours = this.getLastThreeHours.bind(this);
    this.getLastSevenDays = this.getLastSevenDays.bind(this);
    this.getThisMonth = this.getThisMonth.bind(this);

  }

  componentDidUpdate() {
    let modules = this.props.settings.modules;
    this.modulesLoaded = Object.keys(modules).filter(el => modules[el].status);
    console.log('ACTIVE MODULES:', this.modulesLoaded);
  }


  filterCPU() {

    let filtered = this.props.data.cpu.filter(function(el) {
      return el.value.avg >0
    })

    let reformattedArray = filtered.map(function(obj) {
      var rObj = {};
      rObj["avgVal"] = obj.value.avg;
      return rObj;
    })
    // console.log("reformattedArray in MV: ", reformattedArray)
    // console.log("reformatted Array value is: ", reformattedArray[0].avgVal)
    let nums = [];
    for (var i =0; i < reformattedArray.length; i++) {
      // console.log("reformattedArray value is: ", reformattedArray[i].avgVal)
      nums.push(reformattedArray[i].avgVal);
      // return nums;
    }
    this.setState({nums});
    // console.log("nums: ", nums)
    // console.log("State on MV page: ", this.state)
  }

  filterRX_sec() {
    let filtered = this.props.data.network.filter(function(el) {
      return el.value.rx_sec > -2
    })

    let reformRX = filtered.map(function(obj) {
      var rObj = {};
      rObj["rx_sec"] = obj.value.rx_sec;
      return rObj
    })

    let rx_sec = [];
    for(var i=0; i <reformRX.length; i++) {
      rx_sec.push(reformRX[i].rx_sec);
    }
    console.log('rx_sec is: ', rx_sec)
    this.setState({rx_sec})
  }

  filterTX_sec() {
    let filtered = this.props.data.network.filter(function(el) {
      return el.value.tx_sec > -2
    })

    let reformTX = filtered.map(function(obj) {
      var rObj = {};
      rObj["tx_sec"] = obj.value.tx_sec;
      return rObj
    })
    console.log('reform tx: ', reformTX)

    let reformAgainTX = filtered.map(function(obj, index) {
      var r2Obj = {};
      r2Obj["x"]= index+.5;
      r2Obj["y"]= obj.value.tx_sec;
      r2Obj["value"]=obj.value.tx_sec;
      return r2Obj
    })
    console.log("not sure if this will work: ", reformAgainTX)

    reformAgainTX.forEach(function(el) {

    })

    let tx_sec2 = reformAgainTX;
    let tx_sec = [];
    for(var i=0; i <reformTX.length; i++) {
      tx_sec.push(reformTX[i].tx_sec);
    }
    console.log('tx_sec is: ', tx_sec)
    this.setState({tx_sec2})
  }



  filterTemp() {

    let tempData = this.props.data.temperature;

    let reformTemp = tempData.map(function(obj) {
      var rObj = {};
      rObj["main"]=obj.value.main;
      return rObj;
    })
    // console.log('reformTemp: ', reformTemp)

    let temp=[];
    for (var i = 0; i < reformTemp.length; i ++) {
      temp.push(reformTemp[i].main)
    }
    // console.log('temp array is: ', temp)
    // var temp = Object.assign({}, tempA);
    console.log('temp is: ', temp)

    this.setState({temp})
  }

  filterActiveMemory() {

    let memData = this.props.data.memory;

    let reformActiveMemory = memData.map(function(obj, index) {
      var rObj = {};
      rObj["x"] = index;
      rObj["y"]= obj.value.active/1000000000;
      rObj["value"]=obj.value.active/1000000000;
      return rObj;
    })

    let activeMemory = reformActiveMemory

    this.setState({activeMemory})
    // console.log("activeMemory: ", activeMemory)
  }

  filterSwapUsedMemory() {

    let memData = this.props.data.memory;

    let reformActiveMemory = memData.map(function(obj, index) {
      var rObj = {};
      rObj["x"] = index;
      rObj["y"]= obj.value.swapused/1000000000;
      rObj["value"]=obj.value.swapused/1000000000;
      return rObj;
    })

    let swapUsedMemory = reformActiveMemory

    this.setState({swapUsedMemory})
    console.log("swapMemory: ", swapUsedMemory)
  }

  getAll() {
    let time = 'all';
    toastr.info('Getting', time, 'data from database...');
    this.modulesLoaded.forEach(el => {
      this.props.actions.loadData(el, time)
        .then(() => {
          toastr.success('Data received');
          this.filterCPU();
          this.filterTemp();
          this.filterRX_sec();
          this.filterTX_sec();
          this.filterActiveMemory();
          this.filterSwapUsedMemory();
          // console.log(this.props.data.cpu);
        })
        .catch(error => {
          toastr.error('Could not fetch data');
          console.error(error);
        });
    })
  }

  getToday() {
    let time = 'today';
    toastr.info('Getting', time, 'data from database...');
    this.modulesLoaded.forEach(el => {
      this.props.actions.loadData(el, time)
        .then(() => {
          toastr.success('Data received');
          this.filterCPU();
          this.filterTemp();
          this.filterRX_sec();
          this.filterTX_sec();
          this.filterActiveMemory();
          this.filterSwapUsedMemory();
          // console.log(this.props.data.cpu);
        })
        .catch(error => {
          toastr.error('Could not fetch data');
          console.error(error);
        });
    })
  }

  getLastThreeHours() {


    let time = 'lastThreeHours';
    toastr.info('Getting', time, 'data from database...');
    this.modulesLoaded.forEach(el => {
      this.props.actions.loadData(el, time)
        .then(() => {
          toastr.success('Data received');
          this.filterCPU();
          this.filterTemp();
          this.filterRX_sec();
          this.filterTX_sec();
          this.filterActiveMemory();
          this.filterSwapUsedMemory();
          console.log("LAST THREE HOURS DATA LOG: ", this.props.data);
        })
        .catch(error => {
          toastr.error('Could not fetch data');
          console.error(error);
        });
    })
  }

  getLastSevenDays() {
    let time = 'lastSevenDays';
    toastr.info('Getting', time, 'data from database...');
    this.modulesLoaded.forEach(el => {
      this.props.actions.loadData(el, time)
        .then(() => {
          toastr.success('Data received');
          this.filterCPU();
          this.filterTemp();
          this.filterRX_sec();
          this.filterTX_sec();
          this.filterActiveMemory();
          this.filterSwapUsedMemory();
          // console.log(this.props.data.cpu);
        })
        .catch(error => {
          toastr.error('Could not fetch data');
          console.error(error);
        });
    })
  }

  getThisMonth() {
    let time = 'thisMonth';
    toastr.info('Getting', time, 'data from database...');
    this.modulesLoaded.forEach(el => {
      this.props.actions.loadData(el, time)
        .then(() => {
          toastr.success('Data received');
          this.filterCPU();
          this.filterTemp();
          this.filterRX_sec();
          this.filterTX_sec();
          this.filterActiveMemory();
          this.filterSwapUsedMemory();
          // console.log(this.props.data.cpu);
        })
        .catch(error => {
          toastr.error('Could not fetch data');
          console.error(error);
        });
    })
  }


  render() {
    return(
      <section>
        {/* <InfoDisplay
          info={this.props.info}
          location={this.props.location.pathname}
          data={this.props.data}
        /> */}
        Jason's stuff here


        <TimeSelect
          onSelectAll={this.getAll}
          onSelectToday={this.getToday}
          onSelectLastThreeHours={this.getLastThreeHours}
          onSelectLastSevenDays={this.getLastSevenDays}
          onSelectThisMonth={this.getThisMonth}
        />
        <Snapshot
          data={this.props.data}
          nums={this.state.nums}
          // network={this.state.network}
          rx_sec={this.state.rx_sec}
          tx_sec={this.state.tx_sec2}
          temp={this.state.temp}
          disk={this.state.disk}
          battery={this.state.battery}
          activeMemory={this.state.activeMemory}
          swapMemory={this.state.swapUsedMemory}
         />
      </section>
    )
  }
}

Dashboard.propTypes = {
  settings: PropTypes.object.isRequired,
  info: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  return {
    info: state.info,
    data: state.data,
    settings: state.settings
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({...infoActions, ...dataActions}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
