import { useEffect, useState } from 'react';
import '../styles/components/ExpenseForm.scss';
import Select, { SingleValue } from "react-select";
import { ShareType } from '../models/ShareType';
import { ExpenseFormModel } from '../models/Common';
import { Expense } from '../models/Expense';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Split } from '../models/Split';
import { getMemberName } from '../utils/Common';
import { Member } from '../models/Member';

interface ExpenseFormProps{
    splitId?: string,
    isEditMode?: boolean,
    expenseModel?: Expense,
    onComplete?: (expense: ExpenseFormModel) => void,
    onCancel?: () => void
}

interface SelectOption{
    value: string,
    label: string
}

const ExpenseForm = ({splitId, onCancel, onComplete, expenseModel, isEditMode = false}:ExpenseFormProps) => {
    const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
    const [amount, setAmount] = useState(0);
    const [title, setTitle] = useState("");
    const [paidBy, setPaidBy] = useState({value:"", label:""});

    const split: Split|undefined = useTypedSelector(state => state.splits.find(s => s.id === splitId));
    const useAccount: Member = useTypedSelector(state => state.userAccount);

    function getMemberOptions(): SelectOption[] {
        if(split)
            return split.members.map(mem => ({label: (mem.id === useAccount.id ? "You" : getMemberName(mem)), value: mem.id}));
        else
            return [];
    }

    useEffect(() => {
        if(isEditMode && expenseModel){
            setAmount(expenseModel.amount);
            setTitle(expenseModel.title);
            setPaidBy(getMemberOptions().find(mem => mem.value === expenseModel.paidBy) || {value:"", label:""});
        }
    }, [])

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
        var expense: ExpenseFormModel = {title, amount: +amount, shareType: ShareType.Equal, shares: [], paidBy: paidBy.value};
        onComplete?.(expense);
    }

    function onChangePaidBy(option: SingleValue<any>): void{
        setPaidBy(option);
    }

    return(
        <div className="expense-form-cont">
            {split && <>
            <input type="text" value={title} onChange={onTitleChange} placeholder="Title" className="expense-title expense-input-field-style" />
            <input type="text" value={amount} onChange={onAmountChange} placeholder="Amount" className="expense-amount expense-input-field-style" />
            <div className="expense-split-detail-cont">
                Paid by <Select classNamePrefix="react-select" value={paidBy} onChange={onChangePaidBy} options={getMemberOptions()}/> and split Equally
            </div>
            <div className="expense-actions-cont">
                <button className="complete-action-btn" onClick={onCompleteAction}>{isEditMode? "Save" : "Add"}</button>
                <button className="cancel-action-btn" onClick={onCancelAction}>Cancel</button>
            </div>
            </>}
        </div>
    )
}

export default ExpenseForm;