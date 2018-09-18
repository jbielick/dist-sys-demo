const http = require('http');
const path = require('path');
const fs = require('fs');

const express = require('express');
const multer = require('multer');

const app = express();
const httpServer = http.createServer(app);

const PORT = process.env.PORT || 3000;

httpServer.listen(3000, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.get('/', express.static(path.join(__dirname, "./public")));
app.use(express.static('public/uploads'));

const handleError = (err, res) => {
  console.log(err);
  res
    .status(500)
    .contentType("text/plain")
    .end("Oops! Something went wrong!");
};

const upload = multer({ dest: path.join(__dirname, 'tmp') });

app.post('/upload', upload.single('file'), (req, res) => {
  const tempPath = req.file.path;
  const targetPath = path.join(__dirname, './public/uploads/image.png');

  fs.rename(tempPath, targetPath, err => {
    if (err) return handleError(err, res);
    res.redirect('/');
  });
});
