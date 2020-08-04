/**
 * AlbumsView Screen
 *
 * @format
 * @flow strict-local
 */
import React, { Component } from 'react'
import {
  SafeAreaView, StyleSheet, ScrollView,
  View, Button, Text, UIManager,
  LayoutAnimation, StatusBar, FlatList,
  Image, Linking, TextInput, Pressable
} from 'react-native'
import filter from 'lodash.filter'
import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'

UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true);

function ListImage({item}) {

  return (
    <View>
      <Avatar rounded source={{ uri: item.image }}
        size="medium" containerStyle={{ margin: 10 }} />
      <Badge status="error" value={item.position}
        containerStyle={styles.positionBadge} />
    </View>
  );
}

class ListRow extends Component {
	render = () => {
		const {data : {item}, navigate} = this.props;
		return (
      <SafeAreaView>
        <Pressable
          onPress={() => navigate('AlbumDetails', {item})}
          style={styles.listRows}>
          <ListImage item={item}/>
          <Text style={styles.listTitles}>{item.title}</Text>
        </Pressable>
      </SafeAreaView>
    )
	}
}

class AlbumsView extends Component {

	state = {
    topAlbums: [],
	  filteredTopAlbums: [],
	  query: '',
  };

	contains = ({ title, artist }, query) => {

    return title.toLowerCase().includes(query) ||
      artist.toLowerCase().includes(query);
	}

	handleSearch = text => {
		const formattedQuery = text.toLowerCase();
		const filteredTopAlbums = filter(
      this.state.topAlbums,
      album => {
        return this.contains(album, formattedQuery)
  		}
    );
		this.setState({ filteredTopAlbums, query: text });
	}

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
  				  title, artist,category, link
          });
        });
        this.setAnimation();
        this.setState({topAlbums: cleanData, filteredTopAlbums: cleanData});
      });
  }

	renderHeader = () => (
    <View style={styles.listHeader}>
	    <TextInput
		    style={styles.listSearch}
	      onChangeText={this.handleSearch}
	      autoCapitalize='none'
	      placeholder='Search' />
	  </View>
	)

	render = () => {

		const { navigate } = this.props.navigation;

		return (<FlatList
			ListHeaderComponent={this.renderHeader}
			data={this.state.filteredTopAlbums}
			renderItem={ item => <ListRow data={item} navigate={navigate} /> } />);
	}
}

const styles = StyleSheet.create({
  positionBadge: {
    position: 'absolute',
    top: 4,
    right: -4
  },
  listHeader: {
    backgroundColor: '#fff',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  listSearch: {
  	height: 50,
  	fontSize: 20,
  	borderRadius: 10,
  	borderColor: '#ddd',
  	borderWidth: 1,
  	width: "100%",
  	paddingLeft: 10
  },
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
