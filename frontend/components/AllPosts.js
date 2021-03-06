import React, { Component } from 'react';
import { Text, View, ActivityIndicator, FlatList, Image, TouchableHighlight, Dimensions, RefreshControl } from 'react-native';
import { graphql } from 'react-apollo';
import { List, ListItem, Body, Right, Icon } from 'native-base';
import gql from 'graphql-tag';
import FullWidthImage from 'react-native-fullwidth-image';

import { endpoint } from '../config';
import styles from '../styles/postStyles';

const win = Dimensions.get('window');

class AllPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refresh: false,
    }
  }

  // handleRefresh = () => {
  //   this.setState({
  //     refresh: true,
  //   }, () => {
  //     this.props.allPosts({
  //       updateQuery:
  //     });
  //   })
  // }

  render() {
    const { navigation, allPosts } = this.props;
    if (!allPosts) return (
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
      <View style={{ flex: 1 }}>
        <FlatList
          contentContainerStyle={{ flexGrow: 1 }}
          data={allPosts}
          // extraData={allPosts}
          keyExtractor={item => item.id}
          // refreshing={this.state.refresh}
          // onRefresh={() => refetch()}
          renderItem={({ item }) => (
            <React.Fragment>
              <ListItem
                style={{ borderBottomWidth: 0 }}
              >
                <View style={styles.postContainer}>

                  <View style={styles.postTitleContainer}>
                    <Text style={styles.postTitleText}>{item.title}</Text>
                  </View>

                  <View>
                    <TouchableHighlight
                      onPress={() => navigation.navigate('Post', {
                        id: item.id,
                        user: item.user.name,
                      })}
                    >
                      <FullWidthImage
                        style={styles.postImages}
                        source={{ uri: `${endpoint}/${item.image}` }}
                      />
                    </TouchableHighlight>
                  </View>

                  <View style={styles.UserContainer}>
                    <View style={{ height: 25, width: 25, backgroundColor: 'black', borderRadius: 14, marginRight: 4 }}>
                      {item.user.image && (
                        <Image source={{ uri: `${endpoint}/${item.user.image}` }} />
                      )}
                    </View>
                    <View style={styles.User}>
                      <Text style={styles.UserText}>Posted by <Text style={styles.TextBold}>{item.user.name}</Text></Text>
                    </View>
                  </View>
                </View>
              </ListItem>
              <View style={styles.HR} />
            </React.Fragment>
          )}
        />
      </View>
    )
  }
}

const allPosts = gql`
  query allPosts {
    allPosts {
      id
      createdAt
      title
      caption
      image
      user {
        id
        name
      }
    }
  }
`;

export default graphql(allPosts, {
  props: ({ data }) => ({ ...data })
})(AllPosts);
export { allPosts };