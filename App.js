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

import DetailView from './DetailView';
import AlbumsView from './AlbumsView';

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
	  <NavigationContainer>
		<Stack.Navigator>
		  <Stack.Screen name="AlbumsView" component={AlbumsView} options={{ title: 'Top 100' }} />
		  <Stack.Screen name="AlbumDetails" component={DetailView} options={{ title: 'Details' }}/>
		</Stack.Navigator>
	  </NavigationContainer>

    </>
  );
};

export default App;
