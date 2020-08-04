/**
 * DetailsView Screen
 *
 * @format
 * @flow strict-local
 */
import React, { Component, useState } from 'react'
import {
  SafeAreaView, StyleSheet, ScrollView,
  View, Button, Text, FlatList, Image,
  Linking, Pressable
} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';

const Hairline = () => {
	return <View style={styles.hairline}></View>
}

function StarRatings({stars,onPress}) {

	var starSize = 40;
	var icons = [];
	for (let i = 0; i < 5; i++) {

		icons.push(
			<Icon
			key={i}
			size={starSize}
			name={i < stars ? "star" : "staro"}
			onPress={ () => { onPress(i + 1) } } />
		);
	}

	return <View style={{ flexDirection: "row" }}>{icons}</View>;
}

function AppleMusicLogo({size}) {

  return (<>
    <Icon name="apple1" size={size} color="#FFF" style={styles.amIcon} />
    <Text style={{...styles.amType, fontSize: size}}>MUSIC</Text>
  </>);
}

function AppleMusicButton({link}) {
  return (
    <Pressable onPress={ ()=> Linking.openURL(link) } style={styles.linkStyle}>
      <View style={{ flexDirection: 'row' }}>
        <AppleMusicLogo size={20} />
			</View>
		</Pressable>
  );
}

function DetailView({ route }) {

  const { item : {
    key, position, image, title,
    artist, category, link, releaseDate
  } } = route.params;

  // Using hooks for ratings
  const [rating, setRating] = useState(3);

  return <>
  <ScrollView style={{ flex: 1, flexDirection: 'column', padding: 16}}>
  	<SafeAreaView>

  		<View style={styles.detailHeader}>
  			<Text style={styles.detailTitle}>{ title }</Text>
  			<Image style={{ width: 70, height: 70 }} source={{ uri: image }} />
  		</View>

  		<Text style={styles.detailLabel}>POSITION</Text>
  		<Text style={styles.detailValue}>{ position }</Text>
  		<Hairline />
  		<Text style={styles.detailLabel}>ARTIST</Text>
  		<Text style={styles.detailValue}>{ artist }</Text>
  		<Hairline />
  		<Text style={styles.detailLabel}>GENRE</Text>
  		<Text style={styles.detailValue}>{ category }</Text>
  		<Hairline />
  		<Text style={styles.detailLabel}>RELEASE DATE</Text>
  		<Text style={styles.detailValue}>{ releaseDate }</Text>

  		<StarRatings stars={rating} onPress={(i) => { setRating(i); }}/>

      <AppleMusicButton link={link} />

  	</SafeAreaView>
  </ScrollView>
  </>;
};
const styles = StyleSheet.create({

  amIcon: {
    top: 1,
    marginRight: 5
  },
  amType: {
    color: "white",
    fontWeight: "bold"
  },
  hairline: {
    backgroundColor: "#ddd",
    width: "100%",
    height: 1,
    marginBottom: 25,
  },
  detailHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "space-between",
    width: "100%",
    paddingBottom: 30
  },
  detailTitle: {
    fontSize: 27,
    paddingRight: 20,
    fontWeight: "bold",
    maxWidth: "80%",
  },
  detailLabel: {
  	fontSize: 15,
  },
  detailValue: {
  	fontSize: 22,
	  paddingBottom: 20
  },
  linkStyle: {
    backgroundColor: "#000",
    borderRadius: 20,
    alignItems: "center",
    padding: 20,
    marginTop: 40,
  },
});

export default DetailView;
