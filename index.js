const express = require('express');
const ytdl = require('ytdl-core');
const fs = require('fs');

const app = express();
const port = 3000;
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const searchTerm = urlParams.get('url');
const videoUrl = searchTerm

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/dmf', (req, res) => {
  
  const outputFilePath = './video.mp4';
  const videoStream = ytdl(videoUrl, { filter: 'videoandaudio' });
  videoStream.pipe(fs.createWriteStream(outputFilePath));
  videoStream.on('end', () => {
    res.download(outputFilePath);
  });
});

app.get('/dmt', (req, res) => {
  
  const outputFilePath = './audio.mp3';
  const audioStream = ytdl(videoUrl, { filter: 'audioonly', format: 'mp3' });
  audioStream.pipe(fs.createWriteStream(outputFilePath));
  audioStream.on('end', () => {
    res.download(outputFilePath);
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
