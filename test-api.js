const axios = require('axios');

const apiKey = 'f3b88ec52amsh56ba92c2310c31ep11c7fbjsn5be8006fc803';
const reelUrl = 'https://www.instagram.com/reel/C2X4yJvS9J_/'; // Sample reel

async function testApi() {
    console.log("Testing RapidAPI with key:", apiKey);

    const options = {
        method: 'GET',
        url: 'https://social-media-video-downloader.p.rapidapi.com/smvd/get/instagram',
        params: { url: reelUrl },
        headers: {
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': 'social-media-video-downloader.p.rapidapi.com'
        }
    };

    try {
        const response = await axios.request(options);
        console.log("SUCCESS!");
        console.log("Response Data:", JSON.stringify(response.data, null, 2));
    } catch (error) {
        console.error("FAILED!");
        if (error.response) {
            console.error("Status:", error.response.status);
            console.error("Error Data:", error.response.data);
        } else {
            console.error("Error Message:", error.message);
        }
    }
}

testApi();
