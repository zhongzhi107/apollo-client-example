import React from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

function Bar({ user }) {
  return <span>{ user.id }: { user.name }</span>;
}

Bar.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string
  })
};

Bar.defaultProps = {
  user: {}
};


const query = gql`
  query getUser {
    user(id: 3) {
      id
      name
    }
  }
`;

export default graphql(query, {
  // options: {
  //   fetchPolicy: 'cache-and-network'
  // },
  props: ({ data: { user } }) => ({
    user
  })
})(Bar);
