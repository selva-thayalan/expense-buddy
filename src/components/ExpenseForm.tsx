import { useEffect, useRef, useState } from 'react';
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
import EqualShare from './shares/EqualShare';
import { Share } from '../models/Share';
import StateSwitch from './common/StateSwitch';
import { StateStyle } from '../models/ComponentModels/StateSwitchComponent';
import UnequalShare from './shares/UnequalShare';
import NumberInput from './common/NumberInput';
import PercentageShare from './shares/PercentageShare';

interface ExpenseFormProps{
    splitId?: string,
    isEditMode?: boolean,
    expenseModel?: Expense,
    onComplete?: (expense: ExpenseFormModel) => void,
    onCancel?: () => void
}

interface SelectOption{
    value: any,
    label: string
}

const ShareTypeReadableName = {
    [ShareType.Equal] : "Equally",
    [ShareType.Unequal] : "Unequally",
    [ShareType.Percentage] : "Percentage"
}

const ShareTypeOptions = [{label: "Equally", value:ShareType.Equal}, {label: "Unequally", value:ShareType.Unequal}, {label: "Percentage", value:ShareType.Percentage}];

const ExpenseForm = ({splitId, onCancel, onComplete, expenseModel, isEditMode = false}:ExpenseFormProps) => {
    const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
    const [amount, setAmount] = useState(0);
    const [title, setTitle] = useState("");
    const [paidBy, setPaidBy] = useState<SelectOption>({value:"", label:""});
    const [shareType, setShareType] = useState<ShareType>();
    const [showShareEditor, setShowShareEditor] = useState(false);
    const [isExpenseValid, setIsExpenseValid] = useState(false);
    const shares = useRef<Share[]>([]);

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
            setShareType(expenseModel.shareType);
            shares.current = expenseModel.shares;
        }
    }, [])

    useEffect(() => {
        checkIsExpenseValid();
    }, [title, amount, paidBy.value, shareType, shares.current.length]);

    function getShareTypeName(type: ShareType|undefined): string{
        if(type !== undefined && ShareTypeReadableName[type])
            return ShareTypeReadableName[type];
        return "--";
    }

    function onAmountChange(value: number){
        setAmount(value);
    }

    function onTitleChange(e: any){
        setTitle(e.target.value);
    }

    function onCancelAction(): void{
        onCancel?.();
    }

    function onCompleteAction(): void{
        var expense: ExpenseFormModel = {title, amount: +amount, shareType: shareType || ShareType.Equal, shares: shares.current, paidBy: paidBy.value};
        onComplete?.(expense);
    }

    function onChangePaidBy(option: SingleValue<any>): void{
        setPaidBy(option);
    }

    function onClickShareType(): void{
        setShowShareEditor(true);
    }

    function onChangeShareType(option: ShareType): void{
        setShareType(option);
    }

    function onShareComplete(shareList: Share[]){
        shares.current = shareList;
        setShowShareEditor(false);
    }

    function checkIsExpenseValid(){
        let isValid = ((title !== "") && (amount > 0) && (paidBy.value !== "") && shareType !== undefined && (shares.current.length > 0))? true : false;
        setIsExpenseValid(isValid);
    }

    function onCancelShareEditor(){
        setShowShareEditor(false);
    }

    return(
        <div className="expense-form-cont">
            {split && <>
            <input type="text" value={title} onChange={onTitleChange} placeholder="Title" className="expense-title expense-input-field-size std-style" />
            <NumberInput value={amount} onChange={onAmountChange} placeHolder="Amount" className="expense-amount expense-input-field-size std-style" />
            <div className="expense-split-detail-cont">
                Paid by <Select classNamePrefix="react-select" value={paidBy} onChange={onChangePaidBy} options={getMemberOptions()}/> and split 
                <div className="share-type-selected clickable" onClick={onClickShareType}>{getShareTypeName(shareType)}</div>
            </div>
            {showShareEditor && <div className="share-wrap">
                <StateSwitch style={StateStyle.tab} value={shareType} onChange={onChangeShareType} options={ShareTypeOptions}/>
                {shareType === ShareType.Equal ? <EqualShare isEditMode={isEditMode} shares={expenseModel?.shares} members={split?.members} amount={amount} onComplete={onShareComplete} onCancel={onCancelShareEditor}/>
                    :shareType === ShareType.Unequal ? <UnequalShare isEditMode={isEditMode} shares={expenseModel?.shares} members={split?.members} amount={amount} onComplete={onShareComplete} onCancel={onCancelShareEditor}/>
                        :<PercentageShare isEditMode={isEditMode} shares={expenseModel?.shares} members={split?.members} amount={amount} onComplete={onShareComplete} onCancel={onCancelShareEditor}/>}
            </div>}
            <div className="expense-actions-cont t_align_c">
                <button className="complete-action-btn" disabled={!isExpenseValid} onClick={onCompleteAction}>{isEditMode? "Save" : "Add"}</button>
                <button className="cancel-action-btn" onClick={onCancelAction}>Cancel</button>
            </div>
            </>}
        </div>
    )
}

export default ExpenseForm;