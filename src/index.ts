import { registerFont } from "canvas";
import { join } from "path";

export * from "./image";

registerFont(join(__dirname, "../resources/fonts/Poppins-Bold.ttf"), {
  family: "Poppins Bold",
});

registerFont(join(__dirname, "../resources/fonts/Fredoka-Bold.ttf"), {
  family: "Fredoka Bold",
});

registerFont(join(__dirname, "../resources/fonts/NirmalaB.ttf"), {
  family: "Nirmala UI",
});
