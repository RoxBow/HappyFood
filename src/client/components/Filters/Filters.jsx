import '../../styles/_filters.scss';
import React, { Component } from 'react';
import axios from 'axios';

class Filters extends Component {
  constructor(props) {
    super(props);

    this.state = {
      diets: [],
      allergies: []
    };
  }

  componentDidMount() {
    const _this = this;

    axios
      .get('/getFilters')
      .then(response => {
        _this.setState({
          diets: response.data.diets,
          allergies: response.data.allergies
        });
      })
      .catch(error => {
        console.log(error);
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
    const { diets, allergies } = this.state;

    return (
      <div className="filters">
        <h3>Filters</h3>
        {this.renderListFilter(diets, 'Filter Diets', 'filterDiets', 'diet', toggleFilter)}
        {this.renderListFilter(allergies, 'Filter Allergies', 'filterAllergie', 'allergie', toggleFilter)}
      </div>
    );
  }
}

export default Filters;
