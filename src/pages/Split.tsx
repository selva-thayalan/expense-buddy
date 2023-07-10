import '../styles/Split.scss'
import { useSelector, TypedUseSelectorHook } from 'react-redux';
import { Split as SplitModel } from "../models/Split";
import { useOutlet, useParams, useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';
import { Expense } from '../models/Expense';
import ExpenseCard from '../components/ExpenseCard';
import { Member } from '../models/Member';

const Split = () =>{
    const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
    const navigate = useNavigate();
    const outlet = useOutlet();//To show expense list when the page is in index.
    var { splitId } = useParams();

    var split: SplitModel|undefined = useTypedSelector(state => state.splits.find(sp => sp.id === splitId));
    var expenses: Expense[] = useTypedSelector(state => state.expenses);
    var useAccount: Member = useTypedSelector(state => state.userAccount);

    return(
        <>
            {split && <div className="split-page main-content-area">
                <div className="split-header">
                    <div className="header-split-pic-cont">
                        <p>{split.name.charAt(0)}</p>
                    </div>
                    <div className="header-split-details-cont">
                        <div className="header-split-name">{split.name}</div>
                    </div>
                </div>
                {outlet || <div className="split-expense-list-wrap">
                    <div className="split-expense-list-cont">
                        {expenses.map(expense => <ExpenseCard model={expense} members={split?.members} userAccount={useAccount}/>)}
                    </div>
                </div>}
                <div className="split-foot-cont">
                    <button className="add-new-expense-btn" onClick={() => navigate("./add")}>Add Expense<i className="fa-solid fa-receipt"></i></button>
                </div>
            </div>}
        </>
    )
}

export default Split;