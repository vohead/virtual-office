import React, { Component } from 'react';
import status from '../../status';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import MuiShowcase from '../../MuiShowcase';
import { ListItem, ListItemText, Divider } from 'material-ui';

class EmailObject extends Component {
	constructor(props) {
		super(props);

		this.state = {
			status: this.props.status,
			answer: '',
			title: '',
			author: '',
			text: '',
			id: 1,
			timer: 0,
			showAdd: true
		};
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
		});
	};

	stop = () => {
		this.setState({
			status: status.FINISHED
		});
	};

	addEmailObject = () => {
		const { title, text, author, timer } = this.state;
		const emailObject = {
			id: this.state.id,
			title,
			text,
			author,
			timer,
			status: status.NOT_STARTED
		};
		this.props.AddEmailObject(emailObject);
		this.setState({
			id: this.state.id + 1
		});
	};

	renderEmailObject = (email, e) => {
		const { id, title, text, author, timer } = email;
		this.setState({ ...email, showAdd: false });
		return [
			<ul>
				<li>{title}</li>
				<li>{id}</li>
				<li>{text}</li>
				<li>{author}</li>
				<li>{timer}</li>
				<li>{this.state.status}</li>
			</ul>,
			<form>
				<textarea name="" id="" cols="30" rows="10" />
				<button
					disabled={this.state.status === 'failed' || this.state.status === 'finished'}
					onClick={this.stop}
				>
					Stop
				</button>
			</form>
		];
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
			case 'timer':
				this.setState({
					timer: e.target.value
				});
				break;
			default:
				break;
		}
	};

	saveChanges = (e) => {
		e.preventDefault();
		const emails = [ ...this.props.emailObjects ];
		emails.forEach((email) => {
			if (email.id === this.state.id) {
				email.title = this.state.title;
			}
		});
		this.props.SetEmailObjects(emails);
		this.setState({
			showAdd: true,
			title: '',
			author: '',
			text: '',
			timer: 0
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		this.addEmailObject();
	};

	renderListe = () => {
		return this.props.emailObjects.map((email, key) => {
			return [
				<ListItem button key={key} onClick={(e) => this.renderEmailObject(email, e)}>
					<ListItemText primary={email.title} />
				</ListItem>,
				<Divider />
			];
		});
	};

	render() {
		return (
			<MuiShowcase list={this.renderListe()}>
				<div className="container">
					<div className="content">
						<form onSubmit={this.handleSubmit}>
							<input
								type="text"
								name="title"
								value={this.state.title}
								onChange={(e) => this.handleChange('title', e)}
							/>
							<textarea
								name="text"
								cols="60"
								rows="5"
								value={this.state.text}
								onChange={(e) => this.handleChange('text', e)}
							/>
							<input
								type="text"
								name="author"
								value={this.state.author}
								onChange={(e) => this.handleChange('author', e)}
							/>
							<input
								type="number"
								name="timer"
								value={this.state.timer}
								onChange={(e) => this.handleChange('timer', e)}
							/>
							{this.state.showAdd && <button type="submit">Add EmailObject</button>}
							{!this.state.showAdd && (
								<button type="text" onClick={this.saveChanges}>
									Save
								</button>
							)}
							<Link to="/story">Zu den Storys</Link>
						</form>
					</div>
				</div>
			</MuiShowcase>
		);
	}
}

const mapStateToProps = ({ emailObjects }) => ({
	emailObjects
});

export default connect(mapStateToProps, actions)(EmailObject);
