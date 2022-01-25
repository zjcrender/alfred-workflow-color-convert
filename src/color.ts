import { ScriptFilterItem } from "alfred-types";
import tinyColor from "tinycolor2";
import { makeIcon } from "./utils/makeIcon";

export type ColorType = 'rgb' | 'hsl' | 'hex' | 'named';
type CorrectionFn = (i: string) => string;
type ColorTypeMatcher = {
  type: ColorType;
  reg: RegExp,
}

export const colorCorrection: Record<Exclude<ColorType, 'named'>, CorrectionFn> = {
  hex(input) {
    let output = input.replace(/^#/g, '');
    const len = output.length;
    if (len === 0) return '#';
    /**
     * a => aa0000
     * ab => aabb00
     * abc => aabbcc
     * abcd => aabbccdd
     * */
    if (len <= 4) {
      output = output.split('').map(s => s.repeat(2)).join('');
    }

    output = output.padEnd(6, '0');
    output = output.padEnd(8, 'f');

    return `#${ output }`;
  },

  rgb(input) {
    let output = input.replace(/[^\d,\.]/g, '');
    const [
      r,
      g = 0,
      b = 0,
      a = 1
    ] = output.split(',');

    return `rgba(${ r }, ${ g }, ${ b }, ${ a })`;
  },

  hsl(input) {
    let output = input.replace(/[^\d,\.]/g, '');
    const [
      h,
      s = 100,
      l = 50,
      a = 1
    ] = output.split(',');

    return `hsla(${ h }, ${ s }, ${ l }, ${ a })`;
  },
};

const typeMatcher: ColorTypeMatcher[] = [
  { type: 'hex', reg: /^#/ },
  { type: 'rgb', reg: /^rgb/i },
  { type: 'hsl', reg: /^hsl/i },
  { type: 'named', reg: /.+/ }
]

export function getColorType(colorStr: string): ColorType {
  return typeMatcher.find(m => m.reg.test(colorStr)).type;
}

export function dealWithNamedColor(name: string): ScriptFilterItem[] {
  const reg = new RegExp(name, 'i');
  const optionalNames = Object.keys(tinyColor.names).filter(name => reg.test(name));

  if (optionalNames.length === 0) {
    // try hex
    return dealWithOthers(name, 'hex');
  } else if (optionalNames.length === 1) {
    return dealWithOthers(tinyColor.names[optionalNames[0]], 'hex');
  } else {
    return optionalNames.map(name => {
      const iconPath = makeIcon(tinyColor(name))

      return {
        title: name,
        subtitle: 'CSS Named Color',
        icon: { path: iconPath },
        valid: false,
        autocomplete: name,
        arg: name
      }
    })
  }
}

export function dealWithOthers(input: string, type: ColorType): ScriptFilterItem[] {
  const color = tinyColor(colorCorrection[type](input));
  if (!color.isValid()) return [];

  const iconPath = makeIcon(color);
  const hasAlpha = color.getAlpha() < 1;
  const alphaSuffix = hasAlpha ? 'A' : '';

  const options = [
    { name: hasAlpha ? color.toHex8String() : color.toHexString(), desc: 'CSS Hexadecimal' },
    { name: color.toRgbString(), desc: `CSS RGB${ alphaSuffix }` },
    { name: color.toPercentageRgbString(), desc: `CSS Percentage RGB${ alphaSuffix }` },
    { name: color.toHslString(), desc: `CSS HSL${ alphaSuffix }` },
    { name: color.toHsvString(), desc: `CSS HSV${ alphaSuffix }` },
  ]

  // add name
  const colorName = color.toName();
  colorName && options.unshift({ name: colorName, desc: 'CSS Named Color' });

  return options.map(({ name, desc }) => {
    return {
      title: name,
      subtitle: desc,
      icon: { path: iconPath },
      valid: true,
      autocomplete: name,
      arg: name,
    }
  })
}
