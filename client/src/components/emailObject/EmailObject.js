import React, { Component } from 'react';
import status from '../../status';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import MuiShowcase from '../../MuiShowcase';
import {
	ListItem,
	ListItemText,
	Grid,
	TextField,
	Button,
	Divider
} from 'material-ui';
import { withStyles } from 'material-ui/styles';

const styles = (theme) => ({
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: '90%'
	},
	textArea: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: '95%'
	},
	container: {
		width: '70%'
	}
});

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
		this.setState({
			[fieldName]: e.target.value
		});
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
				<Divider key={key + "divider"} />
			];
		});
	};

	render() {
		const { classes } = this.props;
		return (
			<MuiShowcase heading="Define a Mail Object..." list={this.renderListe()}>
				<Grid container className={classes.container}>
					<Grid item sm={12}>
						<TextField
							required
							id="required"
							label="Title"
							value={this.state.title}
							onChange={(e) => this.handleChange('title', e)}
							className={classes.textField}
							margin="normal"
						/>
					</Grid>
					<Grid item sm={12}>
						<TextField
							label="Text"
							multiline
							rowsMax="4"
							value={this.state.text}
							onChange={(e) => this.handleChange('text', e)}
							className={classes.textField}
							margin="normal"
						/>
					</Grid>
					<Grid item sm={12}>
						<TextField
							label="Author"
							value={this.state.author}
							onChange={(e) => this.handleChange('author', e)}
							className={classes.textField}
							margin="normal"
						/>
					</Grid>
					<Grid item sm={12}>
						<TextField
							label="Time to finish"
							type="number"
							value={this.state.timer}
							onChange={(e) => this.handleChange('timer', e)}
							className={classes.textField}
							margin="normal"
						/>
					</Grid>
					{this.state.showAdd && <Button onClick={this.handleSubmit}>Add EmailObject</Button>}
					{!this.state.showAdd && <Button color="secondary" onClick={this.saveChanges}>Save</Button>}
				</Grid>
			</MuiShowcase>
		);
	}
}

const mapStateToProps = ({ emailObjects }) => ({
	emailObjects
});

export default connect(mapStateToProps, actions)(withStyles(styles)(EmailObject));