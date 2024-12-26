import Replicate from "replicate";
import dotenv from 'dotenv';
import fs from 'fs';
import { Readable } from 'stream';
import { finished } from 'stream/promises';

dotenv.config();

const prompts = [
  "A futuristic AI call center visualization, featuring dynamic neural network patterns and voice waveforms in a sleek, minimalist environment. Holographic displays showing real-time voice analysis and AI processing. Cool blue and purple color scheme with glowing elements. Cinematic 16:9 composition, photorealistic render with dramatic lighting and depth of field"
];

async function generateImage(prompt, index) {
  const replicate = new Replicate({
    auth: process.env.REPLICATE_API_KEY,
  });

  const input = {
    prompt,
    aspect_ratio: index === 0 ? "16:9" : "1:1",
    output_format: "webp",
    output_quality: 90,
    safety_tolerance: 2,
    prompt_upsampling: true
  };

  try {
    console.log(`🎨 Generating image ${index + 1}...`);
    const output = await replicate.run("black-forest-labs/flux-1.1-pro", { input });
    
    if (!fs.existsSync('./public/generated-images')) {
      fs.mkdirSync('./public/generated-images', { recursive: true });
    }

    const fileName = `./public/generated-images/image-${index + 1}.webp`;
    
    const response = await fetch(output);
    const fileStream = fs.createWriteStream(fileName);
    await finished(Readable.fromWeb(response.body).pipe(fileStream));
    
    console.log(`✨ Image ${index + 1} saved to: ${fileName}`);
    return fileName;
  } catch (error) {
    console.error(`Error generating image ${index + 1}:`, error);
    return null;
  }
}

async function generateAllImages() {
  console.log('🚀 Starting batch image generation...');
  const results = await Promise.all(prompts.map((prompt, index) => generateImage(prompt, index)));
  console.log('✅ All images generated!');
  return results;
}

generateAllImages();