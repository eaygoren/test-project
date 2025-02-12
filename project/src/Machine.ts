import * as PIXI from "pixi.js";
import { Reels } from "./Reels";
import gsap from "gsap";

export class Machine extends PIXI.Container {
    private _app: PIXI.Application;

    constructor(app: any) {
        super();

        this._app = app;

        this.onLoad(5, 3);
    }

    public onLoad(col: number, row: number) {
        const reels = new Reels(this._app, col, row);
        this.addChild(reels);

        let spinButton = PIXI.Sprite.from("button");
        spinButton.label = "SpinButton";
        spinButton.anchor.set(0.5, 0.5);
        spinButton.scale.set(0.75, 0.75);
        spinButton.position.set(640, 640);
        spinButton.eventMode = "static";
        spinButton.cursor = "pointer";

        let buttonText = new PIXI.Text();
        buttonText.label = "ButtonText";
        buttonText.anchor.set(0.5, 0.5);
        buttonText.text = "SPIN";
        buttonText.style = {
            fontSize: 90,
            fontWeight: "700",
            align: "center",
            fill: "#FAFAFA",
            stroke: "blue"
        };
        buttonText.style._stroke.width = 6;
        spinButton.addChild(buttonText);

        spinButton.onpointerenter = () => {
            gsap.to(spinButton.scale, { x: 1, y: 1, duration: 0.25, ease: "expo.out" });
        }

        spinButton.onpointerout = () => {
            gsap.to(spinButton.scale, { x: 0.75, y: 0.75, duration: 0.25, ease: "expo.in" });
        }

        spinButton.onpointerup = () => {
           //globalThis.eventBus.emit("click")
            //spinButton.eventMode = "none";
            //spinButton.cursor = "default";
        }
        this.addChild(spinButton);
    }
}