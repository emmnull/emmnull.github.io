import { cwd } from 'process';

export const PATH_PATTERN =
  /\s*((?:[a-zA-Z]:|\.{1,2}|\$[\w-]+|\/)[^?]*?\.(\w+))(\?[^ ]*)?\s*/i;

export const IMAGE_PATH_PATTERN =
  /\s*((?:[a-zA-Z]:|\.{1,2}|\$[\w-]+|\/)[^?]*?\.(jpe?g|png|gif|heif|tiff|avif|bmp|webp|svg))(\?[^ ]*)?\s*/i;

export const SCRIPT_START_PATTERN =
  /<script(?:\s+?[a-zA-z]+(=(?:["']){0,1}[a-zA-Z0-9]+(?:["']){0,1}){0,1})*\s*?>/;

export const PROPS_PATTERN =
  /(\w+)\s*=\s*(["'])(\s*(\$\w+|\.{1,2})[/\\].*?\.\w+\s*(\?([^=&]+=[^=&]+)(&[^=&]+=[^=&]+)*)?)\2/g;

export const CWD_PATTERN = new RegExp(
  `^${cwd().replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[\\/]*`,
);

export function globGroup(arr: string[] | readonly string[]) {
  if (!arr.length) {
    return '';
  }
  if (arr.length === 1) {
    return arr[0];
  }
  return `{${arr.join(',')}}`;
}
