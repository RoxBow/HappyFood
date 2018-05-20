import '../../styles/_filters.scss';
import React, { Component } from 'react';
import axios from 'axios';

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
      .then(response => {
        _this.setState({
          dietsLabel: response.data.dietLabels,
          healthLabels: response.data.healthLabels
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  renderListFilter(list, title, classList, classElement, toggleFilter) {
    return (
      <div>
        <h3>{title}</h3>
        <ul className={classList}>
          {list.map((element, i) => (
            <li className={classElement} key={i}>
              <input
                type="checkbox"
                name={classElement}
                value={element}
                id={element}
                onChange={e => toggleFilter(classElement, element, e.target.checked)}
              />
              <label htmlFor={element}>{element}</label>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  render() {
    const { toggleFilter } = this.props;
    const { dietsLabel, healthLabels } = this.state;

    return (
      <div className="filters">
        <h3>Filters</h3>
        {this.renderListFilter(dietsLabel, 'Diet', 'filterDiets', 'diet', toggleFilter)}
        {this.renderListFilter(healthLabels, 'Health', 'filterHealths', 'health', toggleFilter)}
      </div>
    );
  }
}

export default Filters;
