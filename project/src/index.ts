import { core } from "./core";

/**
 * Immediately Invoked Async Function Expression (IIFE) to initialize the core game scene.
 */
(async () => {
    /**
     * Creates an instance of the core class and initializes it.
     */
    const mainScene = await new core().init();
})();