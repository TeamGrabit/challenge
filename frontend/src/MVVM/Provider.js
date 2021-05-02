import React from 'react';
import { UserContextProvider } from './Model';
import { ViewModel } from './ViewModel/ViewModel';
import Router from '../routes/index';
import { Layout } from '../components';

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
