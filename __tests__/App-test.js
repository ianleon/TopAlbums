/**
 * @format
 */

import 'react-native';
import React from 'react';
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
import DetailView from '../DetailView';
import AlbumsView from '../AlbumsView';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders details correctly', () => {

	let testRoute = {
		"params": {
			"item": {
				key: "0",
				position: "1",
				image: "http://example.com",
				title: "Test",
				artist: "Test",
				category: "TestMusic",
				link: "http://example.com",
				releaseDate: "Test"
			}
		}
	};
  	let detailRender = renderer.create(<DetailView route={testRoute} />).toJSON();
  	expect(detailRender).toMatchSnapshot();
});

it('renders top albums correctly', () => {

	let testNavigation = {
		navigation: {
			navigate: () => {}
		}
	};
  	let albumsRender = renderer.create(<AlbumsView navigation={testNavigation} fetch="{}"/>).toJSON();
	expect(albumsRender).toMatchSnapshot();
});
