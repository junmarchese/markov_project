/** Command-line tool to generate Markov text. */

const fs = require('fs');
const axios = require('axios');
const process = require('process');
const { MarkovMachine } = require('./markov');

function generateDisplayText(text) {
    let mm = new MarkovMachine(text);
    console.log(mm.makeText())
}


// Read file and generate text
function makeTextFromFile(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(`Cannot read file: ${path}: ${err}`);
            process.exit(1);
        } else {
            generateDisplayText(data);
        }
    });
}

// Fetch text from URL and make text
async function makeTextFromURL(url) {
    try {
        let response = await axios.get(url);
        generateDisplayText(response.data);
    } catch (err) {
        console.error(`Cannot read URL: ${url}: ${err}`);
        process.exit(1);
    }
}


// Command-line handling
let [method, path] = process.argv.slice(2);

if (method === "file") {
    makeTextFromFile(path);
} else if (method === "url") {
    makeTextFromURL(path);
} else {
    console.error(`Unknown method: ${method}`);
    process.exit(1);
}