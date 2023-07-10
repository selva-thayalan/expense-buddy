import "../../styles/components/Shares.scss";
import { useEffect, useState } from "react";
import ShareComponentProps, { EqualShareView } from "../../models/ComponentModels/ShareComponent";
import { getMemberName } from "../../utils/Common";
import { Share } from "../../models/Share";

const EqualShare = ({isEditMode = false, amount, members, shares, onComplete, onCancel}:ShareComponentProps) => {
    const [shareList, setShareList] = useState<EqualShareView[]>([]);
    const [shareCount, setShareCount] = useState(0);
    const [allSelectionState, setAllSelection] = useState(false);
    const [isShareInvalid, setIsShareInvalid] = useState(true);

    useEffect(() => {
        var shareViewList: EqualShareView[] = [];
        if(isEditMode && shares){
            let tempShareCount = 0;
            shareViewList = members.map(mem => {
                let share = shares.find(s => s.memberId === mem.id);
                let isSelected = false;
                //If the member is available in the shares then he must be selected unless he is not selected in the share.
                if(share){
                    isSelected = true;
                    tempShareCount++;
                }
                return { id: mem.id, name: getMemberName(mem), isSelected };
            });
            setAllSelection(members.length === shares?.length);
            setShareCount(tempShareCount);
        }
        else{
            shareViewList = members.map(mem => ({ id: mem.id, name: getMemberName(mem), isSelected: false }));
        }
        setShareList(shareViewList);
    },[]);
    
    useEffect(() => {
        setIsShareInvalid(shareCount === 0);
    },[shareCount]);

    function onMemberSelectionToggle(memberIndex: number, state: boolean){
        shareList[memberIndex].isSelected = state;
        setShareList([...shareList]);
        if(state)
            setShareCount(shareCount+1);
        else
            setShareCount(shareCount-1);
    };

    function  toggleAllMembers(state: boolean){
        setShareList(shareList.map(s => ({...s, isSelected: state})));
        if(state)
            setShareCount(shareList.length);
        else
            setShareCount(0);
        setAllSelection(state);
    }

    function onCompleteAction(){
        let shareAmount = amount/shareCount;
        let tempShares: Share[] = [];
        shareList.forEach(s =>{
            if(s.isSelected)
                tempShares.push({memberId: s.id, amount: shareAmount});
        })
        onComplete(tempShares);
    }

    return (
        <div className="share-cont">
            <ul className="share-list-cont no-list-style">
                {shareList.map((member, index) => 
                    <li className="split-item-cont">
                        <p className="member-name">{member.name}</p>
                        <input type="checkbox" checked={member.isSelected ? true : false} onChange={() => onMemberSelectionToggle(index, !member.isSelected)}/>
                    </li>)}
            </ul>
            <div className="share-footer-cont">
                <div className="share-summary t_align_c">
                    <b>{shareCount > 0 ? (amount/shareCount).toFixed(2) : 0}</b>/person
                    <p className="f_size_s">({shareCount} people)</p>
                </div>
                <div className="member-toggle-all-option">
                    <input type="checkbox" checked={allSelectionState} onChange={() => toggleAllMembers(!allSelectionState)}/> All
                </div>
            </div>
            <div className="share-action-cont">
                <button onClick={onCompleteAction} disabled={isShareInvalid}>Done</button>
                <button onClick={onCancel}>Cancel</button>
            </div>
        </div>
    )
}

export default EqualShare;