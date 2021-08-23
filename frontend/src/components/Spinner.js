import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const Spinner = () => {
	return(
		<div className="Spinner">
			<CircularProgress
				className="circle"
				size={60}
			/>
		</div>
	);
};

export default Spinner;