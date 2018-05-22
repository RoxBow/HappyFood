import '../../styles/_randomRecipe.scss';
import React, { Component } from 'react';
import axios from 'axios';
import base64ArrayBuffer from '../../helpers/base64ArrayBuffer';

class RandomRecipe extends Component {
  constructor() {
    super();
    this.state = {
      recipeHistory: []
    };
  }

  componentDidMount() {
    this.setRandom();
  }

  previous() {
    this.setState({
      recipeHistory: this.state.recipeHistory.slice(0, -1)
    });
  }

  setRandom() {
    var _this = this;
    const oldRecipeHistory = this.state.recipeHistory;

    axios
      .get('/api/getRandomRecipe', {
        params: {
          isNotApi: true
        }
      })
      .then(response => {
        if (this.state.recipeHistory.length >= 10) {
          this.setState({
            recipeHistory: this.state.recipeHistory.slice(1)
          });
          this.setState({
            recipeHistory: [...this.state.recipeHistory, response.data]
          });
        } else {
          this.setState({
            recipeHistory: [...this.state.recipeHistory, response.data]
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const array_len = this.state.recipeHistory.length;

    const theRandomRecipe = this.state.recipeHistory.map((randomRecipe, i) => {
      if (i == array_len - 1) {
        return (
          <div key={i} className="randomRecipe">
            <img
              src={base64ArrayBuffer(randomRecipe.image.data.data, randomRecipe.image.contentType)}
              alt={randomRecipe.label}
            />
            <p>{randomRecipe.label}</p>
          </div>
        );
      }
    });

    return (
      <div>
        <div className="container">
          <div onClick={() => { this.previous(); } } className="previous">
            Passé top vite ?
          </div>
          <div>{theRandomRecipe}</div>
          <div
            onClick={() => {
              this.setRandom();
            }}
            className="newRandom"
          >
            Random Recipe
          </div>
        </div>
        {/* <div>
          <button type="button" onClick={()=>{this.setRandom()}} className="random-button">
            Random Recipe
          </button>
        </div> */}
      </div>
    );
  }
}

export default RandomRecipe;
