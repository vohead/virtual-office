import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions';

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
				return <p>{index}</p>;
			});
		}
		return <p>Loading</p>;
	};

	render() {
		return this.startStory();
	}
}

const mapStateToProps = ({ activeStory }) => ({
	activeStory
});

export default connect(mapStateToProps, actions)(StoryTest);
