import '../styles/Split.scss'
import { Split as SplitModel } from "../models/Split";
import { ShareType } from '../models/ShareType';
import ExpenseCard from '../components/ExpenseCard';

const Split = () =>{
    const split: SplitModel = {name:"Chennai Life", members: [], expenses: [], overviews: []};
    split.expenses.push({title: "Egg", amount: 30, time: new Date(), shareType: ShareType.Equal, shares: [], paidBy: ""});
    split.expenses.push({title: "Bread", amount: 20, time: new Date(), shareType: ShareType.Equal, shares: [], paidBy: ""});

    return(
        <div className="split-page main-content-area">
            <div className="split-header">
                <div className="header-split-pic-cont">
                    <p>{split.name.charAt(0)}</p>
                </div>
                <div className="header-split-details-cont">
                    <div className="header-split-name">{split.name}</div>
                </div>
            </div>
            <div className="split-activities-list-cont">
                {split.expenses.map(expense => <ExpenseCard model={expense}/>)}
            </div>
        </div>
    )
}

export default Split;