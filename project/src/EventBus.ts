import mitt from "mitt";

type Events = {
    spinStarted: void;
    spinStopped: void;
    dataRecived: void;
    [key: string]: any;
};

export const eventBus = mitt<Events>();