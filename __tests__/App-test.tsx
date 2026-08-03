/**
 * @format
 */

import React from 'react';
import { Text } from 'react-native';
import ReactTestRenderer from 'react-test-renderer';
import fetchMock from 'jest-fetch-mock';

import DetailView from '../screens/DetailView';
import AlbumsView from '../screens/AlbumsView';
import type { Album } from '../types';

const testAlbum: Album = {
  key: '0',
  position: 1,
  image: 'http://example.com',
  title: 'Test',
  artist: 'Test',
  category: 'TestMusic',
  link: 'http://example.com',
  releaseDate: 'Test',
};

it('renders details correctly', async () => {
  const testRoute = { params: { item: testAlbum } };

  let detailRender: ReactTestRenderer.ReactTestRenderer;
  await ReactTestRenderer.act(() => {
    detailRender = ReactTestRenderer.create(
      <DetailView route={testRoute as any} navigation={{} as any} />,
    );
  });
  expect(detailRender!.toJSON()).toMatchSnapshot();
});

it('renders top albums correctly', async () => {
  fetchMock.mockResponseOnce(
    JSON.stringify({
      feed: {
        entry: [
          {
            'im:name': { label: 'Test' },
            'im:artist': { label: 'Test' },
            'im:releaseDate': { attributes: { label: 'Test' } },
            category: { attributes: { label: 'TestMusic' } },
            'im:image': [{ label: 'http://example.com' }],
            link: { attributes: { href: 'http://example.com' } },
          },
        ],
      },
    }),
  );

  const testNavigation = { navigate: jest.fn() };

  let albumsRender: ReactTestRenderer.ReactTestRenderer;
  await ReactTestRenderer.act(async () => {
    albumsRender = ReactTestRenderer.create(
      <AlbumsView navigation={testNavigation as any} route={{} as any} />,
    );
  });

  const renderedText = albumsRender!.root
    .findAllByType(Text)
    .map(node => node.props.children);
  expect(renderedText).toContain('Test');
});
