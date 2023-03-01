// External import
import fs from "fs";
import multer from "multer";

// Internal import
import { alphNumericName } from "../../utilities/generateUniqueName";

const fileStorage = multer.memoryStorage();

export const fileUpload = multer({
  storage: fileStorage,
  limits: {
    fileSize: 10000000,
  },
  fileFilter(req: any, file, cb) {
    if (!file?.originalname?.match(/\.(png|jpg|jpeg)$/)) {
      // upload only png and jpg format
      return cb(new Error("Please select png, jpg or jpeg Image Only"));
    }
    cb(undefined, true);
  },
});

export const writeFileToLocalStorage = async (
  req: any,
  res: any,
  next: any
) => {
  let hasError: any;
  try {
    if (typeof req.file !== "undefined") {
      const image = req.file;
      const imagePath = `/uploadedImage/${new Date()
        .getTime()
        .toString()}__${alphNumericName()}_${image.originalname.replace(
        /(?:\.(?![^.]+$)|[^\w.])+/g,
        "-"
      )}`;

      req.filePath = imagePath;
      const fileContents = Buffer.from(image.buffer, "base64");
      fs.writeFile(`uploaded-image/${imagePath}`, fileContents, (err) => {
        if (err) throw err;
      });
    } else {
      throw new Error("Please attached a file!");
    }
  } catch (error) {
    hasError = error;
  } finally {
    if (hasError) {
      req.session.error = hasError.message;
      res.redirect("/variations");
    } else {
      next();
    }
  }
};

// check for File upload
export const writeFilesToLocalStorage = (req: any, res: any, next: any) => {
  let hasError: any;
  try {
    const file = req?.files?.file[0];
    const file2 = req?.files?.maskImg[0];

    if (typeof file2 !== "undefined") {
      const filePath2 = `/uploadedImage/${new Date()
        .getTime()
        .toString()}_${alphNumericName()}_${file2.originalname.replace(
        /(?:\.(?![^.]+$)|[^\w.])+/g,
        "-"
      )}`;

      req.filePath2 = filePath2;
      const fileContents = Buffer.from(file2.buffer, "base64");
      fs.writeFile(`uploaded-image/${filePath2}`, fileContents, (err) => {
        if (err) throw err;
      });
    }
    if (typeof file !== "undefined") {
      const filepath = `/uploadedImage/${new Date()
        .getTime()
        .toString()}__${alphNumericName()}_${file.originalname.replace(
        /(?:\.(?![^.]+$)|[^\w.])+/g,
        "-"
      )}`;

      req.filePath = filepath;
      const fileContents = Buffer.from(file.buffer, "base64");
      fs.writeFile(`uploaded-image/${filepath}`, fileContents, (err) => {
        if (err) throw err;
      });
    } else {
      throw new Error("Please attached a file!");
    }
  } catch (error) {
    hasError = error;
  } finally {
    if (hasError) {
      req.session.error = hasError.message;
      res.redirect("/edit-image");
    } else {
      next();
    }
  }
};

// check for File upload
export const fileWriteLocally = (req: any, res: any, next: any) => {
  let hasError: any;
  try {
    const dirPath = `./uploaded-image/uploadedImage/${new Date()
      .getTime()
      .toString()}_${alphNumericName()}`;
    req.dirPath = dirPath;

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
    }
    const Files = req?.files?.imageFiles;
    for (const file of Files) {
      const fileContents = Buffer.from(file.buffer, "base64");
      const filePath = dirPath + '/' + file.originalname;
      fs.writeFileSync(filePath, fileContents);
    }
  } catch (error) {
    hasError = error;
  } finally {
    if (hasError) {
      req.error = hasError;
      next()
    } else {
      next();
    }
  }
};

// check for File upload
export const fileWriteLocallyForLama = (req: any, res: any, next: any) => {
  let hasError: any;
  try {
    const dirPath = `./uploaded-image/lama/${new Date()
      .getTime()
      .toString()}_${alphNumericName()}`;
    req.dirPath = dirPath;

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
    }
    const Files = req?.files?.imageFiles;
    for (const file of Files) {
      const fileContents = Buffer.from(file.buffer, "base64");
      const filePath = dirPath + '/' + file.originalname.split('.')[0]+'.png';
      if(file.originalname.split('_')[1] === 'mask.png'){
        req.lamaFileName = file.originalname;
      }
      fs.writeFileSync(filePath, fileContents);
    }
  } catch (error) {
    hasError = error;
  } finally {
    if (hasError) {
      req.error = hasError;
      next()
    } else {
      next();
    }
  }
};

// check for File upload
export const previewAvatarWriteLocally = (req: any, res: any, next: any) => {
  let hasError: any;
  try {
    const subDir = `./uploaded-image/preview-avatar`;
    const newPath = `${new Date()
      .getTime()
      .toString()}_${alphNumericName()}`;
    const dirPath = `${subDir}/${newPath}`;

    if (!fs.existsSync(subDir)) {
      fs.mkdirSync(subDir);
    }
    const Files = req?.files?.imageFiles;
    for (const file of Files) {
      const fileContents = Buffer.from(file.buffer, "base64");
      const filePath = dirPath + file.originalname;
      fs.writeFileSync(filePath, fileContents);
      req.dirPath = 'preview-avatar' + '/' + newPath + file.originalname;
    }
  } catch (error) {
    hasError = error;
  } finally {
    if (hasError) {
      req.error = hasError;
      next()
    } else {
      next();
    }
  }
};

