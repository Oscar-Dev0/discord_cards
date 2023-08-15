import { createCanvas, loadImage, registerFont } from 'canvas';
import { abbreviateNumber, fillRoundRect } from '../utils';
import { join } from 'path';

interface ColorsData {
    bar?: string | { hex: string, position: number }[];
    stroke?: string;
    username: string;
    nickname: string;
    rank: string;
    level: string;
    xp: string;
};

interface ImagesData {
    avatar: string;
    background: string;
};

interface FontsData {
    usernameFont: string;
    nicknameFont: string;
    rankFont: string;
    levelFont: string;
    xpFont: string;
};

interface CardLevelData {
    username?: string;
    nickname?: string;
    rank?: number | string;
    level?: number;
    xp?: { current: number; max: number };
    colors?: ColorsData;
    images?: ImagesData;
    fonts?: FontsData;
    blur?: number;
    radius?: number;
    levelText?: string;
    rankText?: string;
    xpText?: string;
};

/**
 * Modifica una tarjeta de ranking o niveles de un usuario.
 * ```js
 * const card = new Level()
 * .setLevel(1)
 * .setUsername("User#0000")
 * 
 * card.render()
 * .then((buffer) => {
 *  attachment.file(buffer, "image.png");
 * });
 * ```
 */
export class Level {
    private username: string;
    private nickname: string;
    private rank: number | string;
    private level: number;
    private xp: { current: number; max: number };
    private colors: ColorsData;
    private images: ImagesData;
    private fonts: FontsData;
    private radius: number;
    private levelText: string;
    private rankText: string;
    private xpText: string;

    constructor(data?: CardLevelData) {
        this.username = data?.username || "Username#0000";
        this.nickname = data?.nickname || "@developer";
        this.rank = data?.rank || 1;
        this.level = data?.level || 1;
        this.xp = data?.xp || { current: 30, max: 100 };
        this.colors = data?.colors || {
            bar: "#ffffff",
            stroke: "#ffffff",
            username: "#ffffff",
            nickname: "#ffffff",
            rank: "#ffffff",
            level: "#ffffff",
            xp: "#ffffff"
        };
        this.images = data?.images || {
            avatar: "https://i.pinimg.com/736x/c6/a8/5f/c6a85f7dbcbf367d5dc1baa2aaa19a73.jpg",
            background: "https://img.freepik.com/foto-gratis/fondo-azul-degradado-lujo-abstracto-azul-oscuro-liso-banner-estudio-vineta-negra_1258-52379.jpg"
        };
        this.fonts = data?.fonts || {
            usernameFont: "Nirmala UI",
            nicknameFont: "Nirmala UI",
            rankFont: "Fredoka Bold",
            levelFont: "Fredoka Bold",
            xpFont: "Fredoka Bold"
        };
        this.radius = data?.radius || 25;

        this.levelText = "Level {level}";
        this.xpText = "XP: {current} / {max}";
        this.rankText = "#{rank}";

        this.registerFonts();
    };

    /**
    * 
    * @param font Datos de la fuente de letra
    */
    private registerFonts(font?: { path: string; options: { family: string; weight?: string; style?: string } }[]): this {
        if (font && font?.length > 0) {
            font.forEach((f) => {
                registerFont(f.path, f.options);
            });
        }
        return this;
    };

    /**
     * @param username nombre del usuario
     * @param [color] color del nombre del usuario
     * @param [font] Fuente de letra
     */
    public setUsername(username: string, color?: string, font?: string): this {
        if (typeof username !== "string") throw new Error(`El nombre /*username/* no está ingresado en tipo string, en su lugar se ingresó: ${typeof username}`);
        this.username = username;
        if (color) this.colors.username = color;
        if (font) this.fonts.usernameFont = font;
        return this;
    };

    /**
     * @param nickname nickname del usuario
     * @param [color] color del nickname del usuario
     * @param [font] Fuente de letra
    */
    public setNickname(nickname: string, color?: string, font?: string): this {
        if (typeof nickname !== "string") throw new Error(`El apodo /*nickname/* no está ingresado en tipo string, en su lugar se ingresó: ${typeof nickname}`);
        this.nickname = nickname;
        if (color) this.colors.nickname = color;
        if (font) this.fonts.nicknameFont = font;
        return this;
    };

