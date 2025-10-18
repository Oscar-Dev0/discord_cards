import { FontLibrary } from "skia-canvas";
import {globSync} from 'fast-glob'
import { join } from "path";

export function registerFont(name: string, path?: string) {
  if (!path) {
    path = join(__dirname, `../resources/fonts/${name}.ttf`);
  } 

  FontLibrary.use(name, globSync(path));
}
