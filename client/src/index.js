import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import { lightBlue } from 'material-ui/colors';
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
			main: lightBlue[600]
		},
		background: {
			paper: lightBlue[200]
		}
	}
});

ReactDOM.render(
	<Provider store={store}>
		<MuiThemeProvider >
			<Router>
				<Switch>
					<Route path="/story" component={StoryPage} />
					<Route path="/mui" component={MuiShowcase} />
					<Route path="/mails" component={MailPage} />
					<Route path="/" component={WelcomePage} />
				</Switch>
			</Router>
		</MuiThemeProvider>
	</Provider>,
	document.getElementById('root')
);
