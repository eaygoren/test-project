import * as PIXI from "pixi.js";
import { PAYOUT_POSITIONS, SYMBOLS } from "./Configs";

export class Payout extends PIXI.Container {
    private _app: PIXI.Application;

    private _background: PIXI.Sprite;
    private _isOpened: boolean = false; // Flag to track if the payout is currently open.
    private _bet: number; // Player's current bet.

    constructor(app: any) {
        super();

        this._app = app;

        this.onLoad();
    }

    // Initialize the component and setup event listeners
    private onLoad() {
        this.create();
        this.eventListeners();
    }

    // Create the payout background sprite
    private create() {
        this._background = PIXI.Sprite.from("payout");
        this._background.label = "PayoutBackground"; // Label for debugging purposes
        this._background.anchor.set(0.5, 0.5); // Set anchor for centering the sprite
        this._background.visible = false; // Initially, set the background to be hidden
        this.addChild(this._background);
    }

    // Set up event listeners (empty for now, can be extended later)
    private eventListeners() { }

    // Display the payout information based on the provided symbol index and reel/row positions
    public showPayout(data: { symbolIndex: number, reelIndex: number, rowIndex: number }) {
        if (this._isOpened) {
            this.hidePayout(); // Hide any existing payout display before showing a new one
        }

        this.eventMode = "static"; // Disable further interaction while payout is shown

        this._isOpened = true;

        this.createPayoutValues(data.symbolIndex); // Generate the payout values for the symbol

        // Set the position of the background based on the reel and row index
        this._background.position.set(PAYOUT_POSITIONS[data.reelIndex][data.rowIndex].x, PAYOUT_POSITIONS[data.reelIndex][data.rowIndex].y);
        this._background.visible = true; // Make the background visible
    }

    // Hide the payout display
    public hidePayout() {
        this._background.visible = false;
        this._background.removeChildren(); // Remove any children (values) from the background
        this._isOpened = false; // Set the opened flag to false
    }

    // Create and display the payout values for the symbol
    private createPayoutValues(index: number) {
        Object.entries(SYMBOLS[index].payout).forEach(([key, value], i) => {
            let payCounts = new PIXI.Text();
            payCounts.label = "PayCount"; // Label for debugging purposes
            payCounts.anchor.set(0.5, 0.5); // Center the text
            payCounts.position.set(-45, (-47 + (45 * i))); // Adjust position for each payout line
            payCounts.text = key.toString(); // Display the payout line key (e.g., "3 symbols")
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
            payAmounts.label = "PayAmount"; // Label for debugging purposes
            payAmounts.anchor.set(0.5, 0.5); // Center the text
            payAmounts.position.set(20, (-47 + (45 * i))); // Adjust position for each payout line
            payAmounts.text = (value * this._bet).toString() + " €"; // Display the payout amount (e.g., "50 €")
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

    // Getter to check if the payout is currently opened
    public get isOpened(): boolean {
        return this._isOpened;
    }

    public set bet(value: number) {
        if (this._bet == value) {
            return;
        }

        this._bet = value;;
    }
}