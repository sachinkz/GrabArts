const { v4: uuidv4 } = require("uuid")
const multer = require("multer")

const MIME = {
  "image/png": "png",
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
}

const fileUpload = multer({
  limits: 500000,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/images")
    },
    filename: (req, file, cb) => {
      const ext = MIME[file.mimetype]
      console.log(uuidv4() + "." + ext)
      cb(null, uuidv4() + "." + ext)
    },
  }),
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME[file.mimetype]
    let error = isValid ? null : new Error("invalid mime type")
    cb(error, isValid)
  },
})

module.exports = fileUpload
