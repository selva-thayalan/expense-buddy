import { ChangeEvent, useState } from 'react';
import '../styles/components/ExpenseForm.scss';
import Select from "react-select";

interface ExpenseFormProps{
    isEditMode?: boolean,
    onSuccess?: () => void,
    onCancel?: () => void
}

const ExpenseForm = ({onCancel, onSuccess, isEditMode = false}:ExpenseFormProps) => {
    const [amount, setAmount] = useState("");
    const [title, setTitle] = useState("");

    function onAmountChange(e: any){
        setAmount(e.target.value.replace(/[^\d.]/g, ""));
    }

    function onTitleChange(e: any){
        setTitle(e.target.value);
    }

    function onCancelAction(): void{
        onCancel?.();
    }

    return(
        <div className="expense-form-cont">
            <input type="text" value={title} onChange={onTitleChange} placeholder="Title" className="expense-title expense-input-field-style" />
            <input type="text" value={amount} onChange={onAmountChange} placeholder="Amount" className="expense-amount expense-input-field-style" />
            <div className="expense-split-detail-cont">
                Paid by <Select/> and split Equally
            </div>
            <div className="expense-actions-cont">
                <button className="complete-action-btn">{isEditMode? "Save" : "Add"}</button>
                <button className="cancel-action-btn" onClick={onCancelAction}>Cancel</button>
            </div>
        </div>
    )
}

export default ExpenseForm;