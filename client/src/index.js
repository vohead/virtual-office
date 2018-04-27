import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import requireAuth from './components/hoc/requireAuth';
import { blueGrey } from 'material-ui/colors';
import 'typeface-roboto';
import 'normalize-css';
import './styles.css';

import reducers from './reducers';
import StoryPage from './StoryPage';
import MailPage from './MailPage';
import WelcomePage from './WelcomePage';
import MuiShowcase from './MuiShowcase';

const store = createStore(reducers);

const theme = createMuiTheme({
	palette: {
		primary: {
			main: blueGrey[500]
		},
		background: {
			paper: blueGrey[50]
		}
	}
});

ReactDOM.render(
	<Provider store={store}>
		<MuiThemeProvider theme={theme}>
			<Router>
				<Switch>
					<Route path="/story" component={requireAuth(StoryPage)} />
					<Route path="/mui" component={MuiShowcase} />
					<Route path="/mails" component={requireAuth(MailPage)} />
					<Route path="/" component={WelcomePage} />
				</Switch>
			</Router>
		</MuiThemeProvider>
	</Provider>,
	document.getElementById('root')
);
