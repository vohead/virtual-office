import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';
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

class StoryTest extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount = () => {
		this.props.FetchStory(this.props.match.params.id);
	};

	startStory = () => {
		const { emails } = this.props.activeStory;
		if (emails) {
			return emails.map((mail, index) => {
				return <Paper>{index}</Paper>;
			});
		}
		return <p>Loading</p>;
	};

	render() {
		return (
			<Grid container>
				{this.startStory()}
			</Grid>
		)
	}
}

const mapStateToProps = ({ activeStory }) => ({
	activeStory
});

export default connect(mapStateToProps, actions)(StoryTest);
