const fs = require('fs');
const sharp = require('sharp');

async function convertIcons() {
    const svgBuffer = fs.readFileSync('./public/favicon.svg');

    try {
        // Convert to PNG 192x192 for PWA
        await sharp(svgBuffer)
            .resize(192, 192)
            .png()
            .toFile('./public/icon.png');
        console.log('✓ Created icon.png (192x192)');

        // Convert to ICO 32x32 for favicon
        await sharp(svgBuffer)
            .resize(32, 32)
            .toFormat('png')
            .toFile('./public/favicon-temp.png');

        // Rename temp PNG to ICO (Windows recognizes PNG as ICO)
        fs.renameSync('./public/favicon-temp.png', './public/favicon.ico');
        console.log('✓ Created favicon.ico (32x32)');

        console.log('✓ Conversion complete!');
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
}

convertIcons();
