/**
 * @format
 */

import 'react-native';
import React from 'react';
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
  	renderer.create(<DetailView route={testRoute} />);
});

it('renders top albums correctly', () => {

	let testNavigation = {
		navigation: {
			navigate: () => {}
		}
	};
  	renderer.create(<AlbumsView navigation={testNavigation} fetch="{}"/>);
});
