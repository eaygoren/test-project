import * as PIXI from "pixi.js";
import gsap from "gsap";
import { EventNames } from "./EventBus";
import { BET_COMMANDS, BET_RANGE } from "./Configs";
import { Reels } from "./Reels";
import { WinDisplay } from "./WinDisplay";
import { Popup } from "./Popup";
import { Payout } from "./Payout";

// The Machine class extends PIXI.Container and represents a slot machine game.
export class Machine extends PIXI.Container {
    private _app: PIXI.Application;  // The PIXI Application instance

    private _reels: Reels;  // The slot reels
    private _winDisplay: WinDisplay;  // Displays the win results
    private _payout: Payout;  // Shows the payout
    private _popup: Popup;  // Displays a popup for certain conditions

    // Constants defining the machine's structure and initial values
    private readonly COL_LENGTH = 5;  // Number of columns in the reels
    private readonly ROW_LENGTH = 3;  // Number of rows in the reels
    private readonly INITIAL_CREDIT: number = 50000;  // Initial credit amount
    private readonly INITIAL_BET: number = BET_RANGE[BET_RANGE.length - 1];  // Initial bet amount

    private _interface: PIXI.Sprite;  // The interface sprite
    private _credit: PIXI.Text;  // The text displaying the credit amount
    private _creditAmount: number = this.INITIAL_CREDIT;  // The current credit amount
    private _bet: PIXI.Text;  // The text displaying the bet amount
    private _betAmount: number = this.INITIAL_BET;  // The current bet amount
    private _betIndex: number = BET_RANGE.length - 1;  // The index of the current bet range
    private _spinButton: PIXI.Sprite;  // The spin button
    private _buttonText: PIXI.Text;  // Text on the spin button
    private _plusButton: PIXI.Sprite;  // Button to increase the bet
    private _minusButton: PIXI.Sprite;  // Button to decrease the bet

    constructor(app: any) {
        super();  // Call the parent class constructor

        this._app = app;  // Assign the app instance

        this.onLoad(this.COL_LENGTH, this.ROW_LENGTH);  // Initialize the machine with column and row lengths
    }

    // This method loads the machine's components and sets up event listeners
    private onLoad(col: number, row: number) {
        this.create(col, row);  // Create the machine components
        this.eventListeners();  // Set up event listeners for user interaction
    }

