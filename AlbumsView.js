/**
 * AlbumsView Screen
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
  Button,
  Text,
  StatusBar,
  FlatList,
  Image,
  Linking,
  Pressable
} from 'react-native';

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
			  let releaseDate = ent["im:releaseDate"].attributes.label;
			  let category = ent.category.attributes.label;
			  let image = ent["im:image"][0].label;
			  let link = ent.link.attributes.href;

			  return ({key, position, image, releaseDate, title, artist,category, link});
		  });
		  this.setState({topAlbums: cleanData});

		});
    }

	render = () => {
		const { navigate } = this.props.navigation;

		return (<FlatList data={this.state.topAlbums} renderItem={ ({item}) =>
				<SafeAreaView>
					<Pressable onPress={() => navigate('AlbumDetails', { item })}
					style={{ alignItems: "center", flexDirection: 'row', backgroundColor: "#fff", marginBottom: 1 }}>
						<Image style={{ width: 70, height: 70 }} source={{ uri: item.image }} />
						<Text style={styles.listTitles}>{item.title}</Text>
					</Pressable>
				</SafeAreaView>} />);
	}
}

const styles = StyleSheet.create({
  listTitles: {
	padding: 10,
	fontSize: 20,
	flex: 1

  },
});

export default AlbumsView;
