/**
 * DetailsView Screen
 *
 * @format
 */
import React, { useState } from 'react';
import {
  Image,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from '@react-native-vector-icons/ant-design';

import type { RootStackParamList } from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'AlbumDetails'>;

const Hairline = () => {
  return <View style={styles.hairline} />;
};

function StarRatings({
  stars,
  onPress,
}: {
  stars: number;
  onPress: (rating: number) => void;
}) {
  const starSize = 40;
  const icons = [];
  for (let i = 0; i < 5; i++) {
    icons.push(
      <Icon
        key={i}
        size={starSize}
        name="star"
        color={i < stars ? '#f5b50a' : '#ccc'}
        onPress={() => {
          onPress(i + 1);
        }}
      />,
    );
  }

  return <View style={styles.starRow}>{icons}</View>;
}

function AppleMusicLogo({ size }: { size: number }) {
  return (
    <>
      <Icon name="apple" size={size} color="#FFF" style={styles.amIcon} />
      <Text style={[styles.amType, { fontSize: size }]}>MUSIC</Text>
    </>
  );
}

function AppleMusicButton({ link }: { link: string }) {
  return (
    <Pressable onPress={() => Linking.openURL(link)} style={styles.linkStyle}>
      <View style={styles.amRow}>
        <AppleMusicLogo size={20} />
      </View>
    </Pressable>
  );
}

function DetailView({ route }: Props) {
  const { item } = route.params;
  const { position, image, title, artist, category, link, releaseDate } = item;

  const [rating, setRating] = useState(3);

  return (
    <ScrollView style={styles.detailScroll}>
      <View style={styles.detailHeader}>
        <Text style={styles.detailTitle}>{title}</Text>
        <Image style={styles.detailImage} source={{ uri: image }} />
      </View>

      <Text style={styles.detailLabel}>POSITION</Text>
      <Text style={styles.detailValue}>{position}</Text>
      <Hairline />
      <Text style={styles.detailLabel}>ARTIST</Text>
      <Text style={styles.detailValue}>{artist}</Text>
      <Hairline />
      <Text style={styles.detailLabel}>GENRE</Text>
      <Text style={styles.detailValue}>{category}</Text>
      <Hairline />
      <Text style={styles.detailLabel}>RELEASE DATE</Text>
      <Text style={styles.detailValue}>{releaseDate}</Text>

      <StarRatings stars={rating} onPress={setRating} />

      <AppleMusicButton link={link} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  amIcon: {
    top: 1,
    marginRight: 5,
  },
  amType: {
    color: 'white',
    fontWeight: 'bold',
  },
  amRow: {
    flexDirection: 'row',
  },
  starRow: {
    flexDirection: 'row',
  },
  hairline: {
    backgroundColor: '#ddd',
    width: '100%',
    height: 1,
    marginBottom: 25,
  },
  detailScroll: {
    flex: 1,
    padding: 16,
  },
  detailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingBottom: 30,
  },
  detailImage: {
    width: 70,
    height: 70,
  },
  detailTitle: {
    fontSize: 27,
    paddingRight: 20,
    fontWeight: 'bold',
    maxWidth: '80%',
  },
  detailLabel: {
    fontSize: 15,
  },
  detailValue: {
    fontSize: 22,
    paddingBottom: 20,
  },
  linkStyle: {
    backgroundColor: '#000',
    borderRadius: 20,
    alignItems: 'center',
    padding: 20,
    marginTop: 40,
    marginBottom: 40,
  },
});

export default DetailView;
