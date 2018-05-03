import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
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
	Drawer,
	MenuItem,
	MenuList,
	ListSubheader,
	Divider,
	Paper
} from 'material-ui';
import { Delete, FileUpload, Send, NotInterested, Save } from '@material-ui/icons';
import { withStyles } from 'material-ui/styles';
import { blueGrey } from 'material-ui/colors';

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
		width: '35%',
		padding: '1rem'
	},
	rightIcon: {
		marginLeft: theme.spacing.unit
	},
	menuItem: {
		background: blueGrey[200],
		borderRadius: '.2rem',
		marginBottom: '0.3rem',

		'&:focus': {
			backgroundColor: theme.palette.primary.main
		}
	},
	menuList: {
		padding: '1rem'
	},
	activeMailDetails: {
		padding: '1rem'
	}
});

class StoryObject extends Component {
	constructor(props) {
		super(props);

		this.state = {
			right: false,
			text: '',
			title: '',
			author: '',
			emails: [],
			dependencies: [ { email: '', emailDependencies: [] } ],
			activeMenuItem: null,
			checked: false
		};
	}

	componentDidMount = () => {
		this.props.FetchStories();
	};

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
			emails: story.emails,
			activeMenuItem: story.id,
			dependencies: story.dependencies
		});
	};

	renderStoryList = () => {
		const { classes } = this.props;
		// eslint-disable-next-line
		return this.props.storyArray.map((story, key) => {
			if (story !== undefined) {
				return (
					<MenuItem
						className={classes.menuItem}
						selected={this.state.activeMenuItem === story.id}
						key={key}
						onClick={() => this.activateStory(story)}
					>
						<ListItemText primary={story.title} />
					</MenuItem>
				);
			}
		});
	};

	toggleMailDrawer = () => {
		this.setState({
			right: this.state.right ? false : true
		});
		this.props.SetActiveMail({});
	};

	addEmailToComponentState = () => {
		const { activeMail } = this.props;
		this.setState(
			{
				emails: [ ...this.state.emails, activeMail._id ]
			},
			this.updateStory
		);
	};

	renderAvailableMails = () => {
		const { classes, emailObjects } = this.props;
		if (emailObjects.length > 0) {
			return emailObjects.map((email, key) => {
				return (
					<MenuItem
						className={classes.menuItem}
						selected={this.state.activeMenuItem === email.id}
						key={key}
						onClick={() => this.props.SetActiveMail(email)}
					>
						<ListItemText primary={email.title} />
					</MenuItem>
				);
			});
		}
		return <p>go add some mails</p>;
	};

	showMailDetails = (mail) => {
		this.props.SetActiveMail(mail);
		this.setState({ right: true });
	};

	removeFromStateAndUpdateStory = (mail) => {
		const emails = [ ...this.state.emails ];
		let emailsWithoutMail = [];
		// eslint-disable-next-line
		emails.map((email) => {
			if (email !== mail._id) {
				emailsWithoutMail.push(email);
			}
		});
		this.setState({ emails: emailsWithoutMail }, this.updateStory);
	};

	renderStoryMails = () => {
		const { classes, emailObjects } = this.props;
		const { emails } = this.state;
		let storyMails = [];

		// eslint-disable-next-line
		emailObjects.map((email) => {
			if (emails.indexOf(email._id) !== -1) {
				storyMails.push(email);
			}
		});

		if (storyMails.length > 0) {
			return storyMails.map((mail, key) => {
				return (
					<Card className={classes.card} key={key}>
						<CardContent>
							<Typography variant="title" gutterBottom noWrap>
								{mail.title}
							</Typography>
							<Typography component="p" noWrap>
								<strong>Author: </strong>
								{mail.author}
							</Typography>
							<Typography component="p">
								<strong>Time to finish: </strong>
								{mail.timer}
							</Typography>
						</CardContent>
						<CardActions>
							<Grid container justify="space-between">
								<Button size="small" onClick={() => this.showMailDetails(mail)}>
									Details
								</Button>
								<Button
									color="secondary"
									size="small"
									onClick={() => this.removeFromStateAndUpdateStory(mail)}
								>
									remove
								</Button>
							</Grid>
						</CardActions>
					</Card>
				);
			});
		}
	};

	toggleDependencyCheckbox = (id) => {
		const { activeMail } = this.props;
		const { dependencies } = this.state;

		let emailDependencies = [ ...dependencies ];
		let freshDeps = [];

		if (emailDependencies.length > 0) {
			emailDependencies.map((dependency) => {
				if (dependency.email === activeMail._id) {
					freshDeps.push(dependency.emailDependencies.push(id));
				}
			});
		} else {
			freshDeps.push({ email: activeMail._id, emailDependencies: [ id ] });
		}

		console.log(freshDeps);

		this.setState({ dependencies: freshDeps });

		console.log(this.state);
	};

	checkIfDependencyOfSelectedMail = (activeId, toCompareId) => {
		let result = false;
		// eslint-disable-next-line
		let idDependencies = this.state.dependencies.reduce((deps, currentElement) => {
			if (activeId === currentElement.email) {
				deps = currentElement.emailDependencies;
				return deps;
			}
		}, []);

		if (idDependencies) {
			if (idDependencies.indexOf(toCompareId) !== -1) {
				result = true;
			}
		}
		return result;

		// TODO CHECK THIS FUNCTION
	};

	renderCheckboxes = (storyMails) => {
		const { activeMail } = this.props;
		if (storyMails.length > 0) {
			// eslint-disable-next-line
			return storyMails.map((mail, key) => {
				if (mail && mail._id !== activeMail._id) {
					return (
						<ListItem
							key={key}
							role={undefined}
							dense
							button
							onClick={() => this.toggleDependencyCheckbox(mail._id)}
						>
							<Checkbox
								checked={this.checkIfDependencyOfSelectedMail(activeMail._id, mail._id)}
								tabIndex={-1}
								disableRipple
							/>
							<ListItemText primary={mail.status}>{mail.title}</ListItemText>
						</ListItem>
					);
				}
			});
		}
	};

	renderActiveMailDetails = () => {
		const { activeMail, classes, emailObjects } = this.props;
		const { emails } = this.state;
		let storyMails = [];

		// eslint-disable-next-line
		emailObjects.map((email) => {
			if (emails.indexOf(email._id) !== -1) {
				storyMails.push(email);
			}
		});

		if (activeMail.title) {
			return (
				<Paper className={classes.activeMailDetails}>
					<Typography gutterBottom variant="headline" color="inherit" noWrap align="left">
						Details:
					</Typography>
					<Typography gutterBottom variant="title">
						{activeMail.title}
					</Typography>
					<Typography gutterBottom variant="subheading" style={{ marginBottom: '2rem' }}>
						{activeMail.text}
					</Typography>
					<Typography variant="headline">Dependencies:</Typography>
					<List style={{ width: '100%' }}>{this.renderCheckboxes(storyMails)}</List>
					<Typography gutterBottom variant="body2">
						Time to finish: {activeMail.timer}
					</Typography>
					<Typography gutterBottom variant="body2">
						Written by {activeMail.author}
					</Typography>
					<Button variant="raised" onClick={this.addEmailToComponentState}>
						Add to story
					</Button>
				</Paper>
			);
		}
	};

	addStory = () => {
		const { title, text, author, emails, dependencies } = this.state;

		const story = {
			title,
			author,
			text,
			emails,
			dependencies
		};

		if (title && author && text) {
			this.props.SaveStory(story);

			this.props.SetActiveStory({});

			this.setState({
				text: '',
				title: '',
				author: '',
				emails: [],
				checked: true,
				dependencies: []
			});
		} else {
			alert('set some values, bitch');
		}

		setTimeout(() => {
			this.setState({ checked: false });
		}, 2000);
	};

	clearComponentStateAndForm = () => {
		this.setState({
			title: '',
			author: '',
			text: '',
			emails: [],
			dependencies: []
		});

		this.props.SetActiveStory({});
	};

	updateStory = (reset) => {
		const { UpdateStory } = this.props;
		let { title, text, author, emails, dependencies } = this.state;
		let storyValues = {
			id: this.props.activeStory._id,
			title,
			text,
			author,
			emails,
			dependencies
		};

		UpdateStory(storyValues);
		if (reset) {
			this.props.SetActiveStory({});

			this.setState({
				text: '',
				title: '',
				author: '',
				emails: [],
				dependencies: []
			});
		}
	};

	evaluateActiveStoryObjectToRenderCorrectButton = () => {
		const { classes, activeStory } = this.props;
		if (activeStory.title) {
			return (
				<Button color="primary" variant="raised" onClick={() => this.updateStory()}>
					Update
					<FileUpload className={classes.rightIcon} />
				</Button>
			);
		}
		return (
			<Button variant="raised" color="primary" onClick={this.addStory} className={classes.button}>
				Save Story
				<Save className={classes.rightIcon} />
			</Button>
		);
	};

	deleteActiveStory = () => {
		this.props.DeleteStory(this.props.activeStory);
		this.clearComponentStateAndForm();
	};

	renderContent = () => {
		const { classes, activeStory } = this.props;

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
						<Send className={classes.rightIcon} />
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
								<NotInterested className={classes.rightIcon} />
							</Button>
						)}
						{this.state.title.length > 0 && (
							<Button
								variant="raised"
								color="secondary"
								className={classes.button}
								onClick={this.deleteActiveStory}
							>
								Delete Story
								<Delete className={classes.rightIcon} />
							</Button>
						)}
					</Grid>
				</Grid>
				<Grid item sm={12}>
					<Grid container spacing={8}>
						{this.renderStoryMails()}
					</Grid>
				</Grid>
			</Grid>
		);
	};

	render() {
		const { classes } = this.props;
		return (
			<MuiShowcase
				subheader="My Stories"
				checked={this.state.checked}
				heading="Compose a story..."
				list={this.renderStoryList()}
			>
				{this.renderContent()}
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
								<MenuList
									subheader={
										<Fragment>
											<ListSubheader>
												<Typography variant="headline" color="inherit" noWrap align="center">
													Mails
												</Typography>
											</ListSubheader>
											<Divider style={{ marginBottom: '1.5rem' }} />
										</Fragment>
									}
									className={classes.menuList}
								>
									{this.renderAvailableMails()}
								</MenuList>
							</div>
						</Grid>
						<Grid item sm={12}>
							<div className={classes.activeMailDetails}>{this.renderActiveMailDetails()}</div>
						</Grid>
					</Grid>
				</Drawer>
			</MuiShowcase>
		);
	}
}

const mapStateToProps = ({ emailObjects, storyArray, activeMail, activeStory, authInformation }) => ({
	emailObjects,
	storyArray,
	activeMail,
	activeStory,
	authInformation
});

export default connect(mapStateToProps, actions)(withStyles(styles)(StoryObject));
