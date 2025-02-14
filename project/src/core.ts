import * as PIXI from "pixi.js";
import { Background } from "./Background";
import { Machine } from "./Machine";
import { eventBus } from "./EventBus";
import { ASSETS } from "./Configs";

globalThis.eventBus = eventBus;

const WIDTH: number = 1280;
const HEIGHT: number = 720;

export class core extends PIXI.Container {
    private _app: PIXI.Application;

    constructor() {
        super();

        this._app = new PIXI.Application();

        this._app.stage.addChild(this);

        (globalThis as any).__PIXI_APP__ = this._app;
    }

    async init() {
        await this._app.init({
            width: WIDTH,
            height: HEIGHT,
            backgroundColor: "White",
        });

        document.getElementById("Container")?.appendChild(this._app.canvas); 

        await PIXI.Assets.load(ASSETS);

        await document.fonts.ready;

        const background = new Background(this._app);
        this.addChild(background);

        const machine = new Machine(this._app);
        this.addChild(machine);

        window.addEventListener("resize", this.onResize.bind(this));

        this.onResize();
    }

    private onResize(): void {
        const screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        const screenHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

        const scale = Math.min(screenWidth / WIDTH, screenHeight / HEIGHT);

        const enlargedWidth = Math.floor(scale * WIDTH);
        const enlargedHeight = Math.floor(scale * HEIGHT);

        const horizontalMargin = (screenWidth - enlargedWidth) / 2;
        const verticalMargin = (screenHeight - enlargedHeight) / 2;

        this._app.canvas.style.width = `${enlargedWidth}px`;
        this._app.canvas.style.height = `${enlargedHeight}px`;
        this._app.canvas.style.marginLeft = this._app.canvas.style.marginRight = `${horizontalMargin}px`;
        this._app.canvas.style.marginTop = this._app.canvas.style.marginBottom = `${verticalMargin}px`;
    }

    public get app(): PIXI.Application {
        return this._app;
    }
}