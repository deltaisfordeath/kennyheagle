const express = require("express");
const path = require("path");
const multer = require('multer');
const sharp = require('sharp');

const PORT = process.env.PORT || 4001;

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.static(path.resolve(__dirname, '../build')));

app.get("/api", (req, res) => {
    res.json({message: "What up from Nodemon!?!"});
})

app.post('/jigsaw-upload', upload.single('image'), async (req, res) => {
  try {
      if (!req.file) {
          throw new Error('No file uploaded');
      }

      console.log("File received on back end")

      const { path: imagePath, originalname } = req.file;
      const imageName = path.parse(originalname).name;

      const image = sharp(imagePath);
      const { width, height } = await image.metadata();

      const squareDimension = Math.min(width, height);

      // Calculate the width and height of each puzzle piece
      const pieceDimension = Math.floor(squareDimension / 3);

      // Check if the extraction area is valid
      if (pieceDimension <= 0) {
          throw new Error('Invalid image dimensions');
      }

      // Generate puzzle pieces
      const pieces = [];

      for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
              const left = j * pieceDimension;
              const top = i * pieceDimension;

              const image = sharp(imagePath).extract({
                  left: Math.floor((width - squareDimension) / 2),
                  top: Math.floor((height - squareDimension) / 2),
                  width: squareDimension,
                  height: squareDimension
              });

              // Check if the extraction area is within the image boundaries
              if (left + pieceDimension > squareDimension || top + pieceDimension > squareDimension) {
                  throw new Error('Invalid extraction area');
              }

              try {
                  const piece = image
                      .extract({
                          left,
                          top,
                          width: pieceDimension,
                          height: pieceDimension,
                      });

                  const bufferPiece = await piece.toBuffer();


                  pieces.push(bufferPiece.toString('base64'));
              } catch (extractionError) {
                  console.error('Error extracting puzzle piece:', extractionError);
                  throw new Error(`Failed to extract puzzle piece: ${extractionError.message}`);
              }
          }
      }

      console.log('Puzzle pieces extracted:', pieces.length);

      return res.status(200).json({ pieces });
  } catch (error) {
      console.error('Error processing image:', error);
      return res.status(500).json({ error: 'Failed to process image', details: error.message });
  }
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});