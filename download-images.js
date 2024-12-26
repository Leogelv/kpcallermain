import fs from 'fs';
import https from 'https';

const images = {
  'hero-bg.webp': 'https://cdn.midjourney.com/c3c10d7a-7cc4-48fb-a64a-21a1845a6c04/0_0.webp',
  'feature-1.webp': 'https://cdn.midjourney.com/c0a11f1d-8e7d-4a6c-96c9-f9c758213a7f/0_1.webp',
  'feature-2.webp': 'https://cdn.midjourney.com/c0a11f1d-8e7d-4a6c-96c9-f9c758213a7f/0_2.webp',
  'feature-3.webp': 'https://cdn.midjourney.com/c0a11f1d-8e7d-4a6c-96c9-f9c758213a7f/0_3.webp',
  'feature-4.webp': 'https://cdn.midjourney.com/c0a11f1d-8e7d-4a6c-96c9-f9c758213a7f/0_0.webp'
};

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        res.pipe(fs.createWriteStream(filepath))
           .on('error', reject)
           .once('close', () => resolve(filepath));
      } else {
        res.resume();
        reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));
      }
    });
  });
};

async function downloadAllImages() {
  try {
    for (const [filename, url] of Object.entries(images)) {
      console.log(`Downloading ${filename}...`);
      await downloadImage(url, `public/images/${filename}`);
      console.log(`Successfully downloaded ${filename}`);
    }
    console.log('All images downloaded successfully!');
  } catch (error) {
    console.error('Error downloading images:', error);
  }
}

downloadAllImages(); 