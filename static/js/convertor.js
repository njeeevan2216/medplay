import { createFFmpeg, fetchFile } from "https://cdn.jsdelivr.net/npm/@ffmpeg/ffmpeg@0.11.5/+esm";
import ID3Writer from "https://cdn.jsdelivr.net/npm/browser-id3-writer@4.0.0/+esm";

const ffmpeg = createFFmpeg({ log: true });

async function fetchAsArrayBuffer(url) {
    const response = await fetch(url);
    return response.arrayBuffer();
}

export async function convertMp4ToMp3(mp4Url, imageUrl, artist, title, album, year, genre) {
    try {
        if (!mp4Url || !imageUrl) {
            alert("Metadata is missing MP4 or Image URLs!");
            return;
        }

        if (!ffmpeg.isLoaded()) {
            await ffmpeg.load();
        }

        const mp4Buffer = await fetchAsArrayBuffer(mp4Url);
        const imageBuffer = await fetchAsArrayBuffer(imageUrl);

        ffmpeg.FS("writeFile", "input.mp4", new Uint8Array(mp4Buffer));
        await ffmpeg.run("-i", "input.mp4", "-vn", "-b:a", "192k", "output.mp3");

        const mp3Data = ffmpeg.FS("readFile", "output.mp3");

        const writer = new ID3Writer(mp3Data);
        writer.setFrame("TPE1", artist)
              .setFrame("TIT2", title)
              .setFrame("TALB", album)
              .setFrame("TYER", year)
              .setFrame("TCON", genre)
              .setFrame("APIC", { type: 3, data: new Uint8Array(imageBuffer), description: "Cover" });
        writer.addTag();

        const mp3Blob = new Blob([writer.arrayBuffer], { type: "audio/mp3" });
        const mp3Url = URL.createObjectURL(mp3Blob);

        const link = document.createElement("a");
        link.href = mp3Url;
        link.download = `${title || "Unknown_Song"}.mp3`;
        link.click();

    } catch (error) {
        console.error("Error processing files:", error);
        alert("Conversion failed! Check the URLs.");
    }
}
