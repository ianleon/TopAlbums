/**
 * Shared types for the Music app.
 *
 * @format
 */

export type Album = {
  key: string;
  position: number;
  image: string;
  title: string;
  artist: string;
  category: string;
  link: string;
  releaseDate: string;
};

export type RootStackParamList = {
  AlbumsView: undefined;
  AlbumDetails: { item: Album };
};
