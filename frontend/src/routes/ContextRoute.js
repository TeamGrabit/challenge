import React from 'react';
import { Route } from "react-router-dom";

function ContextRoute(props) {
	console.log(props);
	const { Provider, Component } = props;
	return (
		<Route path={props.path} exact={props.exact}>
			<Provider>
				<Component match={props.computedMatch} />
			</Provider>
		</Route>
	);
}

export default ContextRoute;
