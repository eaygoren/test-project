import mitt from "mitt";
import { Events } from "./def/global";

/**
 * Enum defining all event names used in the event bus.
 */
export enum EventNames {
    /** Triggered when the spin action starts. */
    SpinStarted = "spinStarted",

    /** Triggered when the spin action stops. */
    SpinStopped = "spinStopped",

    /** Triggered when all reels have stopped spinning. */
    AllReelsStopped = "allReelsStopped",

    /** Triggered when a single reel has stopped spinning. */
    ReelStopped = "reelStopped",

    /** Triggered when money is earned. */
    MoneyEarned = "moneyEarned",

    /** Triggered when a win is shown. */
    WinShown = "winShown",

    /** Triggered when a popup is displayed. */
    PopupShown = "popupShown",

    /** Triggered when a symbol is clicked. */
    SymbolClicked = "symbolClicked",

    /** Triggered when data is received. */
    DataRecieved = "dataRecieved",

    /** Triggered when a symbol is clicked from the reels. */
    SymbolClickedFromReels = "symbolClickedFromReels"
}

/**
 * Global event bus for managing game-wide events.
 */
export const eventBus = mitt<Events>();