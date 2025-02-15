import * as PIXI from "pixi.js";
import gsap from "gsap";
import { EventNames } from "./EventBus";
import { BET_COMMANDS, BET_RANGE } from "./Configs";
import { Reels } from "./Reels";
import { WinDisplay } from "./WinDisplay";
import { Popup } from "./Popup";
import { Payout } from "./Payout";

const COL_LENGTH = 5;
const ROW_LENGTH = 3;
const INITIAL_CREDIT: number = 50000;
const INITIAL_BET: number = BET_RANGE[BET_RANGE.length - 1];

export class Machine extends PIXI.Container {
    private _app: PIXI.Application;

    private _reels: Reels;
    private _winDisplay: WinDisplay;
    private _payout: Payout;
    private _popup: Popup;

    private _interface: PIXI.Sprite;
    private _credit: PIXI.Text;
    private _creditAmount: number = INITIAL_CREDIT;
    private _bet: PIXI.Text;
    private _betAmount: number = INITIAL_BET;
    private _betIndex: number = BET_RANGE.length - 1;
    private _spinButton: PIXI.Sprite;
    private _buttonText: PIXI.Text;
    private _plusButton: PIXI.Sprite;
    private _minusButton: PIXI.Sprite;

    constructor(app: any) {
        super();

        this._app = app;

        this.onLoad(COL_LENGTH, ROW_LENGTH);
    }

    private onLoad(col: number, row: number) {
        this.create(col, row);
        this.eventListeners();
    }

    private create(col: number, row: number) {
        this._reels = new Reels(this._app, col, row);
        this.addChild(this._reels);

        this._winDisplay = new WinDisplay(this._app);
        this.addChild(this._winDisplay);

        let interfaceBackground = new PIXI.Graphics().beginPath().roundRect(335, 590, 610, 100, 35).fill({ color: "red", alpha: 0.5 }).closePath();
        interfaceBackground.label = "InterfaceBackground";
        this.addChild(interfaceBackground);

        this._interface = PIXI.Sprite.from("interface");
        this._interface.label = "Interface";
        this._interface.anchor.set(0.5, 0.5);
        this._interface.scale.set(1.2, 1.2);
        this._interface.position.set(640, 640);
        interfaceBackground.addChild(this._interface);

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

        this._credit = new PIXI.Text();
        this._credit.label = "CreditAmount";
        this._credit.anchor.set(0.5, 0.5);
        this._credit.position.set(-180, 15);
        this._credit.text = INITIAL_CREDIT.toString();
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

        this._bet = new PIXI.Text()
        this._bet.label = "BetAmount";
        this._bet.anchor.set(0.5, 0.5);
        this._bet.position.set(180, 15);
        this._bet.text = INITIAL_BET.toString();
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

        this._spinButton = PIXI.Sprite.from("button");
        this._spinButton.label = "SpinButton";
        this._spinButton.anchor.set(0.5, 0.5);
        this._spinButton.scale.set(0.65, 0.65);
        this._spinButton.position.set(0, 0);
        this._spinButton.eventMode = "static";
        this._spinButton.cursor = "pointer";
        this._interface.addChild(this._spinButton);

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

        this._payout = new Payout(this._app);
        this.addChild(this._payout);

        document.onpointerdown = () => {
            if (this._payout.isOpened) {
                this._payout.hidePayout();
            }
        }

        this._popup = new Popup(this._app);
        this.addChild(this._popup);
    }

    private eventListeners() {
        this._plusButton.onpointerup = this.onBetChance.bind(this, BET_COMMANDS.increase);
        this._minusButton.onpointerup = this.onBetChance.bind(this, BET_COMMANDS.decrease);

        this._spinButton.onpointerenter = () => { gsap.to(this._spinButton.scale, { x: 0.75, y: 0.75, duration: 0.25, ease: "expo.out" }); }
        this._spinButton.onpointerout = () => { gsap.to(this._spinButton.scale, { x: 0.65, y: 0.65, duration: 0.25, ease: "expo.in" }); }
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
                    this._popup.showPopup();
                }
            }
        }

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

    private startSpin() {
        this._reels.startSpin(0.15);
    }

    private onSpinStopped(amount: number) {
        if (amount > 0) {
            this._winDisplay.showWin(amount);
        } else {
            this.resetUIElements();
            globalThis.eventBus.off(EventNames.MoneyEarned);
        }
    }

    private calculateCredits(earn: number) {
        globalThis.eventBus.off(EventNames.MoneyEarned);

        this._creditAmount = this._creditAmount + earn;
        this._credit.text = this._creditAmount.toString();

        this.resetUIElements();
    }

    private onBetChance(command: BET_COMMANDS) {
        switch (command) {
            case BET_COMMANDS.increase:
                if (this._betIndex < BET_RANGE.length - 1) {
                    this._betIndex++;

                    this._minusButton.eventMode = "static";
                    this._minusButton.cursor = "pointer";
                } else {
                    this._plusButton.eventMode = "none";
                    this._plusButton.cursor = "default";
                }
                break;
            case BET_COMMANDS.decrease:
                if (this._betIndex > 0) {
                    this._betIndex--;

                    this._plusButton.eventMode = "static";
                    this._plusButton.cursor = "pointer";
                } else {
                    this._minusButton.eventMode = "none";
                    this._minusButton.cursor = "default";
                }
                break;
        }

        this._betAmount = BET_RANGE[this._betIndex];
        this._bet.text = this._betAmount.toString();
    }

    private showPayout(data: { symbolIndex: number, reelIndex: number, rowIndex: number }) {
        if (!this._reels.isSpinning && !this._winDisplay.isWinDisplaying) {
            this._payout.showPayout(data);
        }
    }

    private resetUIElements() {
        this._spinButton.eventMode = "static";
        this._spinButton.cursor = "pointer";
        this._spinButton.alpha = 1;

        this._plusButton.eventMode = "static";
        this._plusButton.cursor = "pointer";
        this._minusButton.eventMode = "static";
        this._minusButton.cursor = "pointer";
    }
}