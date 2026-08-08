/**
 * AlbumsView Screen
 *
 * @format
 */
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  LayoutAnimation,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { Album, RootStackParamList } from '../types';

const FEED_URL = 'https://itunes.apple.com/us/rss/topalbums/limit=100/json';

type Props = NativeStackScreenProps<RootStackParamList, 'AlbumsView'>;

function ListImage({ item }: { item: Album }) {
  return (
    <View>
      <Image source={{ uri: item.image }} style={styles.listImage} />
      <View style={styles.positionBadge}>
        <Text style={styles.positionBadgeText}>{item.position}</Text>
      </View>
    </View>
  );
}

function ListRow({
  item,
  onPress,
}: {
  item: Album;
  onPress: (item: Album) => void;
}) {
  return (
    <Pressable onPress={() => onPress(item)} style={styles.listRows}>
      <ListImage item={item} />
      <Text style={styles.listTitles}>{item.title}</Text>
    </Pressable>
  );
}

function contains({ title, artist }: Album, query: string) {
  return (
    title.toLowerCase().includes(query) || artist.toLowerCase().includes(query)
  );
}

function AlbumsView({ navigation }: Props) {
  const [topAlbums, setTopAlbums] = useState<Album[]>([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    fetch(FEED_URL)
      .then(response => response.json())
      .then(musicData => {
        const cleanData: Album[] = musicData.feed.entry.map(
          (ent: any, i: number) => ({
            key: String(i),
            position: i + 1,
            title: ent['im:name'].label,
            artist: ent['im:artist'].label,
            releaseDate: ent['im:releaseDate'].attributes.label,
            category: ent.category.attributes.label,
            image: ent['im:image'][0].label,
            link: ent.link.attributes.href,
          }),
        );
        if (!cancelled) {
          LayoutAnimation.configureNext({
            duration: 500,
            create: {
              type: LayoutAnimation.Types.easeOut,
              property: LayoutAnimation.Properties.scaleY,
            },
          });
          setTopAlbums(cleanData);
        }
      })
      .catch(error => {
        console.warn('Failed to load top albums', error);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const formattedQuery = query.toLowerCase();
  const filteredTopAlbums = formattedQuery
    ? topAlbums.filter(album => contains(album, formattedQuery))
    : topAlbums;

  return (
    <FlatList
      ListHeaderComponent={
        <View style={styles.listHeader}>
          <TextInput
            style={styles.listSearch}
            onChangeText={setQuery}
            autoCapitalize="none"
            placeholder="Search"
          />
        </View>
      }
      data={filteredTopAlbums}
      renderItem={({ item }) => (
        <ListRow
          item={item}
          onPress={pressed => navigation.navigate('AlbumDetails', { item: pressed })}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  positionBadge: {
    position: 'absolute',
    top: 4,
    right: -4,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    paddingHorizontal: 4,
    backgroundColor: '#ff190c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  positionBadgeText: {
    color: '#fff',
    fontSize: 12,
  },
  listHeader: {
    backgroundColor: '#fff',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listSearch: {
    height: 50,
    fontSize: 20,
    borderRadius: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    width: '100%',
    paddingLeft: 10,
  },
  listTitles: {
    padding: 10,
    fontSize: 20,
    flex: 1,
  },
  listImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 10,
  },
  listRows: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 1,
  },
});

export default AlbumsView;
