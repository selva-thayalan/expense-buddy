import { Expense } from "./Expense";
import { Member } from "./Member";
import { SplitOverview } from "./SplitOverview";

export interface Split{
    name: string,
    members: Member[],
    expenses: Expense[],
    overviews: SplitOverview[]
}