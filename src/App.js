import React, { Component } from 'react'
import EmailObject from './components/emailObject/EmailObject'
import status from './status'
import * as actions from './actions'
import { connect } from 'react-redux'
import {Link} from "react-router-dom"

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: "",
      author: "",
      text: "",
      id: 1,
      timer: 0,
      showAdd: true
    }
  }

  addEmailObject = () => {
    const { title, text, author, timer } = this.state;
    const emailObject = {
      id: this.state.id,
      title, text, author, timer,
      status: status.NOT_STARTED
    };
    this.props.AddEmailObject(emailObject);
    this.setState({
      id: ++this.state.id
    })
  }

  renderEmailObject = (email, e) => {
    const { id, title, text, author, timer, status } = email;
    this.setState({ ...email, showAdd: false })
    return (<EmailObject
      id={id}
      title={title}
      text={text}
      author={author}
      timer={timer}
      status={status}
    />)
  }

  handleChange = (fieldName, e) => {
    switch (fieldName) {
      case "text":
        this.setState({
          text: e.target.value
        })
        break;
      case "title":
        this.setState({
          title: e.target.value
        })
        break;
      case "author":
        this.setState({
          author: e.target.value
        })
        break;
      case "timer":
        this.setState({
          timer: e.target.value
        })
        break;
    }
  }

  saveChanges = (e) => {
    e.preventDefault();
    const emails = [...this.props.emailObjects];
    emails.forEach(email => {
      if (email.id === this.state.id) {
        email.title = this.state.title
      }
    })
    this.props.SetEmailObjects(emails);
    this.setState({
      showAdd: true,
      title: "",
      author: "",
      text: "",
      timer: 0
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.addEmailObject()
  }

  renderListe = () => {
    return this.props.emailObjects.map((email, key) => {
      return <p key={key} onClick={(e) => this.renderEmailObject(email, e)}>{email.title}</p>
    });
  }

  render() {
    const type = "text";
    return (
      <div className="container">
        <div className="content">
          <form onSubmit={this.handleSubmit}>
            <input type="text" name="title" value={this.state.title} onChange={(e) => this.handleChange("title", e)} />
            <textarea name="text" cols="60" rows="5" value={this.state.text} onChange={(e) => this.handleChange("text", e)} />
            <input type="text" name="author" value={this.state.author} onChange={(e) => this.handleChange("author", e)} />
            <input type="number" name="timer" value={this.state.timer} onChange={(e) => this.handleChange("timer", e)} />
            {this.state.showAdd && <button type="submit">Add EmailObject</button>}
            {!this.state.showAdd && <button type="text" onClick={this.saveChanges}>Save</button>}
            <Link to="/story">Zu den Storys</Link>
          </form>
        </div>
        <div className="liste">{this.renderListe()}</div>
      </div>
    )
  }
}

const mapStateToProps = ({ emailObjects }) => ({
  emailObjects
})



export default connect(mapStateToProps, actions)(App)