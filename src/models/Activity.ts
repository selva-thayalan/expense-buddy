import { Share } from "./Share";
import { ShareType } from "./ShareType";

export interface Activity{
    title: string,
    amount: number,
    time: Date,
    shareType: ShareType,
    share: Share,
}