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
    title: 'No Result',
    subtitle: 'Enter the correct color, plz',
    valid: false,
  })
}

console.log(JSON.stringify(outout, null, 2));
