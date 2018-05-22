import '../../styles/_filters.scss';
import React, { Component } from 'react';
import axios from 'axios';
import Filter from './Filter';
class Filters extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dietsLabel: [],
      healthLabels: []
    };
  }

  componentDidMount() {
    const _this = this;

    axios
      .get('/fetchFilters')
      .then(res => {
        _this.setState({
          dietsLabel: res.data.dietLabels,
          healthLabels: res.data.healthLabels
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { toggleFilter } = this.props;
    const { dietsLabel, healthLabels, test } = this.state;

    return (
      <div className="filters">
        <h3>Filters</h3>
        <img src={test} />
        <Filter
          list={dietsLabel}
          title="Diet"
          classList="filterDiets"
          classElement="diet"
          toggleFilter={toggleFilter}
        />
        <Filter
          list={healthLabels}
          title="Health"
          classList="filterHealths"
          classElement="health"
          toggleFilter={toggleFilter}
        />
      </div>
    );
  }
}

export default Filters;
