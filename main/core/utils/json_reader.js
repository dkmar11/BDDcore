const fs = require('fs');
const path = require('path');

/**
* The JsonReader class reads and parses a JSON file.
*/
class JsonReader {
/**
    * The function reads a JSON file and returns its contents as a JavaScript object.
    * @param filename - The filename parameter is the name of the file that you want to read. It
    * should be a string that includes the file extension (e.g., "data.json").
    * @returns the parsed JSON data from the specified file.
*/
  read(filename) {
    const filePath = path.join(__dirname, '..', '..', filename);
    return JSON.parse(fs.readFileSync(filePath));
  }
}

module.exports = JsonReader;
