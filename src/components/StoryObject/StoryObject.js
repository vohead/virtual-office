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
      start: 0,
      end: 0,
      Mails: [],
      dependecies: {},
      showAdd: true
    }
  }

  editStory = (story) => {
    this.setState({
      showAdd: false,
      title: story.title
    });

  }

  renderStoryListe = () => {
    return this.props.storyObjects.map((story, key) => {
      return <p key={key} onClick={() => this.editStory(story)}>{story.title}</p>
    });
  }

  renderMailListe = () => {
    return this.props.emailObjects.map((email, key) => {
      return <p key={key}>{email.title}</p>
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
      if (story.id === this.state.id) {
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

    return (
      <div className="container">
        <div className="content">
          <form onSubmit={this.handleSubmit}>
            <input type="text" name="title" value={this.state.title} onChange={(e) => this.handleChange("title", e)} />
            <textarea name="text" cols="60" rows="5" value={this.state.text} onChange={(e) => this.handleChange("text", e)} />
            <input type="text" name="author" value={this.state.author} onChange={(e) => this.handleChange("author", e)} />
            {this.state.showAdd && <button type="submit">Add Story</button>}
            {!this.state.showAdd && <button type="text" onClick={this.saveChanges}>Save</button>}
            <Link to="/">Zu den Mails</Link>
          </form>
        </div>
        <div className="liste">{this.renderStoryListe()}</div>
        <div className="liste">{this.renderMailListe()}</div>
      </div>
    )
  }
}

const mapStateToProps = ({ emailObjects, storyObjects }) => ({
  emailObjects, storyObjects
})



export default connect(mapStateToProps, actions)(StoryObject)