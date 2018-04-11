import React, { Component } from 'react'
import status from '../../status'

export default class EmailObject extends Component {

  constructor(props) {
    super(props)

    this.state = {
      status: this.props.status,
      answer: ""
    }
    // let { timer } = this.props;
  //   let interval = setInterval(() => {
  //     timer--;
  //     console.log(timer);
  //     if (this.state.status === status.FINISHED) {
  //       clearInterval(interval)
  //     }
  //     if (timer === 0) {
  //       // TODO: Implement logic to handle failure
  //       this.setState({
  //         status: status.FAILED
  //       })
  //       clearInterval(interval);
  //     }
  //   }, 1000)
   }


  componentDidMount = () => {
    this.setState({
      status: status.IN_PROGRESS
    })
  }


  stop = () => {
    this.setState({
      status: status.FINISHED
    })
  }

  render() {
    const { title, id, text, author, timer } = this.props;
    return (
      <div>
        <ul>
          <li>{title}</li>
          <li>{id}</li>
          <li>{text}</li>
          <li>{author}</li>
          <li>{timer}</li>
          <li>{this.state.status}</li>
        </ul>
        <form>
          <textarea name="" id="" cols="30" rows="10" />
        <button disabled={this.state.status === "failed" || this.state.status === "finished"} onClick={this.stop}>Stop</button>
        </form>
      </div>
    )
  }
}