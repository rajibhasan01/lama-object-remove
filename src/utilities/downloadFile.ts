import fs, { createReadStream } from "fs";
import https from "https";
import { alphNumericName } from "../utilities/generateUniqueName";

export const downloadFile = async(url: any, folderID:any) => {
  console.log("url => ", url, folderID)
    try{
      return new Promise(async(resolve, reject) => {
        const name = alphNumericName() + '.png';
        const subPath = `./uploaded-image/${folderID}`;
        if(!fs.existsSync(subPath)){
          fs.mkdirSync(subPath, { recursive: true })
        }
        const path = `${subPath}/${name}`;
        const filePath = fs.createWriteStream(path);
        const Request = https.get(url, (response) => {
          response.pipe(filePath);

          filePath.on('finish', () => {
            resolve(name);
          });
        }).on('error', (err) => {
          fs.unlink(path, (error => {
            if(error){
              reject(error);
            }
          }));

          if(err){
            reject(err);
          }
        })
      }).catch((error) => {
        throw error;
      })
    }  catch(error){
      throw error;
    }
   }