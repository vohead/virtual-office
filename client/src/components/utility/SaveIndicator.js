import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Icon from 'material-ui/Icon';
import { Zoom, Paper, Typography } from 'material-ui';

const styles = (theme) => ({
	root: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		paddingRight: '15px'
	},
	icon: {
		margin: theme.spacing.unit,
		color: 'green',
		fontSize: '2rem'
	}
});

function SaveIndicator(props) {
	const { classes, checked } = props;

	return (
		<Zoom in={checked} style={{ transitionDelay: checked ? 500 : 0 }}>
			<Paper elevation={4} className={classes.root}>
				<Icon className={classes.icon}>done</Icon>
				<Typography variant="title">Saved</Typography>
			</Paper>
		</Zoom>
	);
}

SaveIndicator.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SaveIndicator);
