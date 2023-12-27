import { createCanvas, loadImage } from "canvas";
import { circleImage, fillRoundRect } from "../utils";

/**
 * Modifica una tarjeta de miembro de Discord
 * ```js
 * const card = new MemberCard()
 * .setUsername("User#0000")
 *
 * card.render()
 * .then((buffer) => {
 *  attachment.file(buffer, "image.png");
 * });
 * ```
 */

export class MemberCard {
  private username: string;
  private title: string;
  private description: string;
  private memberCount: string;
  private colors: {
    title: string;
    description: string;
    username: string;
    stroke: string;
    box: string;
    memberCount: string;
  };
  private avatar: string;
  private background: string;
  private box: boolean;
  private radius: number;
  private fonts: {
    usernameFont: string;
    titleFont: string;
    descriptionFont: string;
    memberCountFont: string;
  };

  /**
   * Los datos se pueden ingresar si lo deseas en forma de [object]
   * @param  [data]? Recomiendo hacerlo con los métodos.
   */
  constructor(data?: CardMemberData) {
    this.username = data?.username || "Unknown#0000";
    this.title = data?.title || "WELCOME";
    this.description = data?.description || "A new user";
    this.memberCount = `#${data?.memberCount || 150}`;

    this.colors = data?.colors || {
      title: "#ffffff",
      description: "#ffffff",
      username: "#ffffff",
      stroke: "#ffffff",
      box: "#0d0d0d",
      memberCount: "#ffffff",
    };

    this.avatar =
      data?.avatar ||
      "https://i.pinimg.com/736x/c6/a8/5f/c6a85f7dbcbf367d5dc1baa2aaa19a73.jpg";
    this.background =
      data?.background ||
      "https://img.freepik.com/foto-gratis/fondo-azul-degradado-lujo-abstracto-azul-oscuro-liso-banner-estudio-vineta-negra_1258-52379.jpg";

    this.box = data?.box ?? true;
    this.radius = data?.radius || 15;

    this.fonts = data?.fonts || {
      usernameFont: "Nirmala UI",
      titleFont: "Poppins Bold",
      descriptionFont: "Poppins Bold",
      memberCountFont: "Poppins Bold",
    };
  }

  /**
   * @param username nombre del usuario
   * @param [color] color del nombre del usuario
   * @param [font] Fuente de letra
   */
  setUsername(username: string, color?: string, font?: string) {
    if (typeof username !== "string") {
      throw new Error(
        `El nombre /*username/* no está ingresado en tipo string, en su lugar se ingresó: ${typeof username}`,
      );
    }
    this.username = username;
    if (color) this.colors.username = color;
    if (font) this.fonts.usernameFont = font;
    return this;
  }

  /**
   * @param title Título de la tarjeta
   * @param [color] Color del título
   * @param [font] Fuente de letra
   */
  setTitle(title: string, color?: string, font?: string) {
    if (typeof title !== "string") {
      throw new Error(
        `El título /*title/* no está ingresado en tipo string, en su lugar se ingresó: ${typeof title}`,
      );
    }
    this.title = title;
    if (color) this.colors.title = color;
    if (font) this.fonts.titleFont = font;
    return this;
  }

  /**
   * @param description Descripción de la tarjeta
   * @param [color] Color de la descripción
   * @param [font] Fuente de letra
   */
  setDescription(description: string, color?: string, font?: string) {
    if (typeof description !== "string") {
      throw new Error(
        `La descripción /*description/* no está ingresado en tipo string, en su lugar se ingresó: ${typeof description}`,
      );
    }
    this.description = description;
    if (color) this.colors.description = color;
    if (font) this.fonts.descriptionFont = font;
    return this;
  }

  /**
   * @param memberCount Miembros del servidor
   * @param [color] Color del texto
   * @param [font] Fuente de letra
   */
  setMemberCount(memberCount: number, color?: string, font?: string) {
    if (typeof memberCount !== "number") {
      throw new Error(
        `El número de miembros /*memberCount/* no está ingresado en tipo number, en su lugar se ingresó: ${typeof memberCount}`,
      );
    }
    this.memberCount = `#${memberCount}`;
    if (color) this.colors.memberCount = color;
    if (font) this.fonts.memberCountFont = font;
    return this;
  }

  /**
   * @param background url de la imagen de fondo
   * @param [radius] cambia el radio de la imágen de fondo
   */
  setBackground(background: string, radius?: number) {
    if (typeof background !== "string") {
      throw new Error(
        `El background no está ingresado en tipo string, en su lugar se ingresó: ${typeof background}`,
      );
    }
    this.background = background;
    if (typeof radius !== "number") {
      throw new Error(
        `El radius no está ingresado en tipo number, en su lugar se ingresó: ${typeof radius}`,
      );
    }
    if (radius) this.radius = radius;
    return this;
  }

