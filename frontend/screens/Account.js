import React from "react";
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { ActivityIndicator } from "react-native";

import AccountPage from "../components/AccountPage";
import navStyles from '../styles/navStyles';

class Account extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return{
      title: `Account`,
      ...navStyles,
    }
  }

  
  render() {
    const user = this.props.me;
    if (!user) return (
        <ActivityIndicator
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          size="large"
        />
    )
    return (
      <AccountPage user={user} {...this.props} />
    );
  }
}

const me = gql`
    query me {
        me {
            id
            email
            name
            imagePosts {
                id
                title
                image
            }
        }
    }
`;

export default graphql(me, {
    props: ({ data }) => ({ ...data })
})(Account);