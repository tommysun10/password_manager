import React from 'react';
import { Link } from 'react-router-dom';

export default class WebsiteRow extends React.Component {
  delete = () => {
    this.props.delete(this.props.website);
  }

  setActive = () => {
    this.props.setActive(this.props.website);
  }

  render() {
    return (
        <div className={this.props.isActive(this.props.website)}
          onClick={this.setActive}>
          {this.props.website[0]}
        <button onClick={this.delete} type="button" className="delete-btn">
          Delete
        </button>
      </div>
      )
    }
  }