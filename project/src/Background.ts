import * as PIXI from "pixi.js";
import { ORIENTATIONS } from "./Configs";

export class Background extends PIXI.Container {
    private _app: PIXI.Application;

    private _background: PIXI.Sprite;

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
        this._background = PIXI.Sprite.from("background");
        this._background.label = "Background";
        this._background.width = this.WIDTH;
        this._background.height = this.HEIGHT;
        this._background.anchor.set(0.5, 0.5);
        this._background.position.set(this.WIDTH / 2, this.HEIGHT / 2);
        this.addChild(this._background);
    }

    /**
     * Defines event listeners for the background (Currently empty, can be expanded in the future).
     */
    private eventListeners() {

    }

    public onResize(orientation: ORIENTATIONS, size: number) {
        this.children.forEach(element => {
            element.scale.set(1 * (size), 1);
        });
    }
}