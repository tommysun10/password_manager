import React from 'react';
import '../Style/style.css'

export default class WebsiteRow extends React.Component {
  delete = () => {
    this.props.delete(this.props.website);
  }

  setActive = () => {
    return this.props.setActive(this.props.website);
  }

  render() {
    return (
      <div className={this.props.isActive(this.props.website)}
        onClick={this.setActive}>
        {this.props.website[0]}
        <button onClick={this.delete} className="btn btn-link del-btn">
          <span aria-hidden="true">&#215;</span>
        </button>
      </div>
    )
  }
}