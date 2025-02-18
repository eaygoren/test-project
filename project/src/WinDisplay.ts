import * as PIXI from "pixi.js";
import { EventNames } from "./EventBus";
import gsap from "gsap";

export class WinDisplay extends PIXI.Container {
    private _app: PIXI.Application; // Reference to the PIXI application
    private _highlight: PIXI.Sprite; // Highlight sprite to show around the win amount
    private _winAmount: PIXI.Text; // Text element to display the win amount
    private _isWinDisplaying: boolean = false; // Flag to check if win display is active

    constructor(app: any) {
        super();

        this._app = app;

        this.onLoad(); // Calls the onLoad method after the object is created
    }

    // Initializes the win display, creates the highlight and win amount elements
    private onLoad() {
        this.create(); // Creates the necessary elements
        this.eventListeners(); // Sets up any event listeners (none in this case)
    }

    // Creates the highlight sprite and win amount text
    private create() {
        // Create the highlight sprite
        this._highlight = PIXI.Sprite.from("highlight"); // Uses "highlight" texture
        this._highlight.label = "Highlight"; // Assigns a label to the sprite
        this._highlight.anchor.set(0.5, 0.5); // Centers the anchor point of the sprite
        this._highlight.position.set(640, 300); // Sets position on screen
        this._highlight.alpha = 0.3; // Makes the sprite semi-transparent
        this._highlight.visible = false; // Initially, the highlight is not visible
        this.addChild(this._highlight); // Adds the highlight to the container

        // Create the win amount text
        this._winAmount = new PIXI.Text();
        this._winAmount.label = "WinAmount"; // Assigns a label to the text
        this._winAmount.anchor.set(0.5, 0.5); // Centers the anchor point of the text
        this._winAmount.position.set(640, 300); // Sets the position on screen
        this._winAmount.text = "500 €"; // Default text value
        this._winAmount.style = {
            fontFamily: "TiltNeon", // Font used for the text
            fontSize: 120, // Font size of the text
            fontWeight: "900", // Text weight
            align: "center", // Aligns text to the center
            fill: "#F8E7F6", // Text color
            stroke: "#4B164C", // Stroke color around text
            letterSpacing: 1 // Space between letters
        };
        this._winAmount.style._stroke.width = 5; // Sets stroke width
        this._winAmount.visible = false; // Initially, the win amount text is not visible
        this.addChild(this._winAmount); // Adds the win amount text to the container
    }

    // Placeholder for event listeners (none used currently)
    private eventListeners() { 
        
    }

    // Displays the win amount with animation
    public showWin(amount: number) {
        this._isWinDisplaying = true;

        // Animate the scale of the highlight and win amount
        gsap.fromTo([this._highlight.scale, this._winAmount.scale], { x: 0, y: 0 }, {
            x: 1, y: 1, duration: 0.25, ease: "back.out(1)", onStart: () => {
                this._winAmount.text = (amount + " €").toString(); // Sets the win amount text
                this._highlight.visible = true; // Makes the highlight visible
                this._winAmount.visible = true; // Makes the win amount text visible
            }, onComplete: () => {
                // After the animation completes, animate the elements shrinking and hiding
                gsap.to([this._highlight.scale, this._winAmount.scale], {
                    x: 0, y: 0, duration: 0.25, ease: "back.in(1)", delay: 2, onComplete: () => {
                        this._highlight.visible = false; // Hides the highlight
                        this._winAmount.visible = false; // Hides the win amount text
                        this._winAmount.text = ""; // Resets the win amount text

                        globalThis.eventBus.emit(EventNames.WinShown, amount); // Emit event that the win is shown
                        this._isWinDisplaying = false; // Reset the display flag
                    }
                });
            }
        });
    }

    // Getter to check if the win is currently being displayed
    public get isWinDisplaying(): boolean {
        return this._isWinDisplaying;
    }
}