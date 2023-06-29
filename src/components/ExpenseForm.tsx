import { ChangeEvent, useState } from 'react';
import '../styles/components/ExpenseForm.scss';
import Select from "react-select";
import { ShareType } from '../models/ShareType';
import { ExpenseFormModel } from '../models/Common';
import { Expense } from '../models/Expense';

interface ExpenseFormProps{
    isEditMode?: boolean,
    expenseModel?: Expense,
    onComplete?: (expense: ExpenseFormModel) => void,
    onCancel?: () => void
}

const ExpenseForm = ({onCancel, onComplete: onComplete, expenseModel, isEditMode = false}:ExpenseFormProps) => {
    const [amount, setAmount] = useState(expenseModel?.amount || "");
    const [title, setTitle] = useState(expenseModel?.title || "");

    function onAmountChange(e: any){
        setAmount(e.target.value.replace(/[^\d.]/g, ""));
    }

    function onTitleChange(e: any){
        setTitle(e.target.value);
    }

    function onCancelAction(): void{
        onCancel?.();
    }

    function onCompleteAction(): void{
        var expense: ExpenseFormModel = {title, amount: +amount, shareType: ShareType.Equal, shares: [], paidBy: "0"};
        onComplete?.(expense);
    }

    return(
        <div className="expense-form-cont">
            <input type="text" value={title} onChange={onTitleChange} placeholder="Title" className="expense-title expense-input-field-style" />
            <input type="text" value={amount} onChange={onAmountChange} placeholder="Amount" className="expense-amount expense-input-field-style" />
            <div className="expense-split-detail-cont">
                Paid by <Select/> and split Equally
            </div>
            <div className="expense-actions-cont">
                <button className="complete-action-btn" onClick={onCompleteAction}>{isEditMode? "Save" : "Add"}</button>
                <button className="cancel-action-btn" onClick={onCancelAction}>Cancel</button>
            </div>
        </div>
    )
}

export default ExpenseForm;