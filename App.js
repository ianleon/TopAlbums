/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, { Component } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Button,
  Text,
  StatusBar,
  FlatList,
  Image,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

class AlbumsView extends Component {

	state = {
      topAlbums: [],
    };

  	componentDidMount = () => {

		fetch("https://itunes.apple.com/us/rss/topalbums/limit=100/json")
		.then(response => response.json())
		.then(musicData => {

		  let cleanData = musicData.feed.entry.map((ent,i) => {

			  let key = i + "";
			  let position = i+1;
			  let title = ent["im:name"].label;

			  let artist = ent["im:artist"].label;
			  let category = ent.category.attributes.label;
			  let image = ent["im:image"][2].label;

			  return ({key, position, image, title, artist,category});
		  });
		  this.setState({topAlbums: cleanData});

		});
    }

	render = () => {
		const { navigate } = this.props.navigation;

		return (
			<FlatList data={this.state.topAlbums} renderItem={ ({item}) =>
				<Text
				onPress={() => navigate('AlbumDetails', { item })}
				style={styles.listTitles}>{item.title}</Text>
				} />
	  	);
	}
}

const Stack = createStackNavigator();

const HomeScreen = ({ navigation }) => {
  return (
    <Button
      title="Go to Jane's profile"
      onPress={() =>
        navigation.navigate('Profile', { name: 'Jane' })
      }
    />
  );
};
const ProfileScreen = ({ route }) => {
  /* 2. Get the param */
  const { item } = route.params;
  const {key, position, image, title, artist, category} = item;

  console.log(key);

  return <>
  <View style={{ padding: 16}}>
  <Text style={{ fontSize: 70, fontWeight: "bold", paddingTop: 20}}>#{ position }</Text>
  <Image
        style={{ width: 170, height: 170 }}
        source={{
          uri: image,
        }}
      />
  <Text style={{
	  fontSize: 40
	  }}>{ title }</Text>
  <Text>{ artist }</Text>
  <Text>{ category }</Text>
  </View>

  </>;
};

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
	  <NavigationContainer>
		<Stack.Navigator>
		  <Stack.Screen
			name="AlbumsView"
			component={AlbumsView}
			options={{ title: 'Top 100' }}
		  />
		  <Stack.Screen name="AlbumDetails" component={ProfileScreen} options={{ title: 'Details' }}/>
		</Stack.Navigator>
	  </NavigationContainer>
      
    </>
  );
};

const styles = StyleSheet.create({
  listTitles: {
	  padding: 10,
	   fontSize: 18,
	   borderBottomColor: "black",
	   borderBottomWidth: 4,
	   height: 44
  },
});

export default App;
