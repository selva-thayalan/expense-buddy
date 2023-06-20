import { Activity } from "./Activity";
import { Member } from "./Member";
import { SplitOverview } from "./SplitOverview";

export interface Split{
    name: string,
    members: Member[],
    activities: Activity[],
    overviews: SplitOverview[]
}