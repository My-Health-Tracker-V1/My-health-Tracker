import React, { Component } from "react";
import axios from "axios";

import TopBar from "../shared/TopBar";
import BottomNavbar from "../shared/BottomNavbar";

export default class AddSleep extends Component {
  state = {
    startDate:
      this.props.location.state?.day || new Date().toISOString().split("T")[0],
    startTime:
      this.props.location.state?.element.startTime ||
      new Date().toLocaleTimeString("en-US", { hour12: false }).substring(0, 5),
    duration: this.props.location.state?.element.duration,
    notes: this.props.location.state?.element.notes,
    id: this.props.location.state?.element._id,
    editing: this.props.location.state?.editing,
    errors: {},
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  };

  handleValidation = () => {
    let duration = this.state.duration;
    let errors = {};
    let formIsValid = true;

    if (!duration) {
      formIsValid = false;
      errors["duration"] = "Duration cannot be empty";
    }

    this.setState({ errors: errors });
    return formIsValid;
  };

  handleSubmit = (event) => {
    event?.preventDefault();

    if (this.handleValidation()) {
      const sleepEntry = this.state;

      axios
        .post(
          `/api/sleep/user/${this.props.user._id}/day/${this.state.startDate}`,
          sleepEntry
        )
        .then((res) => {
          this.props.history.push("/dashboard");
        })
        .catch((err) => console.log(err));
    }
  };

  handleDelete = (event) => {
    event?.preventDefault();

    const sleepToDeleteId = this.state.id;

    axios
      .delete(
        `/api/sleep/user/${this.props.user._id}/day/${this.state.startDate}`,
        { params: sleepToDeleteId }
      )
      .then((res) => {
        this.props.history.push("/dashboard");
      })
      .catch((err) => console.log(err));
  };

  handleEditing = (event) => {
    event?.preventDefault();

    if (this.handleValidation()) {
      const updatedSleep = this.state;

      axios
        .put(
          `/api/sleep/user/${this.props.user._id}/day/${this.state.startDate}`,
          { data: updatedSleep }
        )
        .then((res) => {
          this.props.history.push("/dashboard");
        })
        .catch((err) => console.log(err));
    }
  };

  render() {
    return (
      <div className="flex flex-column">
        <TopBar title="Sleep" icon="Sleep" />

        <div className="flex flex-column items-center">
          <form
            onSubmit={
              this.state.editing ? this.handleEditing : this.handleSubmit
            }
            className="flex flex-column items-center"
            action="POST"
          >
            <label htmlFor="start-date" className="f6 mt3">
              Date:
            </label>
            <input
              onChange={this.handleChange}
              value={this.state.startDate}
              type="date"
              id="start-date"
              name="startDate"
              className="mb2"
            />

            <label htmlFor="start-time" className="f6 mt3">
              Time:
            </label>
            <input
              onChange={this.handleChange}
              value={this.state.startTime}
              type="time"
              id="start-date"
              name="startTime"
              className="mb2"
            />

            <div className="f6 mt2">
              <label htmlFor="duration" className="f6 mt3">
                Duration:{" "}
              </label>
              <input
                onChange={this.handleChange}
                value={this.state.duration}
                type="number"
                min="0"
                max="24"
                id="duration"
                name="duration"
                className="mb2 w3"
              />
              <span> hrs</span>
            </div>
            <span style={{ color: "red" }}>
              {this.state.errors["duration"]}
            </span>

            <label htmlFor="notes" className="f6 mt3">
              Notes:
            </label>
            <input
              onChange={this.handleChange}
              value={this.state.notes}
              type="textarea"
              id="notes"
              name="notes"
              className="mb2"
            />

            <button
              type="submit"
              className="f6 w4 dim ph3 pv2 mt3 dib white bg-dark-blue br-pill b--dark-blue"
            >
              Save
            </button>
          </form>

          <button
            onClick={() => this.handleDelete()}
            className="f6 w4 dim ph3 pv2 mt3 dib white bg-dark-red br-pill b--dark-red"
          >
            Delete
          </button>

          <BottomNavbar />
        </div>
      </div>
    );
  }
}
