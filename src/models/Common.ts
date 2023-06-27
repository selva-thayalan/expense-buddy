import { Share } from "./Share";
import { ShareType } from "./ShareType";

enum SplitType{
    Individual,
    Group
}
interface ExpenseFormModel{
    title: string,
    amount: number,
    shareType: ShareType,
    shares: Share[],
    paidBy: string,
}

export { SplitType, type ExpenseFormModel };