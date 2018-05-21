exports.convertToDataUrl = (imgUrl, callback) => {
  request.get(imgUrl, (error, rep, body) => {
    if (!error && rep.statusCode === 200) {
      // data = 'data:' + rep.headers['content-type'] + ';base64,' + new Buffer(body).toString('base64');
      body = new Buffer(body, 'binary');
    }

    callback(body, rep.headers['content-type']);
  });
};