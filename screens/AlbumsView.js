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
  UIManager,
  LayoutAnimation,
  StatusBar,
  FlatList,
  Image,
  Linking,
  Pressable
} from 'react-native';


UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true);

const ListRow = ({item}) => {
	return <SafeAreaView>
		<Pressable
		onPress={() => navigate('AlbumDetails', {item})}
		style={styles.listRows}>
			<Image style={styles.listImage} source={{ uri: item.image }} />
			<Text style={styles.listTitles}>{item.title}</Text>
		</Pressable>
	</SafeAreaView>
}

class AlbumsView extends Component {

	state = {
      topAlbums: [],
    };


	setAnimation = () => {
		LayoutAnimation.configureNext({
			duration: 500,
			create: {
				type: LayoutAnimation.Types.easeOut,
				property: LayoutAnimation.Properties.scaleY,
			},
		});
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

			  return ({
				  key, position, image, releaseDate,
				  title, artist,category, link});
		  });
		  this.setAnimation();
		  this.setState({topAlbums: cleanData});

		});
    }

	render = () => {
		const { navigate } = this.props.navigation;
		return (<FlatList data={this.state.topAlbums} renderItem={ListRow} />);
	}
}

const styles = StyleSheet.create({
  listTitles: {
	padding: 10,
	fontSize: 20,
	flex: 1
  },
  listImage: {
	  width: 70,
	  height: 70
  },
  listRows: {
	  alignItems: "center",
	  flexDirection: 'row',
	  backgroundColor: "#fff",
	  marginBottom: 1
  }
});

export default AlbumsView;
