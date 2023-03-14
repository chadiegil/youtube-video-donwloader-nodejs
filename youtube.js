const ytdl = require("ytdl-core");
const fs = require("fs");

// Get the video URL from user input
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question("Enter YouTube video URL: ", (url) => {
  console.log(`Downloading video from ${url}...`);

  // Download the video and save to file
  const video = ytdl(url, { quality: "highest" });
  video.pipe(fs.createWriteStream("video.mp4"));

  video.on("progress", (chunkLength, downloaded, total) => {
    console.log(`${((downloaded / total) * 100).toFixed(2)}% downloaded`);
  });

  video.on("end", () => {
    console.log("Video downloaded successfully!");
    readline.close();
  });
});
