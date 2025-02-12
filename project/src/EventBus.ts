import mitt from "mitt";

type Events = {
    spinStart: void;
    spinEnd: { result: string };
    balanceUpdate: { newBalance: number };
};

export const eventBus = mitt<Events>();