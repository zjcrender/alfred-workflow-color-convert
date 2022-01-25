import { DATA_DIR } from '../consts';
import { isFile, mkdirIfNotExist, writeFile } from './file';
import type { Instance } from "tinycolor2";
import pngLib from '../pnglib';
import path from 'node:path';

const SIZE = 100;

mkdirIfNotExist(DATA_DIR);
export function makeIcon(color: Instance) {
  if (!DATA_DIR) return 'icon.png';

  const hex = color.toHex8String().replace(/^#/, '');
  const filePath = path.join(DATA_DIR, `${ hex }.png`);

  if (!isFile(filePath)) {
    const { r, g, b, a } = color.toRgb();
    const img = new pngLib(SIZE, SIZE, 8);
    const drawColor = img.color(r, g, b, a * 255 >> 0);

    for (let x = 0; x < SIZE; x++) {
      for (let y = 0; y < SIZE; y++) {
        img.buffer[img.index(x, y)] = drawColor;
      }
    }

    writeFile(
      filePath,
      img.getBase64(),
      { encoding: "base64" }
    );
  }

  return filePath;
}
