import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../actions";

class StoryObject extends Component {

  constructor(props) {
    super(props)

    this.state = {
      title: "",
      author: "",
      text: "",
      id: 1,
      activeId: 1,
      start: 0,
      end: 0,
      Mails: [],
      dependecies: {},
      showAdd: true,
      showMails: false,
      showMailDetails: false,
      mailDetails: {}
    }
  }

  showMails = () => {
    this.setState({
      showMails: true
    })
  }

  showMailDetails = (email) => {
    this.setState({
      showMailDetails: true,
      mailDetails: { ...email }
    })
  }


  editStory = (story) => {
    this.setState({
      showAdd: false,
      title: story.title,
      text: story.text,
      author: story.author,
      activeId: story.id
    });

  }

  renderMailDetails = () => {
    const {showMails, mailDetails} = this.state
    if (showMails) {
      return ([
        <div className="liste">{this.renderMailListe()}</div>,
        <div>
          <ul>
            <li>{mailDetails.title}</li>
            <li>{mailDetails.text}</li>
            <li>{mailDetails.author}</li>
            <li>4</li>
            <li>5</li>
          </ul>
        </div>
      ]
      )
    }
  }

  renderStoryListe = () => {
    return this.props.storyObjects.map((story, key) => {
      return <p key={key} onClick={() => this.editStory(story)}>{story.title}</p>
    });
  }

  renderMailListe = () => {
    return this.props.emailObjects.map((email, key) => {
      return <p key={key} onClick={() => this.showMailDetails(email)}>{email.title}</p>
    });
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
    }
  }


  addStoryObject = () => {
    const { title, text, author } = this.state;
    const storyObject = {
      id: this.state.id,
      title, text, author
    };
    this.props.AddStoryObject(storyObject);
    this.setState({
      id: ++this.state.id
    })
  }

  saveChanges = () => {
    const stories = [...this.props.storyObjects];

    stories.forEach(story => {
      if (story.id === this.state.activeId) {
        story.title = this.state.title
      }
    })
    this.props.SetStoryObjects(stories);
    this.setState({
      title: "",
      author: "",
      text: "",
      start: 0,
      end: 0,
      Mails: [],
      dependecies: {},
      showAdd: true
    })
  }


  handleSubmit = (e) => {
    e.preventDefault();
    this.addStoryObject();
  }

  render() {
    const { title, text, author, showAdd, showMails, showMailDetails, mailDetails } = this.state
    return (
      <div className="container">
        <div className="content">
          <form onSubmit={this.handleSubmit}>
            <input type="text" name="title" value={title} onChange={(e) => this.handleChange("title", e)} />
            <textarea name="text" cols="60" rows="5" value={text} onChange={(e) => this.handleChange("text", e)} />
            <input type="text" name="author" value={author} onChange={(e) => this.handleChange("author", e)} />
            {showAdd && <button type="submit">Add Story</button>}
            {!showAdd && <button type="text" onClick={this.saveChanges}>Save</button>}
            <Link to="/">Zu den Mails</Link>
          </form>
        </div>
        <div className="liste">{this.renderStoryListe()}</div>
        {this.renderMailDetails()}
        {!showMails && <button type="button" onClick={this.showMails}>Show Mails</button>}

      </div>
    )
  }
}

const mapStateToProps = ({ emailObjects, storyObjects }) => ({
  emailObjects, storyObjects
})



export default connect(mapStateToProps, actions)(StoryObject)