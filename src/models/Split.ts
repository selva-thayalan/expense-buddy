import { SplitType } from "./Common";
import { Expense } from "./Expense";
import { Member } from "./Member";
import { SplitOverview } from "./SplitOverview";

export interface Split{
    id: string,
    name: string,
    members: Member[],
    type: SplitType,
    overviews: SplitOverview[]
}