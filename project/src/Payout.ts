import * as PIXI from "pixi.js";
import gsap from "gsap";
import { PAYOUT_POSITIONS, SYMBOLS } from "./Configs";
import { EventNames } from "./EventBus";

export class Payout extends PIXI.Container {
    private _app: PIXI.Application;

    private _background: PIXI.Sprite;
    private _isOpened: boolean = false;
    private _symbolIndex: number;
    private _reelIndex: number;
    private _rowIndex: number;

    constructor(app: any) {
        super();

        this._app = app;

        this.onLoad();
    }

    private onLoad() {
        this.create();
        this.eventListeners();
    }

    private create() {
        this._background = PIXI.Sprite.from("payout");
        this._background.label = "PayoutBackground";
        this._background.anchor.set(0.5, 0.5);
        this._background.visible = false;
        this.addChild(this._background);
    }

    private eventListeners() {

    }

    public showPayout(data: { symbolIndex: number, reelIndex: number, rowIndex: number }) {
        if (this._isOpened) {
            this.hidePayout();
        }
        this._symbolIndex = data.symbolIndex;
        this._reelIndex = data.reelIndex;
        this._rowIndex = data.rowIndex;

        this.eventMode = "static";

        this._isOpened = true;

        this.createPayoutValues(data.symbolIndex);

        this._background.position.set(PAYOUT_POSITIONS[data.reelIndex][data.rowIndex].x, PAYOUT_POSITIONS[data.reelIndex][data.rowIndex].y);
        this._background.visible = true;
    }

    public hidePayout() {
        this._background.visible = false;
        this._background.removeChildren();

        this._isOpened = false;
    }

    private createPayoutValues(index: number) {
        Object.entries(SYMBOLS[index].payout).forEach(([key, value], i) => {
            let payCounts = new PIXI.Text();
            payCounts.label = "PayCount";
            payCounts.anchor.set(0.5, 0.5);
            payCounts.position.set(-45, (-47 + (45 * i)));
            payCounts.text = key.toString();
            payCounts.style = {
                fontFamily: "TiltNeon",
                fontSize: 40,
                fontWeight: "700",
                align: "center",
                fill: "#FAFAFA",
                stroke: "black",
                letterSpacing: 1
            };
            payCounts.style._stroke.width = 3;
            this._background.addChild(payCounts);

            let payAmounts = new PIXI.Text();
            payAmounts.label = "PayAmount";
            payAmounts.anchor.set(0.5, 0.5);
            payAmounts.position.set(20, (-47 + (45 * i)));
            payAmounts.text = value.toString() + " €";
            payAmounts.style = {
                fontFamily: "TiltNeon",
                fontSize: 30,
                fontWeight: "700",
                align: "center",
                fill: "#FAFAFA",
                stroke: "black",
                letterSpacing: 1
            };
            payAmounts.style._stroke.width = 3;
            this._background.addChild(payAmounts);
        });
    }

    public get isOpened(): boolean {
        return this._isOpened;
    }

    public get symbolIndex(): number {
        return this._symbolIndex;
    }

    public get reelIndex(): number {
        return this._reelIndex;
    }

    public get rowIndex(): number {
        return this._rowIndex;
    }
}