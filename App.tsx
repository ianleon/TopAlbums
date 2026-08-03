/**
 * Top Albums App
 *
 * @format
 */
import React from 'react';
import { StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DetailView from './screens/DetailView';
import AlbumsView from './screens/AlbumsView';
import type { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="AlbumsView"
            component={AlbumsView}
            options={{ title: 'Top 100' }}
          />
          <Stack.Screen
            name="AlbumDetails"
            component={DetailView}
            options={{ title: 'Details' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default App;
