import React, { useState } from 'react';

import { Grid } from '@material-ui/core';

import { SearchBar, VideoDetails, VideoList } from './components';

import youtube from './api/youtube';

const App = () => {
  const [videos, setVideos] = useState({
    videos: [],
    selectedVideo: '',
  });

  const handleSubmit = async (searchTerm) => {
    const response = await youtube.get('search', {
      params: {
        part: 'snippet',
        maxResults: 5,
        key: '...',
        q: searchTerm,
      },
    });

    setVideos({
      videos: response.data.items,
      selectedVideo: response.data.items[0],
    });
  };

  const handleSelect = (video) => {
    setVideos({
      selectedVideo: video,
    });
  };

  return (
    <Grid justify="center" container spacing={10}>
      <Grid item xs={12}>
        <Grid container spacing={10}>
          <Grid item xs={12}>
            <SearchBar onFormSubmit={handleSubmit} />
          </Grid>
          <Grid item xs={8}>
            <VideoDetails video={videos.selectedVideo} />
          </Grid>
          <Grid item xs={4}>
            <VideoList videos={videos.videos} onVideoSelect={handleSelect} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default App;
