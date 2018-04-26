import React, { Component } from 'react';
import status from '../../status';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import MuiShowcase from '../../MuiShowcase';
import { ListItem, ListItemText, Grid, TextField, Button, Divider } from 'material-ui';
import { withStyles } from 'material-ui/styles';

const styles = (theme) => ({
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: '100%'
	},
	container: {
		width: '70%'
	},
	button: {
		margin: theme.spacing.unit
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
			id: 0,
			timer: 0,
			showAdd: true,
			dependencies: []
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

	handleChange = (fieldName, e) => {
		this.setState({
			[fieldName]: e.target.value
		});
	};

	saveChanges = () => {
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
		const { title, text, author, timer, dependencies } = this.state;

		const emailObject = {
			id: this.state.id,
			title,
			text,
			author,
			timer,
			status: status.NOT_STARTED,
			dependencies
		};
		this.props.AddEmailObject(emailObject);
		this.setState({
			id: this.state.id + 1
		});
	};

	activateMail = (email) => {
		this.props.SetActiveMail(email);

		this.setState({
			...email,
			showAdd: false
		});
	};

	renderListe = () => {
		return this.props.emailObjects.map((email, key) => {
			return [
				<ListItem button key={key} onClick={() => this.activateMail(email)}>
					<ListItemText primary={email.title} />
				</ListItem>,
				<Divider key={key + 'divider'} />
			];
		});
	};

	deleteActiveMail = () => {
		this.props.DeleteEmailObject(this.props.activeMail);
	};

	render() {
		const { classes } = this.props;
		console.log(this.props.activeMail);
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
					<Grid item sm={6}>
						{this.state.showAdd && (
							<Button
								className={classes.button}
								variant="raised"
								color="primary"
								onClick={this.handleSubmit}
							>
								Save Mail
							</Button>
						)}
						{!this.state.showAdd && (
							<Button
								className={classes.button}
								variant="raised"
								color="secondary"
								onClick={this.saveChanges}
							>
								Save Changes
							</Button>
						)}
					</Grid>
					<Grid item sm={6}>
						<Grid container justify="flex-end">
							<Button
								variant="raised"
								color="secondary"
								className={classes.button}
								onClick={this.deleteActiveMail}
							>
								Delete Mail
							</Button>
						</Grid>
					</Grid>
				</Grid>
			</MuiShowcase>
		);
	}
}

const mapStateToProps = ({ emailObjects, activeMail }) => ({
	emailObjects,
	activeMail
});

export default connect(mapStateToProps, actions)(withStyles(styles)(EmailObject));
