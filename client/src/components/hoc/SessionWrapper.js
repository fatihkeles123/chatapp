import React from 'react';
import { Query } from 'react-apollo';

import { GET_ACTIVE_USER } from '../../queries';

const sessionWrapper = Component => props => (
	<Query query={GET_ACTIVE_USER}>
		{
			({ data, loading, refetch }) => {
				if (loading) return <div>Loading...</div>;
				console.log(data);
				return <Component {...props} refetch={refetch} />
			}
		}
	</Query>
);

export default sessionWrapper;

