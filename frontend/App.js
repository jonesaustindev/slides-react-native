import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { ApolloProvider } from 'react-apollo';
// import withData from './lib/withData';
import client from './lib/createClient';
import navStyles from './styles/navStyles';
import Image from './screens/Image';





class App extends React.Component {
  static navigationOptions = {
    title: "Home",
    ...navStyles,
  }

  goToImage = () => {
    this.props.navigation.navigate('Image');
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <View style={styles.container}>
          <Text>Hello!</Text>
          <Button
            onPress={this.goToImage}
            title="Image Page"
          />
        </View>
      </ApolloProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const AppNavigator = createStackNavigator({
  Home: {
    screen: App
  },
  Image: {
    screen: Image
  }
})

export default createAppContainer(AppNavigator);