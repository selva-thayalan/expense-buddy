import '../styles/components/ExpenseCard.scss';
import { Expense } from "../models/Expense";
import { useNavigate } from 'react-router-dom';
import { Member } from '../models/Member';
import { getMemeberNameById } from '../utils/Common';

interface ExpenseCardProps{
    model: Expense,
    userAccount: Member,
    members?: Member[]
}

const ExpenseCard = ({model, userAccount, members = []}: ExpenseCardProps) => {
    const navigate = useNavigate();

    return(
        <div className="expense-card-cont theme-transition" onClick={() => navigate(`./edit/${model.id}`)}>
            <div className="expense-card-lhs t_align_c f_weight_b">
                <div className="expense-month f_size_s">{model.time.toLocaleString('en-us',{month:'short'})}</div>
                <div className="expense-date f_size_lr">{model.time.getDate()}</div>
            </div>
            <div className="expense-card-cntr v_align_flex flex_d_column">
                <p className="expense-title">{model.title}</p>
                <p className="expense-detail">{`${model.paidBy === userAccount.id ? "You" : getMemeberNameById(members, model.paidBy)} paid `} <b >{model.amount}</b></p>
            </div>
            <div className="expense-card-rhs v_align_flex share-detail flex_align_center">
                {model.paidBy === userAccount.id ? 
                    <p className="share-lent">you lent<p className="share-amount">{model.shares.reduce(((r, x) => x.memberId != model.paidBy ?  x.amount + r: r), 0)}</p></p>:
                    model.shares.some(share => share.memberId === userAccount.id) ?
                    <p className="share-borrowed">you borrowed<p className="share-amount">{model.shares.find(share => share.memberId === userAccount.id)?.amount}</p></p>:
                    <p className="share-not-involed">not involved</p>
                    }
            </div>
        </div>
    )
}

export default ExpenseCard;