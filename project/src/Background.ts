import * as PIXI from "pixi.js";

export class Background extends PIXI.Container {
    private _app: PIXI.Application;

    private readonly WIDTH: number = 1280;
    private readonly HEIGHT: number = 720;

    /**
     * Creates a background class instance.
     * @param app - PixiJS application instance.
     */
    constructor(app: any) {
        super();

        this._app = app;

        this.onLoad();
    }

    /**
     * Initializes the background loading process.
     */
    private onLoad() {
        this.create();
        this.eventListeners();
    }

    /**
     * Creates the background sprite and adds it to the scene.
     */
    private create() {
        let background = PIXI.Sprite.from("background");
        background.label = "Background";
        background.width = this.WIDTH;
        background.height = this.HEIGHT;
        background.anchor.set(0.5, 0.5);
        background.position.set(this.WIDTH / 2, this.HEIGHT / 2);
        this.addChild(background);
    }

    /**
     * Defines event listeners for the background (Currently empty, can be expanded in the future).
     */
    private eventListeners() {

    }
}