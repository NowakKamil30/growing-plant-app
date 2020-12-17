/* eslint-disable @typescript-eslint/no-unused-vars */
import { Device } from "./Device";

export interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    devices: Device[];
}