import multer from "multer";

const storage = multer.diskStorage({    // stores the image in device then uploads
    destination: function (req, file, cb) {
      cb(null, "src/public/temp")
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
  export const upload = multer({storage })

// const storage = multer.memoryStorage();   // directly uploads using in-memory
// export const upload = multer({ storage });