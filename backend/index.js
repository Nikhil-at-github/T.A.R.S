const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs'); // File System | Node.js
const axios = require('axios'); // HTTP client
const FormData = require('form-data'); // Readable "multipart/form-data" streams
// const multer  = require('multer')
// const upload = multer();
fileUpload = require('express-fileupload');

// const image_1 = '/image1.jpg';
let filePath;

const app = express();
const PORT = 5000;

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// for parsing multipart/form-data
// app.use(upload.array()); 
// app.use(express.static('public'));

app.use(fileUpload({ createParentPath: true }));

app.get('/', (req,res) => {
    res.send('Hello to TARS!');
});

app.get('/book', (req,res) => {
  // res.send('In books!')
  res.send("Data", image_1);
});

app.post('/img', (req, res) => {
  console.log("Idhaar direct aaya hai!!!!!!!1", req.body);
  (async () => {
    let imgUrl = req.body && req.body.path
    let form = new FormData();
  
    form.append('organs', 'leaf');
    form.append('images', fs.createReadStream(imgUrl));
  
    try {
      const result = await axios.post(
        'https://my-api.plantnet.org/v2/identify/all?api-key=2b10Vtng9bRoXLNGgO1Ft5Wu',
        form, {
          headers: form.getHeaders()
        }
      );

  let data = result.data
      console.log('status', result.status , result); // should be: 200
      res.send(data);

      console.log('data', require('util').inspect(data, false, null, true)); 
      // should be: read "Step 6" below
    } catch (error) {
      console.error('error', error);
    }
  })();
});

app.post('/upload', (req, res, next) => {
  console.log("Data >>>", req.body);
  let uploadFile = req.files.file;
  const fileName = req.body.filename;
  uploadFile.mv(
   `${__dirname}/public/files/${fileName}`,
    function (err) {
      if (err) {
        return res.status(500).send(err)
      }
      res.json({
        file: `public/${req.files.file.name}`,
        path: `${__dirname}/public/files/${fileName}`
      })
    },
  )

  filePath =  `${__dirname}/public/files/${fileName}`;
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`)
});

