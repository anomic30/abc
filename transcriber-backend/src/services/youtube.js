const ytdl = require('ytdl-core');
const path = require("path");
const fs = require("fs").promises;

const youtubeDownloader = async (url) => {
    const directoryPath = path.resolve(__dirname, '..', '..', 'uploads');
    const filePath = path.resolve(directoryPath, 'yt.mp4');
    try {
        await fs.mkdir(directoryPath, { recursive: true });
        const info = await ytdl.getInfo(url);
        const format = ytdl.chooseFormat(info.formats, 'audioonly');
        const outputStream = await fs.open(filePath, 'w');      
        await ytdl.downloadFromInfo(info, { format: format }).pipe(outputStream);

        await outputStream.on('finish', () => {
            console.log(`Finished downloading: ${filePath}`);
        });

        return filePath;
    } catch (error) {
        console.log(error);
        throw new Error("Youtube download failed");
    }
}

module.exports = { youtubeDownloader };