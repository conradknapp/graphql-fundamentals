const videoA = {
  id: "1",
  title: "Bourne Identity",
  duration: 120,
  watched: false
};

const videoB = {
  id: "2",
  title: "Manchurian Candidate",
  duration: 140,
  watched: true
};

const videos = [videoA, videoB];

exports.getVideoById = id =>
  new Promise(resolve => {
    const [video] = videos.filter(video => {
      return video.id === id;
    });

    resolve(video);
  });

exports.getVideos = () => new Promise(resolve => resolve(videos));

exports.createVideo = ({ title, duration, released }) => {
  const video = {
    id: new Buffer(title, "utf8").toString("base64"),
    title,
    duration,
    released
  };

  videos.push(video);

  return video;
};