    // This method creates all the components of the machine, including reels, buttons, labels, and display elements
    private create(col: number, row: number) {
        // Create and add the reels component
        this._reels = new Reels(this._app, col, row);
        this.addChild(this._reels);

        // Create and add the win display component
        this._winDisplay = new WinDisplay(this._app);
        this.addChild(this._winDisplay);

        // Interface background
        let interfaceBackground = new PIXI.Graphics().beginPath().roundRect(335, 590, 610, 100, 35).fill({ color: "red", alpha: 0.5 }).closePath();
        interfaceBackground.label = "InterfaceBackground";
        this.addChild(interfaceBackground);

        // Interface sprite setup
        this._interface = PIXI.Sprite.from("interface");
        this._interface.label = "Interface";
        this._interface.anchor.set(0.5, 0.5);
        this._interface.scale.set(1.2, 1.2);
        this._interface.position.set(640, 640);
        interfaceBackground.addChild(this._interface);

        // Create the credit label and display text
        let creditLabel = new PIXI.Text();
        creditLabel.label = "CreditLabel";
        creditLabel.anchor.set(0.5, 0.5);
        creditLabel.position.set(-180, -20);
        creditLabel.text = "Credits";
        creditLabel.style = {
            fontFamily: "TiltNeon",
            fontSize: 25,
            fontWeight: "700",
            align: "center",
            fill: "#FAFAFA",
            stroke: "black",
            letterSpacing: 1
        };
        creditLabel.style._stroke.width = 3;
        this._interface.addChild(creditLabel);

        // Display the credit amount
        this._credit = new PIXI.Text();
        this._credit.label = "CreditAmount";
        this._credit.anchor.set(0.5, 0.5);
        this._credit.position.set(-180, 15);
        this._credit.text = this.INITIAL_CREDIT.toString();
        this._credit.style = {
            fontFamily: "TiltNeon",
            fontSize: 30,
            fontWeight: "700",
            align: "center",
            fill: "#FAFAFA",
            stroke: "black",
            letterSpacing: 1
        };
        this._credit.style._stroke.width = 3;
        this._interface.addChild(this._credit);

        // Create the bet label and display text
        let betLabel = new PIXI.Text();
        betLabel.label = "BetLabel";
        betLabel.anchor.set(0.5, 0.5);
        betLabel.position.set(180, -20);
        betLabel.text = "Bet";
        betLabel.style = {
            fontFamily: "TiltNeon",
            fontSize: 25,
            fontWeight: "700",
            align: "center",
            fill: "#FAFAFA",
            stroke: "black",
            letterSpacing: 1
        };
        betLabel.style._stroke.width = 3;
        this._interface.addChild(betLabel);

        // Display the bet amount
        this._bet = new PIXI.Text();
        this._bet.label = "BetAmount";
        this._bet.anchor.set(0.5, 0.5);
        this._bet.position.set(180, 15);
        this._bet.text = this.INITIAL_BET.toString();
        this._bet.style = {
            fontFamily: "TiltNeon",
            fontSize: 30,
            fontWeight: "700",
            align: "center",
            fill: "#FAFAFA",
            stroke: "black",
            letterSpacing: 1
        };
        this._bet.style._stroke.width = 3;
        this._interface.addChild(this._bet);

        // Add plus and minus buttons for adjusting the bet amount
        this._plusButton = PIXI.Sprite.from("plus");
        this._plusButton.label = "PlusButton";
        this._plusButton.anchor.set(0.5, 0.5);
        this._plusButton.position.set(220, 0);
        this._plusButton.eventMode = "static";
        this._plusButton.cursor = "pointer";
        this._interface.addChild(this._plusButton);

        this._minusButton = PIXI.Sprite.from("minus");
        this._minusButton.label = "MinusButton";
        this._minusButton.anchor.set(0.5, 0.5);
        this._minusButton.position.set(135, 0);
        this._minusButton.eventMode = "static";
        this._minusButton.cursor = "pointer";
        this._interface.addChild(this._minusButton);

        // Add the spin button
        this._spinButton = PIXI.Sprite.from("button");
        this._spinButton.label = "SpinButton";
        this._spinButton.anchor.set(0.5, 0.5);
        this._spinButton.scale.set(0.65, 0.65);
        this._spinButton.position.set(0, 0);
        this._spinButton.eventMode = "static";
        this._spinButton.cursor = "pointer";
        this._interface.addChild(this._spinButton);

        // Add text to the spin button
        this._buttonText = new PIXI.Text();
        this._buttonText.label = "ButtonText";
        this._buttonText.anchor.set(0.5, 0.5);
        this._buttonText.text = "SPIN";
        this._buttonText.style = {
            fontFamily: "TiltNeon",
            fontSize: 90,
            fontWeight: "700",
            align: "center",
            fill: "#FAFAFA",
            stroke: "blue",
            letterSpacing: 1
        };
        this._buttonText.style._stroke.width = 6;
        this._spinButton.addChild(this._buttonText);

        // Create and add the payout component
        this._payout = new Payout(this._app);
        this.addChild(this._payout);

        // Set up pointer events for hiding the payout
        document.onpointerdown = () => {
            if (this._payout.isOpened) {
                this._payout.hidePayout();
            }
        }

        // Create and add the popup component
        this._popup = new Popup(this._app);
        this.addChild(this._popup);
    }

