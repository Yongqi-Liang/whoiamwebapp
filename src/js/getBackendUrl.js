const fs = require('fs');
const path = require('path');

const getBackendUrl = function() {
  const filePath = path.resolve(__dirname, '../config/backend');
  try {
    const url = fs.readFileSync(filePath, 'utf8').trim();
    return url;
  } catch (err) {
    throw new Error(`Failed to read backend URL: ${err.message}`);
  }
};

module.exports = { getBackendUrl };