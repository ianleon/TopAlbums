/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react'
import { StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import DetailView from './screens/DetailView';
import AlbumsView from './screens/AlbumsView';

const Stack = createStackNavigator();

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content"/>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="AlbumsView" component={AlbumsView} options={{title: 'Top 100'}}/>
          <Stack.Screen name="AlbumDetails" component={DetailView} options={{title: 'Details'}}/>
        </Stack.Navigator>
      </NavigationContainer>

    </>
  );
};

export default App;
