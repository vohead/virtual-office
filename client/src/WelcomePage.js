import React, { Component } from 'react';
import { Button, Grid, Typography, FormControl, InputLabel, Input, InputAdornment, IconButton } from 'material-ui';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { withStyles } from 'material-ui/styles';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './actions';

const styles = (theme) => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap'
	},
	margin: {
		margin: theme.spacing.unit
	},
	withoutLabel: {
		marginTop: theme.spacing.unit
	},
	textField: {
		width: '100%'
	},
	container: {
		width: '20%',
		margin: '0 auto',
		height: '100%'
	}
});

class WelcomePage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			username: null,
			password: null,
			showPassword: false
		};
	}

	login = () => {
		this.props.Login(this.state.username, this.state.password);
	};

	handleChange = (fieldName, e) => {
		this.setState({
			[fieldName]: e.target.value
		});
	};

	handleMouseDownPassword = (e) => {
		e.preventDefault();
	};

	handleClickShowPassword = () => {
		this.setState({ showPassword: !this.state.showPassword });
	};

	render() {
		const { classes } = this.props;

		if (this.props.auth) {
			return <Redirect to="/mails" />;
		}
		return (
			<Grid container alignItems="stretch" justify="center" direction="column" className={classes.container}>
				<Grid item>
					<Typography variant="display3">Virtual Office</Typography>
				</Grid>
				<Grid item>
					<FormControl className={classes.textField}>
						<InputLabel htmlFor="username">Username</InputLabel>
						<Input
							id="username"
							value={this.state.username}
							onChange={(e) => this.handleChange('username', e)}
							inputProps={{
								'aria-label': 'username'
							}}
						/>
					</FormControl>
				</Grid>
				<Grid item style={{marginTop: '.5rem'}}>
					<FormControl className={classes.textField}>
						<InputLabel htmlFor="password">Password</InputLabel>
						<Input
							id="password"
							type={this.state.showPassword ? 'text' : 'password'}
							value={this.state.password}
							onChange={(e) => this.handleChange('password', e)}
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										aria-label="Toggle password visibility"
										onClick={this.handleClickShowPassword}
										onMouseDown={this.handleMouseDownPassword}
									>
										{this.state.showPassword ? <VisibilityOff /> : <Visibility />}
									</IconButton>
								</InputAdornment>
							}
						/>
					</FormControl>
				</Grid>
				<Grid item align="center" style={{marginTop: '1rem'}}>
					<Button variant="raised" color="primary" onClick={this.login}>
						Login
					</Button>
				</Grid>
				<Grid item>
				</Grid>
			</Grid>
		);
	}
}

const mapStateToProps = ({ auth }) => ({
	auth
});

export default connect(mapStateToProps, actions)(withStyles(styles)(WelcomePage));
