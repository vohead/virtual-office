import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';
import { Button, Divider, ListSubheader, MenuList, Drawer, AppBar, Toolbar, Typography, Grid } from 'material-ui';
import { Link } from 'react-router-dom';
import * as actions from './actions';
import menuBackground from './pictures/office-menu-background.jpg';
import SaveIndicator from './components/utility/SaveIndicator';

const drawerWidth = 240;

const styles = (theme) => ({
	root: {
		flexGrow: 1,
		minHeight: '100%',
		zIndex: 1,
		overflow: 'hidden',
		position: 'relative',
		display: 'flex'
	},
	row: {
		display: 'flex',
		width: '70%'
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1
	},
	drawerPaper: {
		position: 'relative',
		height: '100%',
		width: drawerWidth,
		background: `linear-gradient(
		rgba(255,255,255,0.9),
		rgba(255,255,255,0.9)
	),
	url(${menuBackground})
	`
	},
	content: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.default,
		padding: theme.spacing.unit * 3,
		minWidth: 0 // So the Typography noWrap works
	},
	toolbar: theme.mixins.toolbar,
	menuList: {
		padding: '1rem'
	}
});

function MuiShowcase(props) {
	const { classes } = props;

	return (
		<div className={classes.root}>
			<AppBar position="absolute" className={classes.appBar}>
				<Toolbar>
					<Grid container>
						<Grid item sm={2}>
							<Typography variant="title" color="inherit" noWrap>
								<Link to="/" className="link">
									Virtual Office
								</Link>
							</Typography>
						</Grid>
						<Grid item sm={6}>
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
						<Grid item sm={3}>
							<Grid container justify="space-between">
								<Typography variant="title">Welcome {props.auth.username}</Typography>
								<Button variant="raised" onClick={props.Logout}>
									Logout
								</Button>
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
				<MenuList
					subheader={
						<Fragment>
							<ListSubheader>
								<Typography variant="headline" color="inherit" noWrap align="center">
									{props.subheader}
								</Typography>
							</ListSubheader>
							<Divider style={{ marginBottom: '1.5rem' }} />
						</Fragment>
					}
					className={classes.menuList}
				>
					{props.list}
				</MenuList>
			</Drawer>
			<main className={classes.content}>
				<div className={classes.toolbar} />
				<Grid container justify="space-between" className={classes.row}>
					<Typography variant="display2">{props.heading}</Typography>
					<SaveIndicator checked={props.checked} />
				</Grid>
				{props.children}
			</main>
		</div>
	);
}

MuiShowcase.propTypes = {
	classes: PropTypes.object.isRequired
};

const mapStateToProps = ({auth}) => ({
	auth
})

export default connect(mapStateToProps, actions)(withStyles(styles)(MuiShowcase));
