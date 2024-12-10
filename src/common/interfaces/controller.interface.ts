import { IRoute } from "./route.interface.js";

export interface IController {
    init(): IRoute
}