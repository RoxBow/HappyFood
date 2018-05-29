const request = require('request');
const fs = require('fs');
const path = require('path');

exports.downloadImage = (uri, filename, callback) => {
  request.head(uri, (err, res, body) => {
    // absolutePath use to create file to correct folder
    const absolutePath = path.join(__dirname, '../contrib/'); 
    
    const extension = res.headers['content-type'].split('/')[1];
    const lengthFile = res.headers['content-length'];
    const typeFile = res.headers['content-type'];
    const pathSrcImg = path.join('./contrib', filename+'.'+extension);

    const completePath = absolutePath + filename + '.' + extension;
    
    if (fs.existsSync(completePath)) {
      console.error('path already exist')
    }

    request(uri).pipe(fs.createWriteStream(completePath));
    callback(filename, pathSrcImg, lengthFile, typeFile);
  });
};
