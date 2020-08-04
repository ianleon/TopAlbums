/**
 * DetailsView Screen
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
  FlatList,
  Image,
  Linking,
  Pressable
} from 'react-native';

const Hairline = () => {
	return <View style={{backgroundColor: "#ddd", width: "100%", height: 1, marginBottom: 25}}></View>
}

const DetailView = ({ route }) => {
  /* 2. Get the param */
  const { item } = route.params;
  const {key, position, image, title, artist, category, link, releaseDate} = item;

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
		<Hairline />
		<Text style={styles.detailLabel}>ARTIST</Text>
		<Text style={styles.detailValue}>{ artist }</Text>
		<Hairline />
		<Text style={styles.detailLabel}>GENRE</Text>
		<Text style={styles.detailValue}>{ category }</Text>
		<Hairline />
		<Text style={styles.detailLabel}>RELEASE DATE</Text>
		<Text style={styles.detailValue}>{ releaseDate }</Text>

		<Pressable
		onPress={ ()=> Linking.openURL(link) }
		style={{
			backgroundColor: "#000",
			borderRadius: 20,
			alignItems: "center",
			padding: 20,
			marginTop: 40,
			}}>
			<Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>Get</Text>
		</Pressable>
	</SafeAreaView>
  </ScrollView>

  </>;
};
const styles = StyleSheet.create({
  detailLabel: {
  	fontSize: 15,
  },
  detailValue: {
  	fontSize: 22,
	paddingBottom: 20
  },
});

export default DetailView;
