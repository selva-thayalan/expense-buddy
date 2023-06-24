import '../styles/components/ExpenseCard.scss';
import { Expense } from "../models/Expense";

interface ExpenseCardProps{
    model: Expense
}

const ExpenseCard = ({model}: ExpenseCardProps) => {
    return(
        <div className="expense-card-cont">
            <div className="expense-card-lhs t_align_c f_weight_b">
                <div className="expense-date f_size_lr">{model.time.getDate()}</div>
                <div className="expense-month f_size_s">{model.time.toLocaleString('en-us',{month:'short'})}</div>
            </div>
            <div className="expense-card-cntr">
                <div className="expense-title">{model.title}</div>
                <div className="expense-detail">{model.amount}</div>
            </div>
            <div className="expense-card-rhs"></div>
        </div>
    )
}

export default ExpenseCard;