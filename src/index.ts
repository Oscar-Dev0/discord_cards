import { registerFont } from "canvas";
import { join } from "path";

export * from "./image";

registerFont(join(__dirname, "../resources/fonts/Poppins-Bold.ttf"), { family: "poppins" });

registerFont(join(__dirname, "../resources/fonts/Fredoka-Bold.ttf"), { family: "fredoka" });

registerFont(join(__dirname, "../resources/fonts/NirmalaB.ttf"), { family: "Nirmala UI" });
