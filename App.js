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
  Linking,
  Pressable
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
			  let image = ent["im:image"][0].label;
			  let link = ent.link.attributes.href;

			  return ({key, position, image, title, artist,category, link});
		  });
		  this.setState({topAlbums: cleanData});

		});
    }

	render = () => {
		const { navigate } = this.props.navigation;

		return (<FlatList data={this.state.topAlbums} renderItem={ ({item}) =>
				<SafeAreaView>
					<Pressable onPress={() => navigate('AlbumDetails', { item })}
					style={{  flexDirection: 'row', backgroundColor: "#fff", marginBottom: 1 }}>
						<Image style={{ width: 70, height: 70 }} source={{ uri: item.image }} />
						<Text style={{fontSize: 20, padding: 10, width: 60, fontWeight: "bold"}}>{item.position}</Text>
						<Text style={styles.listTitles}>{item.title}</Text>
					</Pressable>
				</SafeAreaView>} />);
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
const DetailView = ({ route }) => {
  /* 2. Get the param */
  const { item } = route.params;
  const {key, position, image, title, artist, category, link} = item;

  return <>
  <ScrollView style={{ flex: 1, flexDirection: 'column', padding: 16}}>

	<SafeAreaView>
		<View style={{
			flex: 1,
			flexDirection: 'row',
			justifyContent: "space-between",
			width: "100%",
			paddingBottom: 30
		}}>
			<Text style={{
			fontSize: 27,
			paddingRight: 20,
			fontWeight: "bold",
			maxWidth: "80%"
			}}>{ title }</Text>
			<Image style={{ width: 70, height: 70 }} source={{ uri: image }} />
		</View>

		<Text style={styles.detailLabel}>POSITION</Text>
		<Text style={styles.detailValue}>{ position }</Text>
		<Text style={styles.detailLabel}>ARTIST</Text>
		<Text style={styles.detailValue}>{ artist }</Text>
		<Text style={styles.detailLabel}>GENRE</Text>
		<Text style={styles.detailValue}>{ category }</Text>
		<Button title='Apple Music' color="#F22" onPress={ ()=> Linking.openURL(link) }>Buy</Button>
	</SafeAreaView>
  </ScrollView>

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
		  <Stack.Screen name="AlbumDetails" component={DetailView} options={{ title: 'Details' }}/>
		</Stack.Navigator>
	  </NavigationContainer>

    </>
  );
};

const styles = StyleSheet.create({
  listTitles: {
	padding: 10,
	fontSize: 20,
	flex: 1

  },
  border: {
	  height: 20
  },
  detailLabel: {
  	fontSize: 15,
  },
  detailValue: {
  	fontSize: 22,
	paddingBottom: 20
  },
});

export default App;
