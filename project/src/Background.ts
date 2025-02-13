import * as PIXI from "pixi.js";

const WIDTH: number = 1280;
const HEIGHT: number = 720;

export class Background extends PIXI.Container {
    private _app: PIXI.Application;

    constructor(app: any) {
        super();

        this._app = app;

        this.onLoad();
    }

    private onLoad() {
        this.createBackground();
        this.eventListeners();
    }

    private createBackground() {
        let background = PIXI.Sprite.from("background");
        background.label = "Background";
        background.width = WIDTH;
        background.height = HEIGHT;
        background.anchor.set(0.5, 0.5);
        background.position.set(WIDTH / 2, HEIGHT / 2);
        this.addChild(background);
    }

    private eventListeners() {

    }
}