import React from "react"
import ActivityRemoval from '../activityRemoval'
import Calendar from '../calendar'
import { Link } from 'react-router-dom'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'

class Activity extends React.Component {

  constructor(props) {
      super(props)
      this.state = {
        selectedActivity: "",
        selectedDuration: "",
        selectedDate: ""
      }
    }

    addEntry = (day) => {
      this.setState({
        selectedDate: day.toString()
      })
    }

    onClick = () => {
      this.props.onClick(this.state)
    }

    handleClick = (selectedDate, selectedActivity, selectedDuration) => {
      this.props.handleClick(selectedDate, selectedActivity, selectedDuration)
    }

    club = localStorage.getItem("Club id")

  render() {
    return (
      <div>
        <div className="navigation">
          <Link to="/"><i class="fas fa-arrow-left"></i> Change your club</Link>
          <br />
          <div className="vertical-navigation">
            <Link to="/stats">View stats page <i class="fas fa-arrow-right"></i></Link>
            <br />
            <Link to="/badges">View your badges <i class="fas fa-arrow-right"></i></Link>
          </div>
        </div>
        <h2>{this.club}</h2>
        <h1>Add a new activity</h1>
        <p>Activity</p>
        <select onChange={event => this.setState({selectedActivity: event.target.value})}>
          <option>Choose an activity</option>
          {this.props.activityList.map((activity) => {
            return (<option key={activity} value={activity}>{activity}</option>
            )
          })}
        </select>

        <p>Duration</p>
        <select onChange={event => this.setState({selectedDuration: event.target.value})}>
          <option>Choose a duration</option>
          {this.props.durationList.map((duration) => {
            return (<option key={duration} value={duration}>{duration} hours</option>
            )
          })}
        </select>

        <p>Date</p>
        <DayPickerInput onDayChange={day => this.addEntry(day)} />
        <button type="button" onClick={this.onClick}>Add</button>

        <Calendar calendarData={this.props.calendarData} />

        <ActivityRemoval
          activity={this.state.selectedActivity}
          duration={this.state.selectedDuration}
          date={this.state.selectedDate}
          handleClick={this.handleClick}
          data={this.props.data}
        />
      </div>
    )
  }
}

export default Activity
