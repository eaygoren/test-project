import * as PIXI from "pixi.js";
import gsap from "gsap";
import { EventNames } from "./EventBus";

export class Popup extends PIXI.Container {
    private _app: PIXI.Application;

    private _popup: PIXI.Sprite;
    private _popupContent: PIXI.Text;

    constructor(app: any) {
        super();

        this._app = app;
        this.visible = false; // Initially hide the popup

        this.onLoad();
    }

    // Initialize the component by creating the popup and setting up event listeners
    private onLoad() {
        this.create();
        this.eventListeners();
    }

    // Create the popup sprite and content
    private create() {
        this._popup = PIXI.Sprite.from("popup");
        this._popup.label = "Popup";
        this._popup.anchor.set(0.5, 0.5);
        this._popup.scale.set(1.5, 1.5);
        this._popup.position.set(640, 300);
        this.addChild(this._popup);

        // Create the content for the popup
        this._popupContent = new PIXI.Text();
        this._popupContent.label = "PopupContent";
        this._popupContent.anchor.set(0.5, 0.5);
        this._popupContent.scale.set(0.7, 0.7);
        this._popupContent.position.set(0, -5);
        this._popupContent.text = "You have run out of credits to play the game.\nPlease lower your bet or refresh the page."; // Default message
        this._popupContent.style = {
            fontFamily: "TiltNeon",
            fontSize: 32,
            fontWeight: "700",
            align: "center",
            fill: "#FAFAFA",
            stroke: "black",
            letterSpacing: 1,
            wordWrap: true,
            wordWrapWidth: 400
        };
        this._popupContent.style._stroke.width = 3;
        this._popup.addChild(this._popupContent);
    }

    // Set up event listeners (empty for now, can be extended later)
    private eventListeners() { }

    // Display the popup with animation
    public showPopup() {
        gsap.fromTo(this._popup.scale, { x: 0, y: 0 }, {
            x: 1.5, y: 1.5, duration: 0.25, ease: "back.out(1)", onStart: () => {
                this.visible = true;
            }, onComplete: () => {
                gsap.to(this._popup.scale, {
                    x: 0, y: 0, duration: 0.25, ease: "back.in(1)", delay: 2, onComplete: () => {
                        this.visible = false;
                        globalThis.eventBus.emit(EventNames.PopupShown); // Emit an event that the popup has been shown
                    }
                });
            }
        });
    }
}