import * as mitt from "mitt";
import { EventNames } from "../EventBus";

// Define the Events type, mapping event names to their associated data
export type Events = {
    [EventNames.SpinStarted]: void; // 'SpinStarted' event
    [EventNames.SpinStopped]: void; // 'SpinStopped' event
    [EventNames.AllReelsStopped]: void; // 'AllReelsStopped' event
    [EventNames.ReelStopped]: number; // 'ReelStopped' event: a number (likely the reel index)
    [EventNames.MoneyEarned]: number; // 'MoneyEarned' event: the earned money value
    [EventNames.WinShown]: number; // 'WinShown' event: the win amount
    [EventNames.PopupShown]: void; // 'PopupShown' event
    [EventNames.DataRecieved]: number; // 'DataRecieved' event: a number value
    [EventNames.SymbolClicked]: {
        symbolIndex: number; // Index of the clicked symbol
        reelIndex: number; // Index of the reel where the symbol was clicked
        rowIndex: number; // Index of the row where the symbol was clicked
    };
    [EventNames.SymbolClickedFromReels]: {
        symbolIndex: number; // Index of the clicked symbol from the reels
        reelIndex: number; // Index of the reel where the symbol was clicked
        rowIndex: number; // Index of the row where the symbol was clicked
    };
};

// Declare the global variable 'eventBus' which is an instance of the mitt emitter
declare global {
    var eventBus: mitt.Emitter<Events>; // This allows us to use 'eventBus' globally in the project
}

export { };