  /**
   * @param avatar url de la imagen de avatar
   * @param [color] color del borde de la imagen de avatar
   */
  setAvatar(avatar: string, color?: string) {
    if (typeof avatar !== "string") {
      throw new Error(
        `El avatar no está ingresado en tipo string, en su lugar se ingresó: ${typeof avatar}`,
      );
    }
    this.avatar = avatar;
    if (color) this.colors.stroke = color;
    return this;
  }

  /**
   * @param box activa o desactiva el borde de la tarjeta
   * @param [color] color de la caja
   */
  setBox(box: boolean, color?: string) {
    if (typeof box !== "boolean") {
      throw new Error(
        `El box no está ingresado en tipo boolean, en su lugar se ingresó: ${typeof box}`,
      );
    }
    this.box = box;
    if (color) this.colors.box = color;
    return this;
  }

  /** Construye la tarjeta de niveles */
  async render(): Promise<Buffer> {
    const canvas = createCanvas(1260, 620);
    const ctx = canvas.getContext("2d");

    ctx.save();
    const Fondo = await loadImage(this.background);
    fillRoundRect(ctx, 0, 0, canvas.width, canvas.height, this.radius);
    ctx.clip();
    try {
      ctx.drawImage(Fondo, -10, -50, 1280, 720);
    } catch {
      ctx.drawImage(
        await loadImage(
          "https://img.freepik.com/foto-gratis/fondo-azul-degradado-lujo-abstracto-azul-oscuro-liso-banner-estudio-vineta-negra_1258-52379.jpg",
        ),
        -10,
        -50,
        1280,
        720,
      );
    }
    ctx.restore();

    if (this.box) {
      ctx.save();
      ctx.fillStyle = this.colors.box;
      ctx.globalAlpha = 0.5;
      fillRoundRect(ctx, 63, 50, 1134, 520, 10, true);
      ctx.globalAlpha = 1;
      ctx.fillStyle = this.colors.memberCount;
      ctx.font = `45px "${this.fonts.memberCountFont}"`;
      ctx.textAlign = "right";
      ctx.fillText(this.memberCount, 1150, 120, 430);
      ctx.restore();
    } else {
      ctx.save();
      ctx.shadowColor = "#0a0a0a";
      ctx.shadowOffsetY = 8;
      ctx.shadowOffsetX = -6;
      ctx.shadowBlur = 8;
      ctx.fillStyle = this.colors.memberCount;
      ctx.font = `45px "${this.fonts.memberCountFont}"`;
      ctx.textAlign = "right";
      ctx.fillText(this.memberCount, 1200, 80, 430);
      ctx.restore();
    }

    ctx.save();
    ctx.strokeStyle = this.colors.stroke;
    ctx.lineWidth = 15;

    circleImage(ctx, 500, 90, 260, 260, false, true);

    circleImage(ctx, 520, 110, 220, 220);
    ctx.clip();
    const Avatar = await loadImage(this.avatar);
    try {
      ctx.drawImage(Avatar, 520, 110, 220, 220);
    } catch {
      ctx.drawImage(
        await loadImage(
          "https://i.pinimg.com/736x/c6/a8/5f/c6a85f7dbcbf367d5dc1baa2aaa19a73.jpg",
        ),
        520,
        110,
        220,
        220,
      );
    }
    ctx.restore();

    ctx.shadowColor = "#0a0a0a";
    ctx.shadowOffsetY = 8;
    ctx.shadowOffsetX = -6;
    ctx.shadowBlur = 8;

    ctx.fillStyle = this.colors.title;
    ctx.font = `80px "${this.fonts.titleFont}"`;
    ctx.textAlign = "center";
    ctx.fillText(this.title, 642, 430, 1050);

    ctx.fillStyle = this.colors.username;
    ctx.font = `45px "${this.fonts.usernameFont}"`;
    ctx.textAlign = "center";
    ctx.fillText(this.username, 642, 490, 1050);

    ctx.fillStyle = this.colors.description;
    ctx.font = `35px "${this.fonts.descriptionFont}"`;
    ctx.textAlign = "center";
    ctx.fillText(this.description, 642, 540, 1050);

    return canvas.toBuffer();
  }
}

interface CardMemberData {
  username?: string;
  title?: string;
  description?: string;
  memberCount?: number;
  colors?: {
    title: string;
    description: string;
    username: string;
    stroke: string;
    box: string;
    memberCount: string;
  };
  avatar?: string;
  background?: string;
  radius?: number;
  box?: boolean;
  fonts?: {
    usernameFont: string;
    titleFont: string;
    descriptionFont: string;
    memberCountFont: string;
  };
}