    /**
     * @param  rank rank del usuario
     * @param [color] color del rank del usuario
     * @param [text] texto del rank del usuario
     * @param [font] Fuente de letra
     */
    public setRank(rank: number | string, color?: string, text?: string, font?: string): this {
        if (typeof rank !== "number" && typeof rank !== "string") throw new Error(`El rank no está ingresado en tipo number o string, en su lugar se ingresó: ${typeof rank}`);
        this.rank = rank;
        if (color) this.colors.rank = color;
        if (text) this.rankText = text;
        if (font) this.fonts.rankFont = font;
        return this;
    };

    /**
     * @param level nivel del usuario
     * @param [color] color del nivel del usuario
     * @param [text] texto del nivel del usuario
     * @param [font] Fuente de letra
     */
    public setLevel(level: number, color?: string, text?: string, font?: string): this {
        if (typeof level !== "number") throw new Error(`El nivel no está ingresado en tipo number, en su lugar se ingresó: ${typeof level}`);
        this.level = level;
        if (color) this.colors.level = color;
        if (text) this.levelText = text;
        if (font) this.fonts.levelFont = font;
        return this;
    };

    /**
     * @param xp experiencia actual del usuario
     * @param max experiencia requerida
     * @param [color] color del xp del usuario
     * @param [text] texto del xp del usuario
     * @param [font] Fuente de letra
     */
    public setXp(xp: number, max: number, color?: string, text?: string, font?: string): this {
        if (typeof xp !== "number") throw new Error(`El xp no está ingresado en tipo number, en su lugar se ingresó: ${typeof xp}`);
        if (typeof max !== "number") throw new Error(`El maximo de xp no está ingresado en tipo number, en su lugar se ingresó: ${typeof max}`);

        if (xp > max) throw new Error(`La experiencia actual no puede ser mayor a la experiencia requerida, ${xp} > ${max}`);
        this.xp = { current: xp, max: max };
        if (color) {
            if (typeof color !== "string") throw new Error(`El color del xp no está ingresado en tipo string, en su lugar se ingresó: ${typeof color}`);
            this.colors.xp = color;
        }
        if (text) {
            if (typeof text !== "string") throw new Error(`El texto del xp no está ingresado en tipo string, en su lugar se ingresó: ${typeof text}`);
            this.xpText = text;
        }
        if (font) {
            if (typeof font !== "string") throw new Error(`La fuente del xp no está ingresado en tipo string, en su lugar se ingresó: ${typeof font}`);
            this.fonts.xpFont = font;
        }
        return this;
    };


    public setCurrentBarColor(color: string | { hex: string, position: number }[]): this {
        if (typeof color !== "string" && !Array.isArray(color)) throw new Error(`El color de la barra no está ingresado en tipo string o array, en su lugar se ingresó: ${typeof color}`);
        this.colors.bar = color;
        return this;
    };

    /**
     * @param avatar url de la imagen de avatar
     * @param [color] color del borde de la imagen de avatar
     */
    public setAvatar(avatar: string, color?: string): this {
        if (typeof avatar !== "string") throw new Error(`El avatar no está ingresado en tipo string, en su lugar se ingresó: ${typeof avatar}`);
        this.images.avatar = avatar;
        if (color) this.colors.stroke = color;
        return this;
    };

    /**
     * @param background url de la imagen de fondo
     * @param [radius] cambia la intensidad del curveado de la imágen de fondo
     */
    public setBackground(background: string, radius?: number): this {
        if (typeof background !== "string") throw new Error(`El background no está ingresado en tipo string, en su lugar se ingresó: ${typeof background}`);
        this.images.background = background;
        if (typeof radius !== "number") throw new Error(`El radius no está ingresado en tipo number, en su lugar se ingresó: ${typeof radius}`);
        if (radius) this.radius = radius;
        return this;
    };

