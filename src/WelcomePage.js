import React, { Component } from 'react';
import { Button, Grid, Typography } from 'material-ui';
import { withStyles } from 'material-ui/styles';
import { Redirect } from 'react-router-dom';

const styles = (theme) => ({
	container: {
		margin: '0 auto',
		height: '100%'
	}
});

class WelcomePage extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       redirect: false
    }
  }
  
	redirectToMails = () => {
		this.setState({redirect: true})
	};

	render() {
    const { classes } = this.props;
    if(this.state.redirect){
      return <Redirect to="/mails" />;
    }
		return (
			<Grid container alignItems="center" justify="center" direction="column" className={classes.container}>
				<Grid item>
					<Typography variant="display3">Virtual Office</Typography>
				</Grid>
				<Grid item>
					<Button variant="raised" color="primary" onClick={this.redirectToMails}>
						Login
					</Button>
				</Grid>
			</Grid>
		);
	}
}

export default withStyles(styles)(WelcomePage);
