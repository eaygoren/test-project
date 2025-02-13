import * as mitt from "mitt";

type Events = {
    spinStarted: void;
    spinStopped: void;
    dataRecived: void;
    [key: string]: any;
};

declare global {
    var eventBus: mitt.Emitter<Events>;
}

export { };