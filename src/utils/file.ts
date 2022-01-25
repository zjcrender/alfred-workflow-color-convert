import type { WriteFileOptions } from "fs";
import fs from "node:fs";

export function mkdirIfNotExist(dir: string) {
  if (!dir) return;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export function isFile(filePath: string) {
  let isFile: boolean;
  try {
    const stat = fs.statSync(filePath);
    isFile = stat.isFile();
  } catch (err) {
    isFile = false;
  }
  return isFile;
}

export function isReadable(path: string) {
  let readable: boolean;
  try {
    fs.accessSync(path, fs.constants.R_OK);
    readable = true;
  } catch (e) {
    readable = false;
  }
  return readable;
}

export function writeFile(path: string, content: string, options: WriteFileOptions) {
  fs.writeFileSync(path, content, options);
}
