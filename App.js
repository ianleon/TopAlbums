/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
} from 'react-native';

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
			  let title = ent.title.label;
			  let artist = ent["im:artist"].label;
			  let category = ent.category.attributes.label;
			  let image = ent["im:image"][0].label;

			  return ({key, position, image, title, artist,category});
		  });
		  this.setState({topAlbums: cleanData});

		});
    }

	render = () => {
	  return (
		  <FlatList data={this.state.topAlbums} renderItem={ album => <Text style={styles.listTitles}>{album.item.title}</Text>} />
	  );
	}
}

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
	  	<AlbumsView />
      </SafeAreaView>
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
