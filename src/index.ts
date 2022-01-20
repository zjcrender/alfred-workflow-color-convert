import type { ScriptFilter } from 'alfred-types';
import { getColorType, dealWithNamedColor, dealWithOthers } from './color';

const input = process.argv[2];
const outout: ScriptFilter = { items: [] };

const colorType = getColorType(input);
const isNamedColor = colorType === 'named';

outout.items = isNamedColor
  ? dealWithNamedColor(input)
  : dealWithOthers(input, colorType);

if (outout.items.length === 0) {
  outout.items.push({
    uid: 'invalid',
    title: 'No Result',
    subtitle: 'Action this item to open the OS X color panel',
    arg: 'invalid'
  })
}

console.log(JSON.stringify(outout, null, 2));
