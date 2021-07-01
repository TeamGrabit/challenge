import React from 'react';
import Model from './Model/Model';
import ViewModel from './ViewModel/ViewModel';
import Router from '../routes/index';
import { Layout } from '../components';

function Provider() {
	return (
		<Model>
			<ViewModel>
				<Layout>
					<Router />
				</Layout>
			</ViewModel>
		</Model>
	);
}

export default Provider;