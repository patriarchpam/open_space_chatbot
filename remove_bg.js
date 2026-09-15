const sharp = require('sharp');
const path = require('path');

const inputPath = path.join(__dirname, 'public', 'logo.jpeg');
const outputPath = path.join(__dirname, 'public', 'logo.png');

async function removeWhiteBackground() {
    const { data, info } = await sharp(inputPath)
        .raw()
        .ensureAlpha()
        .toBuffer({ resolveWithObject: true });

    const { width, height, channels } = info;
    const threshold = 220;

    // Make white/near-white pixels transparent
    for (let i = 0; i < data.length; i += channels) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        if (r > threshold && g > threshold && b > threshold) {
            data[i + 3] = 0; // alpha = 0
        }
    }

    await sharp(data, { raw: { width, height, channels } })
        .png()
        .toFile(outputPath);

    console.log('Done! Saved transparent logo to', outputPath);
}

removeWhiteBackground().catch(console.error);
