import * as mitt from "mitt";
import { EventNames } from "../EventBus";

export type Events = {
    [EventNames.SpinStarted]: void;
    [EventNames.SpinStopped]: void;
    [EventNames.AllReelsStopped]: void;
    [EventNames.ReelStopped]: number;
    [EventNames.MoneyEarned]: number;
    [EventNames.WinShown]: number;
    [EventNames.PopupShown]: void;
    [EventNames.DataRecieved]: number;
};

declare global {
    var eventBus: mitt.Emitter<Events>;
}

export { };