    /** Construye la tarjeta de niveles */
    public async render(): Promise<Buffer> {
        const canvas = createCanvas(1020, 320);
        const ctx = canvas.getContext("2d");

        ctx.save();
        const Fondo = await loadImage(this.images.background);
        fillRoundRect(ctx, 0, 0, canvas.width, canvas.height, this.radius, true);
        ctx.clip();
        try {
            ctx.drawImage(Fondo, -30, -120, 1085, 555);
        } catch {
            ctx.drawImage(await loadImage("https://img.freepik.com/foto-gratis/fondo-azul-degradado-lujo-abstracto-azul-oscuro-liso-banner-estudio-vineta-negra_1258-52379.jpg"), -30, -120, 1085, 555)
        };

        ctx.restore();

        ctx.save();
        const Avatar = await loadImage(this.images.avatar);
        ctx.strokeStyle = this.colors.stroke ?? "";
        ctx.lineWidth = 12;
        ctx.fillStyle = this.colors.stroke ?? "";
        fillRoundRect(ctx, 35, 25, 200, 200, 35, true, true);
        ctx.shadowBlur = 8;
        ctx.shadowColor = "#0a0a0a";
        ctx.shadowOffsetY = 8;
        ctx.shadowOffsetX = -6;
        ctx.clip();
        try {
            ctx.drawImage(Avatar, 35, 25, 200, 200);
        } catch {
            ctx.drawImage(await loadImage("https://i.pinimg.com/736x/c6/a8/5f/c6a85f7dbcbf367d5dc1baa2aaa19a73.jpg"), 35, 25, 200, 200);
        };
        ctx.restore();

        ctx.save();
        ctx.fillStyle = "#ffffff";
        ctx.globalAlpha = 0.45;
        ctx.shadowBlur = 30;
        ctx.shadowColor = "#ffffff";
        fillRoundRect(ctx, 35, 250, 950, 45, 10, true, false);
        let xp = this.xp.current;
        let max_xp = this.xp.max;
        const percentLvl = (xp * 100) / max_xp;
        const progressLvl = (percentLvl * 950) / 100;
        ctx.clip();
        if (typeof this.colors.bar === "object") {
            let gradient = ctx.createLinearGradient(0, 0, progressLvl, 320);
            for (let i = 0; i < this.colors.bar.length; i++) {
                gradient.addColorStop(this.colors.bar[i].position, this.colors.bar[i].hex);
            }
            ctx.fillStyle = gradient;
        } else ctx.fillStyle = this.colors.bar ?? "";
        ctx.globalAlpha = 0.65;
        fillRoundRect(ctx, 35, 250, progressLvl, 45, 0, true, false);
        ctx.restore();

        var rankText = this.rankText;
        var levelText = this.levelText;
        var xpText = this.xpText;

        ctx.shadowColor = "#0a0a0a";
        ctx.shadowOffsetY = 8;
        ctx.shadowOffsetX = -6;
        ctx.shadowBlur = 8;

        ctx.font = `50px "${this.fonts.usernameFont}"`;
        ctx.fillStyle = this.colors.username;
        ctx.textAlign = "left";
        ctx.fillText(this.username, 265, 70, 570);

        ctx.font = `30px "${this.fonts.nicknameFont}"`;
        ctx.fillStyle = this.colors.nickname;
        ctx.textAlign = "left";
        ctx.fillText(this.nickname, 265, 110, 270);

        ctx.font = `55px "${this.fonts.levelFont}"`;
        ctx.fillStyle = this.colors.level;
        ctx.textAlign = "left";
        ctx.fillText(levelText
            .replace(/{level}/g, String(this.level))
            .toUpperCase(), 270, 230, 385);

        ctx.font = `40px "${this.fonts.rankFont}"`;
        ctx.fillStyle = this.colors.rank;
        ctx.textAlign = "right";
        ctx.fillText(rankText
            .replace(/{rank}/g, String(this.rank)), 965, 65, 570);

        ctx.font = `35px "${this.fonts.xpFont}"`;
        ctx.fillStyle = this.colors.xp;
        ctx.textAlign = "right";
        ctx.fillText(xpText
            .replace(/{current}/g, abbreviateNumber(this.xp.current))
            .replace(/{max}/g, abbreviateNumber(this.xp.max)), 965, 230, 400);

        return canvas.toBuffer();
    };
};