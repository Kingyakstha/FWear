import multer from "multer";
import fs from "fs";
import path from "path";
import os from "os";

const localPath = path.join("src", "public", "temp",'hello');
console.log("Local path is ",localPath," and ",os.tmpdir())
const storage = multer.diskStorage({    // stores the image in device then uploads
    destination: function (req, file, cb) {
      cb(null,fs.existsSync(localPath)? "src/public/temp":os.tmpdir())
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
  export const upload = multer({storage })

// const storage = multer.memoryStorage();   // directly uploads using in-memory
// export const upload = multer({ storage });