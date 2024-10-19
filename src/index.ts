const fs = require("fs");
//import fs from "fs";

const path = require("path");
const sharp = require("sharp");

// function reverse() {
//   const _path = path.resolve(__dirname, "./StickersBackup");
//   const folders = fs.readdirSync(_path);
//   console.log(folders);
//   for (let folder of folders) {
//     const fileFolderPath = path.resolve(_path, folder);
//     const files = fs.readdirSync(fileFolderPath);
//     let initial = files.length;
//     for (let file of files.sort()) {
//       const filePath = path.resolve(fileFolderPath, file);
//       const newFileName = initial + ".webp";
//       const rename = filePath.replace(file, newFileName);
//       fs.renameSync(filePath, rename);
//       initial--;
//     }

//     console.log(files.sort(), files.length);
//   }
// }
// reverse();

async function see() {
  const _path = path.resolve(__dirname, "./StickersBackup");
  const folders = fs.readdirSync(_path);
  for (let folder of folders) {
    const fileFolderPath = path.resolve(_path, folder);
    const files = fs.readdirSync(fileFolderPath);
    for (let file of files.sort()) {
      const filePath = path.resolve(fileFolderPath, file);
      const imageBuffer = await sharp(filePath).toBuffer();
      const metadata = await sharp(imageBuffer).metadata();
      const kb = fs.statSync(filePath);
      const realKB = kb.size / 1024;

      const pixelNxm = `${metadata.width}x${metadata.height}`;
      const overWeight = realKB > 500;
      const wrongWidth = metadata.width !== 512;
      const wrongHeight = metadata.height !== 512;
      if (wrongWidth || wrongHeight) {
        console.log("FORMAT: ", folder, " | - ", file, realKB, pixelNxm);
      }
      if (overWeight) {
        console.log("KB: ", folder, " | - ", file, realKB, pixelNxm);
      }
    }
  }
}
see();
