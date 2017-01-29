import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import * as dataActions from '../../actions/dataActions';
import Graph from '../common/Graph';
import TimeSelect from './TimeSelect';
import toastr from 'toastr';


class Monitor extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      nums: [],
      network: [],
      temp: [],
      disk: [],
      battery: []
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
  }

  componentWillMount() {
    let modules = this.props.settings.modules;
    this.modulesLoaded = Object.keys(modules).filter(el => modules[el].status);
    // this.getLastThreeHours();
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

  filterTemp() {
    let filtered1 = this.props.data.temperature.filter(function(el) {
      return el.value.cores[0] >0
    });
    let filtered2 = this.props.data.temperature.filter(function(el) {
      return el.value.cores[1] >0
    });
    // console.log("filtered1: ", filtered1)
    // console.log("filtered2: ", filtered2)

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

  getAll() {
    let time = 'all';
    toastr.info('Getting', time, 'data from database...');
    this.modulesLoaded.forEach(el => {
      this.props.actions.loadData(el, time)
        .then(() => {
          toastr.success('Data received');
          console.log(this.props.data.cpu);
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
          console.log(this.props.data.cpu);
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
          console.log(this.props.data.cpu);
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
          console.log(this.props.data.cpu);
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
        <h2>Monitor</h2>
        <TimeSelect
          onSelectAll={this.getAll}
          onSelectToday={this.getToday}
          onSelectLastThreeHours={this.getLastThreeHours}
          onSelectLastSevenDays={this.getLastSevenDays}
          onSelectThisMonth={this.getThisMonth}
        />
        <Graph
          data={this.props.data}
          nums={this.state.nums}
          network={this.state.network}
          temp={this.state.temp}
          disk={this.state.disk}
          battery={this.state.battery}
          />
      </section>
    )
  }
}

Monitor.propTypes = {
  settings: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    // nums: state.nums,
    data: state.data,
    settings: state.settings
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(dataActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Monitor);
