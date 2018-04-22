import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../actions';
import MuiShowcase from '../../MuiShowcase';
import { ListItem, ListItemText, Divider } from 'material-ui';

class StoryObject extends Component {
	constructor(props) {
		super(props);

		this.state = {
			title: '',
			author: '',
			text: '',
			id: 1,
			activeId: 1,
			start: 0,
			end: 0,
			Mails: [],
			showAdd: true,
			showMails: false,
			showMailDetails: false,
			mailDetails: {},
			activeMail: {}
		};
	}

	showMails = () => {
		if (this.props.emailObjects.length > 0) {
			this.setState({
				showMails: true
			});
		}
	};

	showMailDetails = (email) => {
		this.setState({
			showMailDetails: true,
			mailDetails: { ...email },
			activeMail: email
		});
	};

	editStory = (story) => {
		this.setState({
			showAdd: false,
			showMailDetails: false,
			title: story.title,
			text: story.text,
			author: story.author,
			activeId: story.id,
			Mails: [ ...story.Mails ]
		});
	};

	addToMails = (id, dependencies) => {
		const stories = [ ...this.props.storyObjects ];

		stories.forEach((story) => {
			if (story.id === this.state.activeId) {
				story.Mails = [ ...this.state.Mails, { id, mail: this.state.activeMail, dependencies } ];
				this.props.SetStoryObjects(stories);
			}
			this.setState({
				Mails: [ ...story.Mails ]
			});
		});
	};

	renderMailDetails = () => {
		const { showMailDetails, mailDetails } = this.state;
		if (showMailDetails) {
			return (
				<div>
					<ul>
						<li>{mailDetails.title}</li>
						<li>{mailDetails.text}</li>
						<li>{mailDetails.author}</li>
						<li>
							<button onClick={() => this.addToMails(2, [ 1, 5 ])}>Add to Mails</button>
						</li>
						<li>5</li>
					</ul>
				</div>
			);
		}
	};

	renderStoryListe = () => {
		return this.props.storyObjects.map((story, key) => {
			return [
				<ListItem button key={key}>
					<ListItemText primary={story.title} onClick={() => this.editStory(story)} />
				</ListItem>,
				<Divider key={key + 'divider'} />
			];
		});
	};

	renderMailListe = () => {
		if (this.state.showMails) {
			return this.props.emailObjects.map((email, key) => {
				return (
					<p key={key} onClick={() => this.showMailDetails(email)}>
						{email.title}
					</p>
				);
			});
		}
	};

	handleChange = (fieldName, e) => {
		switch (fieldName) {
			case 'text':
				this.setState({
					text: e.target.value
				});
				break;
			case 'title':
				this.setState({
					title: e.target.value
				});
				break;
			case 'author':
				this.setState({
					author: e.target.value
				});
				break;
			default:
				break;
		}
	};

	addStoryObject = () => {
		const { title, text, author } = this.state;
		const storyObject = {
			id: this.state.id,
			title,
			text,
			author,
			Mails: []
		};
		this.props.AddStoryObject(storyObject);
		this.setState({
			id: this.state.id + 1
		});
	};

	saveChanges = () => {
		const stories = [ ...this.props.storyObjects ];

		stories.forEach((story) => {
			if (story.id === this.state.activeId) {
				story.title = this.state.title;
			}
		});
		// this.props.SetStoryObjects(stories);
		this.setState({
			title: '',
			author: '',
			text: '',
			start: 0,
			end: 0,
			Mails: [],
			dependecies: {},
			showAdd: true
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		this.addStoryObject();
	};

	renderStoryMails = () => {
		return this.state.Mails.map((mail, key) => {
			return <p key={key}>{mail.mail.title}</p>;
		});
	};

	render() {
		const { title, text, author, showAdd, showMails } = this.state;
		return (
			<MuiShowcase list={this.renderStoryListe()}>
				<div className="container">
					<div className="content">
						<form onSubmit={this.handleSubmit}>
							<input
								type="text"
								name="title"
								value={title}
								onChange={(e) => this.handleChange('title', e)}
							/>
							<textarea
								name="text"
								cols="60"
								rows="5"
								value={text}
								onChange={(e) => this.handleChange('text', e)}
							/>
							<input
								type="text"
								name="author"
								value={author}
								onChange={(e) => this.handleChange('author', e)}
							/>
							{showAdd && <button type="submit">Add Story</button>}
							{!showAdd && (
								<button type="button" onClick={this.saveChanges}>
									Save
								</button>
							)}
							<Link to="/mails">Zu den Mails</Link>
						</form>
					</div>
					{this.renderMailListe()}
					{this.renderMailDetails()}
					{!showMails && this.props.emailObjects.length > 0 ? (
						<button type="button" onClick={this.showMails}>
							Show Mails
						</button>
					) : (
						<div>Go add some mails</div>
					)}
					{this.renderStoryMails()}
				</div>
			</MuiShowcase>
		);
	}
}

const mapStateToProps = ({ emailObjects, storyObjects }) => ({
	emailObjects,
	storyObjects
});

export default connect(mapStateToProps, actions)(StoryObject);
