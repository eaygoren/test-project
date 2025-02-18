import * as PIXI from "pixi.js";
import { Background } from "./Background";
import { Machine } from "./Machine";
import { eventBus } from "./EventBus";
import { ASSETS } from "./Configs";

globalThis.eventBus = eventBus;

export class core extends PIXI.Container {
    private _app: PIXI.Application;

    private readonly WIDTH: number = 1280;
    private readonly HEIGHT: number = 720;

    /**
     * Initializes the core class and creates a new PIXI application.
     */
    constructor() {
        super();

        this._app = new PIXI.Application();

        this._app.stage.addChild(this);

        (globalThis as any).__PIXI_APP__ = this._app;
    }

    /**
     * Asynchronous initialization of the core system, loading assets and setting up components.
     */
    async init() {
        await this._app.init({
            width: this.WIDTH,
            height: this.HEIGHT,
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

    /**
     * Handles window resize events and adjusts the canvas size accordingly.
     */
    private onResize(): void {
        const screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        const screenHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

        const scale = Math.min(screenWidth / this.WIDTH, screenHeight / this.HEIGHT);

        const enlargedWidth = Math.floor(scale * this.WIDTH);
        const enlargedHeight = Math.floor(scale * this.HEIGHT);

        const horizontalMargin = (screenWidth - enlargedWidth) / 2;
        const verticalMargin = (screenHeight - enlargedHeight) / 2;

        this._app.canvas.style.width = `${enlargedWidth}px`;
        this._app.canvas.style.height = `${enlargedHeight}px`;
        this._app.canvas.style.marginLeft = this._app.canvas.style.marginRight = `${horizontalMargin}px`;
        this._app.canvas.style.marginTop = this._app.canvas.style.marginBottom = `${verticalMargin}px`;
    }

    /**
     * Getter for accessing the PIXI application instance.
     */
    public get app(): PIXI.Application {
        return this._app;
    }
}