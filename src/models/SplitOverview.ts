export interface SplitOverview{
    memberId: string, //Id of the member who paid money to the owesId.
    owesId: string, //Id of the member who have the money of the member.
    amount: number //The total amount that the owesId member want to repay to the member.
}