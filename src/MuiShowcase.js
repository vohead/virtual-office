import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { Drawer, AppBar, Toolbar, List, Typography, Grid } from 'material-ui';
import { Link } from 'react-router-dom';

const drawerWidth = 240;

const styles = (theme) => ({
	root: {
		flexGrow: 1,
		height: '100%',
		zIndex: 1,
		overflow: 'hidden',
		position: 'relative',
		display: 'flex'
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1
	},
	drawerPaper: {
		position: 'relative',
		width: drawerWidth
	},
	content: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.default,
		padding: theme.spacing.unit * 3,
		minWidth: 0 // So the Typography noWrap works
	},
	toolbar: theme.mixins.toolbar
});

function MuiShowcase(props) {
	const { classes } = props;

	return (
		<div className={classes.root}>
			<AppBar position="absolute" className={classes.appBar}>
				<Toolbar>
					<Grid container>
						<Grid item sm="2">
							<Typography variant="title" color="inherit" noWrap>
								Clipped drawer
							</Typography>
						</Grid>
						<Grid item sm="9">
            <Grid container>
							<Typography variant="title">
								<Link to="/mails" className="link">
									Mails
								</Link>
							</Typography>
							<Typography variant="title">
								<Link to="/story" className="link">
									Stories
								</Link>
							</Typography>
            </Grid>
						</Grid>
					</Grid>
				</Toolbar>
			</AppBar>
			<Drawer
				variant="permanent"
				classes={{
					paper: classes.drawerPaper
				}}
			>
				<div className={classes.toolbar} />
				<List>{props.list} EXACTLY</List>
			</Drawer>
			<main className={classes.content}>
				<div className={classes.toolbar} />
				{props.children}
			</main>
		</div>
	);
}

MuiShowcase.propTypes = {
	classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MuiShowcase);
