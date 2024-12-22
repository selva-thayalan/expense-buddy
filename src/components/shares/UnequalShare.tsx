import "../../styles/components/Shares.scss";
import { useEffect, useState } from "react";
import ShareComponentProps, { UnequalShareView } from "../../models/ComponentModels/ShareComponent";
import { getMemberName } from "../../utils/Common";
import { Share } from "../../models/Share";
import NumberInput from "../common/NumberInput";

const UnequalShare = ({amount, members, shares, onComplete, onCancel}:ShareComponentProps) => {
    const [shareList, setShareList] = useState<UnequalShareView[]>([]);
    const [splittedAmount, setSplittedAmount] = useState(0);
    const [isShareInvalid, setIsShareInvalid] = useState(true);

    useEffect(() => {
        var shareViewList: UnequalShareView[] = [];
        if(shares){
            let totalAmount = 0;
            shareViewList = members.map(mem => {
                let share = shares.find(s => s.memberId === mem.id);
                totalAmount += (share?.amount ?? 0);
                return { id: mem.id, name: getMemberName(mem), amount: share?.amount || 0 };
            });
            setSplittedAmount(totalAmount);
        }
        else{
            shareViewList = members.map(mem => ({ id: mem.id, name: getMemberName(mem), amount: 0 }));
        }
        setShareList(shareViewList);
    },[]);

    useEffect(() => {
        setIsShareInvalid(splittedAmount !== amount);
    },[splittedAmount]);

    function onShareAmountChange(memberIndex: number, amount: number){
        shareList[memberIndex].amount = amount;
        setSplittedAmount(shareList.reduce(((r, s) => r+s.amount), 0));
        setShareList([...shareList]);
    }

    function onClearAll(){
        setSplittedAmount(0);
        setShareList(shareList.map(s => ({...s, amount: 0})));
    }

    function getBalanceStat(){
        let balance = amount - splittedAmount;
        if(balance < 0){
            return <p className="f_size_s theme-transition negative-color">&#x20B9;{Math.abs(balance)} over</p>;
        }
        else{
            return <p className={"f_size_s theme-transition" + (balance > 0 ? "informative-color" : "positive-color")}>&#x20B9;{balance} left</p>;
        }
    }

    function onCompleteAction(){
        let tempShares: Share[] = [];
        shareList.forEach(s =>{
            if(s.amount > 0)
                tempShares.push({memberId: s.id, amount: s.amount});
        })
        onComplete(tempShares);
    }

    return (
        <div className="share-cont">
                <ul className="share-list-cont no-list-style">
                {shareList.map((member, index) => 
                    <li className="split-item-cont">
                        <p className="member-name">{member.name}</p>
                        <NumberInput className="std-style share-editor-input-field-size" value={member.amount} onChange={(value) => onShareAmountChange(index, value)}/>
                    </li>)}
            </ul>
            <div className="share-footer-cont">
                <div className="share-summary t_align_c">
                    <b>&#x20B9;{splittedAmount}</b> of &#x20B9;{amount}
                    {getBalanceStat()}
                </div>
                <div className="member-clear-all-share-option">
                    <button onClick={onClearAll}>Clear All</button>
                </div>
            </div>
            <div className="share-action-cont">
                <button onClick={onCompleteAction} disabled={isShareInvalid}>Done</button>
                <button onClick={onCancel}>Cancel</button>
            </div>
        </div>
    )
}

export default UnequalShare;