import axios from "axios";
import { loadImage } from "canvas";

async function imageUrlToBufer(url: string) {
  if (/^data:image\/png;base64,([A-Za-z0-9+/=]+)$/.test(url)) url;
  if (!/^\s*https?:\/\//.test(url)) return undefined;
  try {
    // Obtén la imagen desde la URL
    const response = await axios.get(url, {
      responseType: "arraybuffer", // Obtiene los datos de la imagen como un buffer
    });

    // Convierte el buffer a base64
    const base64 = Buffer.from(response.data, "binary").toString("base64");

    // Crea un string en formato data URL
    const mimeType = response.headers["content-type"];
    const base64Image = `data:${mimeType};base64,${base64}`;

    return base64Image;
  } catch (error) {
    return undefined;
  }
}

export default async function getImagen(url: string) {
  const image = await imageUrlToBufer(url);
  if (image) {
    return loadImage(image);
  } else {
    return loadImage("https://i.imgur.com/eYlmEGN.png");
  }
}
