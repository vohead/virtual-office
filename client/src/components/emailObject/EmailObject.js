import React, { Component } from 'react';
import status from '../../status';
import * as actions from '../../actions';
import { connect } from 'react-redux';
import MuiShowcase from '../../MuiShowcase';
import { ListItemText, MenuItem, Grid, TextField, Button } from 'material-ui';
import { Delete, FileUpload, NotInterested, Save } from '@material-ui/icons';
import { withStyles } from 'material-ui/styles';
import { blueGrey } from 'material-ui/colors';

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
	},
	menuItem: {
		background: blueGrey[200],
		borderRadius: '.2rem',
		marginBottom: '0.3rem',

		'&:focus': {
			backgroundColor: theme.palette.primary.main
		}
	},
	rightIcon: {
		marginLeft: theme.spacing.unit
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
			activeMenuItem: null,
			checked: false
		};
	}

	componentDidMount = () => {
		this.props.FetchEmails();
		this.setState({
			status: status.IN_PROGRESS
		});
	};

	handleChange = (fieldName, e) => {
		this.setState({
			[fieldName]: e.target.value
		});
	};

	saveChanges = () => {
		const { title, text, author, timer } = this.state;

		const updateValues = {
			id: this.props.activeMail._id,
			title,
			text,
			author,
			timer
		};

		this.props.UpdateMail(updateValues);

		this.setState({
			showAdd: true,
			title: '',
			author: '',
			text: '',
			timer: 0
		});
	};

	handleSubmit = (e) => {
		const { title, text, author, timer } = this.state;

		const emailObject = {
			id: this.state.id,
			title,
			text,
			author,
			timer,
			status: status.NOT_STARTED
		};

		this.props.SaveMail(emailObject);
		this.setState({ checked: true });
		setTimeout(() => {
			this.setState({ checked: false });
		}, 2000);
	};

	activateMail = (email) => {
		const { title, text, author, timer } = email;
		this.props.SetActiveMail(email);

		this.setState({
			title,
			text,
			author,
			timer,
			showAdd: false,
			activeMenuItem: email.id
		});
	};

	renderListe = () => {
		const { classes } = this.props;
		return this.props.emailObjects.map((email, key) => {
			return (
				<MenuItem
					className={classes.menuItem}
					selected={this.state.activeMenuItem === email.id}
					key={key}
					onClick={() => this.activateMail(email)}
				>
					<ListItemText primary={email.title} />
				</MenuItem>
			);
		});
	};

	deleteActiveMail = () => {
		this.props.DeleteMail(this.props.activeMail);
	};

	clearComponentStateAndForm = () => {
		this.setState({
			title: '',
			author: '',
			text: '',
			showAdd: true,
			timer: 0
		});

		this.props.SetActiveMail({});
	};

	render() {
		const { classes, activeMail } = this.props;
		return (
			<MuiShowcase
				subheader="My Mails"
				checked={this.state.checked}
				heading="Define a Mail Object..."
				list={this.renderListe()}
			>
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
								<Save className={classes.rightIcon} />
							</Button>
						)}
						{!this.state.showAdd && (
							<Button
								className={classes.button}
								variant="raised"
								color="primary"
								onClick={this.saveChanges}
							>
								Save Changes
								<FileUpload className={classes.rightIcon} />
							</Button>
						)}
					</Grid>
					<Grid item sm={6}>
						<Grid container justify="flex-end">
							{activeMail.title && (
								<Button
									variant="raised"
									className={classes.button}
									onClick={this.clearComponentStateAndForm}
								>
									Cancel Editing
									<NotInterested className={classes.rightIcon} />
								</Button>
							)}
							{this.state.title.length > 1 && (
								<Button
									variant="raised"
									color="secondary"
									className={classes.button}
									onClick={this.deleteActiveMail}
								>
									Delete Mail
									<Delete className={classes.rightIcon} />
								</Button>
							)}
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
