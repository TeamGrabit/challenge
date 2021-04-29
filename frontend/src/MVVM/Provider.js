import React from 'react';
import { UserContextProvider } from './Model';
import Router from '../routes/index';
import { Layout } from '../components';
import { ViewModel } from './ViewModel/ViewModel';

function Provider() {
	return (
		<UserContextProvider>
			<ViewModel>
				<Layout>
					<Router />
				</Layout>
			</ViewModel>
		</UserContextProvider>
	);
}

export default Provider;
