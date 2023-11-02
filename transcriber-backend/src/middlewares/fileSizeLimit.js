// The maximum file size is 1GB for audio and 10GB for videos.
const MB = 1024 * 1024;
const GB = 1024 * MB;
const audioSizeLimit = 1 * GB;
const videoSizeLimit = 10 * GB;

const fileSizeLimiter = (req, res, next) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }
  const file = req.files.file;
  if (file.mimetype.includes("audio") && file.size > audioSizeLimit) {
    return res.status(413).json({ msg: "File size limit exceeded" });
  }
  if (file.mimetype.includes("video") && file.size > videoSizeLimit) {
    return res.status(413).json({ msg: "File size limit exceeded" });
  }
  next();
}

module.exports = { fileSizeLimiter };