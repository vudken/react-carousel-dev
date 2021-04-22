import React, { Component } from "react";
import Switch from "react-switch";
import PropTypes from "prop-types";

class SwitchInfiniteMode extends Component {
  constructor(props) {
    super(props);
    this.state = { checked: false };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked) {
    this.setState({ checked });
    this.props.handleClick();
  }

  render() {
    return (
      <label className="switch">
        <span>Infinite mode</span>
        <Switch onChange={this.handleChange} checked={this.state.checked} />
      </label>
    );
  }
}

SwitchInfiniteMode.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default SwitchInfiniteMode;
