import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import * as actions from '../../actions';
import MuiShowcase from '../../MuiShowcase';
import {
	List,
	ListItem,
	ListItemText,
	Checkbox,
	Grid,
	TextField,
	Card,
	CardActions,
	CardContent,
	Typography,
	Button,
	Drawer
} from 'material-ui';
import { withStyles } from 'material-ui/styles';

const styles = (theme) => ({
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: '100%'
	},
	textArea: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: '95%'
	},
	container: {
		width: '70%'
	},
	card: {
		width: '20%',
		marginTop: '15px',
		marginRight: '15px'
	},
	button: {
		margin: theme.spacing.unit
	},
	list: {
		width: '100%'
	},
	paper: {
		width: '35%'
	}
});

class StoryObject extends Component {
	constructor(props) {
		super(props);

		this.state = {
			id: 1,
			right: false,
			text: '',
			title: '',
			author: '',
			Mails: [],
			mailDependencies: [],
			saveSuccess: false,
			saveMessage: 'Save successful'
		};
	}

	handleChange = (name, e) => {
		this.setState({
			[name]: e.target.value
		});
	};

	activateStory = (story) => {
		this.props.SetActiveStory(story);
		this.setState({
			title: story.title,
			author: story.author,
			text: story.text,
			Mails: story.Mails,
			saveSuccess: false
		});
	};

	renderStoryList = () => {
		// eslint-disable-next-line
		return this.props.storyArray.map((story, key) => {
			if (story !== undefined) {
				return (
					<ListItem key={key} button onClick={() => this.activateStory(story)}>
						<ListItemText primary={story.title} />
					</ListItem>
				);
			}
		});
	};

	toggleMailDrawer = () => {
		this.setState({
			right: this.state.right ? false : true
		});
	};

	addEmailToComponentState = (email) => {
		this.setState({ Mails: [ ...this.state.Mails, email ] });
	};

	activateMailAndSetDependencies = (email) => {
		this.props.SetActiveMail(email);
		this.setState({
			mailDependencies: email.dependencies
		});
	};

	renderAvailableMails = () => {
		return this.props.emailObjects.map((email, key) => {
			return (
				<ListItem key={key} button onClick={() => this.activateMailAndSetDependencies(email)}>
					<ListItemText primary={email.title} />
				</ListItem>
			);
		});
	};

	renderStoryMails = () => {
		const { classes } = this.props;
		const { Mails } = this.state;

		if (Mails) {
			return Mails.map((mail, key) => {
				return (
					<Card className={classes.card} key={key}>
						<CardContent>
							<Typography align="right" variant="display2">
								{mail.title}
							</Typography>
							<Typography component="p">
								Author:<br />
								{mail.author}
							</Typography>
						</CardContent>
						<CardActions>
							<Button size="small">Learn More</Button>
						</CardActions>
					</Card>
				);
			});
		}
	};

	toggleDependencyCheckbox = (id) => {
		const { mailDependencies } = this.state;
		const currentIndex = mailDependencies.indexOf(id);
		const newMailDependencies = [ ...mailDependencies ];

		if (currentIndex === -1) {
			newMailDependencies.push(id);
		} else {
			newMailDependencies.splice(currentIndex, 1);
		}

		this.setState({
			mailDependencies: newMailDependencies
		});
	};

	renderActiveMailDetails = () => {
		const { activeMail } = this.props;
		const { Mails, mailDependencies } = this.state;

		activeMail.dependencies = mailDependencies;

		if (activeMail.title) {
			return (
				<div>
					<p>{activeMail.title}</p>
					<button onClick={() => this.addEmailToComponentState(activeMail)}>Add to story</button>

					<List style={{ width: '100%' }}>
						{// eslint-disable-next-line
						Mails.map((mail, key) => {
							if (mail.id !== activeMail.id) {
								return (
									<ListItem
										key={key}
										role={undefined}
										dense
										button
										onClick={() => this.toggleDependencyCheckbox(mail.id)}
									>
										<Checkbox
											checked={this.state.mailDependencies.indexOf(mail.id) !== -1}
											tabIndex={-1}
											disableRipple
										/>
										<ListItemText primary={mail.status} />
									</ListItem>
								);
							}
						})}
					</List>
				</div>
			);
		}
	};

	addStory = () => {
		const { id, title, text, author, Mails } = this.state;
		const story = {
			id,
			title,
			author,
			text,
			Mails
		};
		this.props.AddStoryObject(story);
		this.props.SetActiveStory({});
		this.setState({
			id: id + 1,
			text: '',
			title: '',
			author: '',
			Mails: [],
			saveSuccess: true
		});
	};

