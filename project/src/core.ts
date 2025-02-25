import * as PIXI from "pixi.js";
import { Background } from "./Background";
import { Machine } from "./Machine";
import { eventBus } from "./EventBus";
import { ASSETS, LANDSCAPE_RESULATION, ORIENTATIONS, PORTRAIT_RESULATION } from "./Configs";

globalThis.eventBus = eventBus;

export class core extends PIXI.Container {
    private _app: PIXI.Application;

    private _background: Background;
    private _machine: Machine;

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
            resolution: devicePixelRatio,
            backgroundColor: "White",
        });

        document.getElementById("Container")?.appendChild(this._app.canvas);

        await PIXI.Assets.load(ASSETS);
        await document.fonts.ready;

        this._background = new Background(this._app);
        this.addChild(this._background);

        this._machine = new Machine(this._app);
        this.addChild(this._machine);

        window.addEventListener("resize", this.onResize.bind(this));

        this.onResize();
    }

    /**
     * Handles window resize events and adjusts the canvas size accordingly.
     */
    private onResize(): void {
        const screenWidth = document.documentElement.clientWidth;
        const screenHeight = document.documentElement.clientHeight;
        const orientation = screenWidth > screenHeight ? ORIENTATIONS.landscape : ORIENTATIONS.portrait;

        let scale, enlargedWidth, enlargedHeight;

        switch (orientation) {
            case ORIENTATIONS.landscape:
                scale = Math.min(screenWidth / LANDSCAPE_RESULATION.width, screenHeight / LANDSCAPE_RESULATION.height);

                enlargedWidth = Math.floor(scale * LANDSCAPE_RESULATION.width);
                enlargedHeight = Math.floor(scale * LANDSCAPE_RESULATION.height);

                this._background.onResize(orientation, 1);
                this._machine.onResize(orientation, 1);

                this._machine.position.set(0, 0);
                break;
            case ORIENTATIONS.portrait:
                scale = Math.min(screenWidth / PORTRAIT_RESULATION.width, screenHeight / PORTRAIT_RESULATION.height);

                enlargedWidth = Math.floor(scale * PORTRAIT_RESULATION.width);
                enlargedHeight = Math.floor(scale * PORTRAIT_RESULATION.height);

                this._background.onResize(orientation, (PORTRAIT_RESULATION.height / PORTRAIT_RESULATION.width));
                this._machine.onResize(orientation, (PORTRAIT_RESULATION.width / PORTRAIT_RESULATION.height) * 0.55);

                this._machine.position.set(-255, 220);
                break;
        }

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