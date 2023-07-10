import "../../styles/components/Shares.scss";
import { useEffect, useState } from "react";
import ShareComponentProps, { PercentageShareView } from "../../models/ComponentModels/ShareComponent";
import { getMemberName } from "../../utils/Common";
import { Share } from "../../models/Share";
import NumberInput from "../common/NumberInput";

const PercentageShare = ({amount, members, shares, onComplete, onCancel}:ShareComponentProps) => {
    const [shareList, setShareList] = useState<PercentageShareView[]>([]);
    const [splittedPercentage, setSplittedPercentage] = useState(0);
    const [isShareInvalid, setIsShareInvalid] = useState(true);

    useEffect(() => {
        var shareViewList: PercentageShareView[] = [];
        if(shares){
            let totalPercentage = 0;
            shareViewList = members.map(mem => {
                let share = shares.find(s => s.memberId === mem.id);
                totalPercentage += (share?.percentage ?? 0);
                return { id: mem.id, name: getMemberName(mem), percentage: share?.percentage || 0 };
            });
            setSplittedPercentage(totalPercentage);
        }
        else{
            shareViewList = members.map(mem => ({ id: mem.id, name: getMemberName(mem), percentage: 0 }));
        }
        setShareList(shareViewList);
    },[]);

    useEffect(() => {
        setIsShareInvalid(splittedPercentage !== 100);
    },[splittedPercentage]);

    function onShareAmountChange(memberIndex: number, percentage: number){
        shareList[memberIndex].percentage = percentage;
        setSplittedPercentage(shareList.reduce(((r, s) => r+s.percentage), 0));
        setShareList([...shareList]);
    }

    function onClearAll(){
        setSplittedPercentage(0);
        setShareList(shareList.map(s => ({...s, percentage: 0})));
    }

    function getPercentageStat(){
        let balance = 100 - splittedPercentage;
        if(balance < 0){
            return <p className="f_size_s negative-color">{Math.abs(balance)}% over</p>;
        }
        else{
            return <p className={"f_size_s " + (balance > 0 ? "informative-color" : "positive-color")}>{balance}% left</p>;
        }
    }

    function onCompleteAction(){
        let tempShares: Share[] = [];
        shareList.forEach(s =>{
            if(s.percentage > 0){
                let percentageAmount = amount*(s.percentage/100);
                tempShares.push({memberId: s.id, percentage: s.percentage, amount: percentageAmount});
            }
        })
        onComplete(tempShares);
    }

    return (
        <div className="share-cont">
                <ul className="share-list-cont no-list-style">
                {shareList.map((member, index) => 
                    <li className="split-item-cont">
                        <p className="member-name">{member.name}</p>
                        <NumberInput className="std-style share-editor-input-field-size" value={member.percentage} onChange={(value) => onShareAmountChange(index, value)}/>
                    </li>)}
            </ul>
            <div className="share-footer-cont">
                <div className="share-summary t_align_c">
                    <b>{splittedPercentage}%</b> of 100%
                    {getPercentageStat()}
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

export default PercentageShare;