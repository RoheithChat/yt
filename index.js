const express = require('express');
const ytdl = require('ytdl-core');
const fs = require('fs');

const app = express();
const port = 3000;
async function getCurrentCopiedText() {
    try {
      const clipboardText = await navigator.clipboard.readText();
      alert(clipboardText)
    } catch (err) {
      console.error('Failed to read clipboard content: ', err);
    }
  }
  getCurrentCopiedText();


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/dmf', (req, res) => {
  const videoUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
  const outputFilePath = './video.mp4';
  const videoStream = ytdl(videoUrl, { filter: 'videoandaudio' });
  videoStream.pipe(fs.createWriteStream(outputFilePath));
  videoStream.on('end', () => {
    res.download(outputFilePath);
  });
});

app.get('/dmt', (req, res) => {
  const videoUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
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
