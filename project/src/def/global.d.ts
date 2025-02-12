import * as mitt from "mitt";

type Events = {
    spinStart: void;
    spinEnd: { result: string };
    balanceUpdate: { newBalance: number };
    [key: string]: any;
};

declare global {
    var eventBus: mitt.Emitter<Events>;
}

export { };