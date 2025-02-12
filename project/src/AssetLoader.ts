import * as PIXI from "pixi.js";
import { ASSETS } from "./Configs";

export class AssetLoader {
    public async loader() {
        await PIXI.Assets.load(ASSETS);
    }
}