const express = require('express');
const ytdl = require('ytdl-core');
const fs = require('fs');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/dmf', async (req, res) => {
  try {
    const videoUrl = req.query.url;
    const info = await ytdl.getInfo(videoUrl);
    const outputFilePath = `./${info.videoDetails.title}.mp4`;
    const videoStream = ytdl(videoUrl, { filter: 'videoandaudio' });
    videoStream.pipe(fs.createWriteStream(outputFilePath));
    videoStream.on('end', () => {
      res.download(outputFilePath, () => {
        fs.unlinkSync(outputFilePath);
      });
    });
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.get('/dmt', (req, res) => {
  const videoUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
  const outputFilePath = './audio.mp3';
  const audioStream = ytdl(videoUrl, { filter: 'audioonly', format: 'mp3' });
  audioStream.pipe(fs.createWriteStream(outputFilePath));
  audioStream.on('end', () => {
    res.download(outputFilePath, () => {
      fs.unlinkSync(outputFilePath);
    });
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
