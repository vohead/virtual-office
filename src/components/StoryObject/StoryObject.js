import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import * as actions from '../../actions';
import MuiShowcase from '../../MuiShowcase';
import {
	List,
	ListItem,
	ListItemText,
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
		width: '90%'
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
	editButton: {
		marginTop: '15px',
		background: '#72cb00',
		'&:hover': {
			background: '#a8ff37'
		}
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
		return this.props.storyArray.map((story, key) => {
			return (
				<ListItem key={key} button onClick={() => this.activateStory(story)}>
					<ListItemText primary={story.title} />
				</ListItem>
			);
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

	renderAvailableMails = () => {
		return this.props.emailObjects.map((email, key) => {
			return (
				<ListItem key={key} button onClick={() => this.addEmailToComponentState(email)}>
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
							<Typography className={classes.title} color="textSecondary">
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

	renderActiveMailDetails = () => {
		const activeMail = this.props.activeMail;
		return <p>{activeMail.title}</p>;
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
				<Button
					onClick={() => this.updateActiveStoryAndReplaceItInStoryArray(activeStory)}
					className={classes.editButton}
				>
					Save Changes
				</Button>
			);
		}
		return (
			<Button color="secondary" onClick={this.addStory} className={classes.button}>
				Save Story
			</Button>
		);
	};

	evaluateSaveSuccessFromState = () => {
		const { classes } = this.props;
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
					<Grid item sm={12}>
						<Button
							onClick={this.toggleMailDrawer}
							variant="raised"
							color="primary"
							aria-label="add"
							className={classes.button}
						>
							Add Mail
						</Button>
					</Grid>
					<Grid item sm={12}>
						<Grid container spacing={8}>
							{this.renderStoryMails()}
						</Grid>
					</Grid>
					<Grid container justify="flex-end">
						<Grid item>{this.evaluateActiveStoryObjectToRenderCorrectButton()}</Grid>
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
