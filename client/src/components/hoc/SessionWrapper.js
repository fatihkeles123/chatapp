import React from 'react';
import { Query } from 'react-apollo';

import { GET_ACTIVE_USER } from '../../queries';

const sessionWrapper = Component => props => (
	<Query query={GET_ACTIVE_USER}>
		{
			({ data, loading, refetch }) => {
				if (loading) return <div>Loading...</div>;
				return <Component {...props} refetch={refetch} session={data} />
			}
		}
	</Query>
);

export default sessionWrapper;

