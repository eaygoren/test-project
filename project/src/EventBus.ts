import mitt from "mitt";
import { Events } from "./def/global";

export enum EventNames {
    SpinStarted = "spinStarted",
    SpinStopped = "spinStopped",
    AllReelsStopped = "allReelsStopped",
    ReelStopped = "reelStopped",
    MoneyEarned = "moneyEarned",
    WinShown = "winShown",
    PopupShown = "popupShown",
    DataRecieved = "dataRecieved"
}

export const eventBus = mitt<Events>();