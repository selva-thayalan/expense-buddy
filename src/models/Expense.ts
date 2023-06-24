import { Share } from "./Share";
import { ShareType } from "./ShareType";

export interface Expense{
    title: string,
    amount: number,
    time: Date,
    shareType: ShareType,
    shares: Share[],
    paidBy: string //Id of the member who paid the amount.
}