import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';
import Bar from './Bar';

function Home({ loading, users }) {
  if (loading) {
    return <p>Loading...</p>;
  } else if (users) {
    return (
      <div>
        <ul>
          { users.nodes.map(item => (<li key={item.id}>{item.id}: {item.name}</li>)) }
        </ul>
        <Bar />
      </div>
    );
  }
  return <a href="/login/github">Log in with GitHub</a>;
}

Home.propTypes = {
  loading: PropTypes.bool,
  users: PropTypes.shape({
    nodes: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string
    }))
  })
};

Home.defaultProps = {
  loading: true,
  users: {
    nodes: []
  }
};


const query = gql`
  query GetUsers($first: Int) {
    users(first:$first) {
      nodes {
        id
        name
      }
    }
  }
`;

export default graphql(query, {
  options: {
    // fetchPolicy: 'cache-and-network',
    variables: {
      first: 10
    }
  },
  props: ({ data: { loading, users } }) => ({
    loading,
    users
  })
})(Home);