	clearComponentStateAndForm = () => {
		this.setState({
			title: '',
			author: '',
			text: '',
			Mails: [],
			saveSuccess: false
		});

		this.props.SetActiveStory({});
	};

	findActiveStoryAndUpdateValues = (array, compareObject) => {
		const { title, text, author, Mails } = this.state;
		const newStoryObject = {
			id: compareObject.id,
			title,
			author,
			text,
			Mails
		};

		return array.map((element) => {
			if (element.id === compareObject.id) {
				return { ...newStoryObject };
			}
			return element;
		});
	};

	updateActiveStoryAndReplaceItInStoryArray = (activeStory) => {
		const { storyArray } = this.props;
		const newArray = this.findActiveStoryAndUpdateValues(storyArray, activeStory);
		this.props.SetStoryObjects(newArray);
		this.setState({
			saveMessage: 'Changes applied',
			saveSuccess: true
		});
	};

	evaluateActiveStoryObjectToRenderCorrectButton = () => {
		const { classes, activeStory } = this.props;
		if (activeStory.title) {
			return (
				<Button variant="raised" onClick={() => this.updateActiveStoryAndReplaceItInStoryArray(activeStory)}>
					Save Changes
				</Button>
			);
		}
		return (
			<Button variant="raised" color="secondary" onClick={this.addStory} className={classes.button}>
				Save Story
			</Button>
		);
	};

	deleteActiveStory = () => {
		this.props.DeleteStoryObject(this.props.activeStory);
		this.clearComponentStateAndForm();
		this.setState({ saveSuccess: true, saveMessage: 'successfully deleted' });
	};

	evaluateSaveSuccessFromState = () => {
		const { classes, activeStory } = this.props;

		if (!this.state.saveSuccess) {
			return (
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
							required
							id="required"
							label="Author"
							value={this.state.author}
							onChange={(e) => this.handleChange('author', e)}
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
					<Grid item sm={6}>
						<Button
							onClick={this.toggleMailDrawer}
							variant="raised"
							color="primary"
							aria-label="add"
							className={classes.button}
						>
							Add Mail
						</Button>
						{this.evaluateActiveStoryObjectToRenderCorrectButton()}
					</Grid>
					<Grid item sm={6}>
						<Grid container justify="flex-end">
							{activeStory.title && (
								<Button
									variant="raised"
									className={classes.button}
									onClick={this.clearComponentStateAndForm}
								>
									Cancel Editing
								</Button>
							)}
							<Button
								variant="raised"
								color="secondary"
								className={classes.button}
								onClick={this.deleteActiveStory}
							>
								Delete Story
							</Button>
						</Grid>
					</Grid>
					<Grid item sm={12}>
						<Grid container spacing={8}>
							{this.renderStoryMails()}
						</Grid>
					</Grid>
				</Grid>
			);
		}
		return (
			<Grid container>
				<Grid item sm={12} lg={6}>
					<Typography variant="headline" component="h2">
						{this.state.saveMessage}
					</Typography>
					<Button
						variant="raised"
						color="primary"
						onClick={this.clearComponentStateAndForm}
						className={classes.button}
					>
						Add more Stories
					</Button>
				</Grid>
			</Grid>
		);
	};

	render() {
		const { classes } = this.props;
		console.log(this.props);
		return (
			<MuiShowcase heading="Compose a story..." list={this.renderStoryList()}>
				{this.evaluateSaveSuccessFromState()}
				<Drawer
					anchor="right"
					open={this.state.right}
					classes={{ paper: classes.paper }}
					onClose={this.toggleMailDrawer}
				>
					<Grid
						container
						direction="column"
						wrap="nowrap"
						justify="space-between"
						spacing={40}
						alignContent="stretch"
					>
						<Grid item sm={12}>
							<div tabIndex={0} role="button" className={classes.list}>
								<List component="nav">{this.renderAvailableMails()}</List>
							</div>
						</Grid>
						<Grid item sm={12}>
							{this.renderActiveMailDetails()}
						</Grid>
					</Grid>
				</Drawer>
			</MuiShowcase>
		);
	}
}

const mapStateToProps = ({ emailObjects, storyArray, activeMail, activeStory }) => ({
	emailObjects,
	storyArray,
	activeMail,
	activeStory
});

export default connect(mapStateToProps, actions)(withStyles(styles)(StoryObject));