    // This section handles all event listeners for user interaction
    //#region LISTENERS
    private eventListeners() {
        // Increase and decrease bet actions
        this._plusButton.onpointerup = this.onBetChance.bind(this, BET_COMMANDS.increase);
        this._minusButton.onpointerup = this.onBetChance.bind(this, BET_COMMANDS.decrease);

        // Scale effect on pointer enter and exit for the spin button
        this._spinButton.onpointerenter = () => { gsap.to(this._spinButton.scale, { x: 0.75, y: 0.75, duration: 0.25, ease: "expo.out" }); }
        this._spinButton.onpointerout = () => { gsap.to(this._spinButton.scale, { x: 0.65, y: 0.65, duration: 0.25, ease: "expo.in" }); }

        // Handle spin button click
        this._spinButton.onpointerup = () => {
            if (!this._reels.isSpinning) {
                gsap.to(this._spinButton.scale, { x: 0.65, y: 0.65, duration: 0.25, ease: "expo.in" });
                this._spinButton.eventMode = "none";
                this._spinButton.cursor = "default";
                this._spinButton.alpha = 0.5;

                this._plusButton.eventMode = "none";
                this._plusButton.cursor = "default";
                this._minusButton.eventMode = "none";
                this._minusButton.cursor = "default";

                if (this._creditAmount >= this._betAmount) {
                    this.startSpin();
                } else {
                    this._popup.showPopup();  // Show a popup if there aren't enough credits
                }
            }
        }

        // Event listeners for the spin and win events
        globalThis.eventBus.on(EventNames.SpinStarted, () => {
            this._creditAmount = this._creditAmount - this._betAmount;
            this._credit.text = this._creditAmount.toString();
        });

        globalThis.eventBus.on(EventNames.SpinStopped, () => {
            globalThis.eventBus.on(EventNames.MoneyEarned, this.onSpinStopped.bind(this));
        });

        globalThis.eventBus.on(EventNames.WinShown, this.calculateCredits.bind(this));
        globalThis.eventBus.on(EventNames.PopupShown, this.resetUIElements.bind(this));
        globalThis.eventBus.on(EventNames.SymbolClickedFromReels, this.showPayout.bind(this));
    }
    //#endregion

    // Method to start the spin process
    private startSpin() {
        this._reels.startSpin(0.15);  // Start spinning with a speed factor of 0.15
    }

    // Method to handle when the spin stops and win amounts are calculated
    private onSpinStopped(amount: number) {
        if (amount > 0) {
            this._winDisplay.showWin(amount);  // Show win if amount is greater than 0
        } else {
            this.resetUIElements();  // Reset the UI elements if no win
            globalThis.eventBus.off(EventNames.MoneyEarned);  // Turn off the listener for money earned
        }
    }

    // Calculate and update the credit amount based on the win
    private calculateCredits(earn: number) {
        globalThis.eventBus.off(EventNames.MoneyEarned);

        this._creditAmount = this._creditAmount + earn;  // Add the earned amount to the credit
        this._credit.text = this._creditAmount.toString();  // Update the credit display

        this.resetUIElements();  // Reset UI elements after win
    }

    // Handle changes in the bet amount based on the user's input
    private onBetChance(command: BET_COMMANDS) {
        switch (command) {
            case BET_COMMANDS.increase:
                if (this._betIndex < BET_RANGE.length - 1) {
                    this._betIndex++;  // Increase the bet amount
                    this._minusButton.eventMode = "static";
                    this._minusButton.cursor = "pointer";
                } else {
                    this._plusButton.eventMode = "none";  // Disable the plus button if the max bet is reached
                    this._plusButton.cursor = "default";
                }
                break;
            case BET_COMMANDS.decrease:
                if (this._betIndex > 0) {
                    this._betIndex--;  // Decrease the bet amount
                    this._plusButton.eventMode = "static";
                    this._plusButton.cursor = "pointer";
                } else {
                    this._minusButton.eventMode = "none";  // Disable the minus button if the minimum bet is reached
                    this._minusButton.cursor = "default";
                }
                break;
        }

        this._betAmount = BET_RANGE[this._betIndex];  // Update the bet amount based on the index
        this._bet.text = this._betAmount.toString();  // Update the bet display
    }

    // Display the payout information when a symbol is clicked on the reels
    private showPayout(data: { symbolIndex: number, reelIndex: number, rowIndex: number }) {
        if (!this._reels.isSpinning && !this._winDisplay.isWinDisplaying) {
            this._payout.showPayout(data);  // Show the payout data
        }
    }

    // Reset all UI elements to their default states
    private resetUIElements() {
        this._spinButton.eventMode = "static";  // Enable spin button interaction
        this._spinButton.cursor = "pointer";
        this._spinButton.alpha = 1;

        this._plusButton.eventMode = "static";  // Enable plus and minus buttons
        this._plusButton.cursor = "pointer";
        this._minusButton.eventMode = "static";
        this._minusButton.cursor = "pointer";
    }
}