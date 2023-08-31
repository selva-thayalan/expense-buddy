import "./../styles/components/GroupForm.scss";
import { useEffect, useState } from "react"
import Select from "react-select";
import { Split } from "../models/Split";
import { v4 as uuid } from "uuid";
import { SplitType } from "../models/Common";
import { Member } from "../models/Member";
import MemberOption, { MemberToMemberOption } from "../models/MemberOption";

interface GroupFormProps {
    memberList: Member[],
    groupModel?: Split,
    onComplete: (group: Split) => void,
    onCancel?: () => void
}

const GroupForm = ({onComplete, onCancel, groupModel, memberList}: GroupFormProps) =>{
    const [selectedMembers, setSelectedMembers] = useState<MemberOption[]>([]);
    const [name, setName] = useState("");
    const [isGroupValid, setIsGroupValid] = useState(false);

    useEffect(() => {
        if(groupModel){
            setSelectedMembers(groupModel.members.map(m => MemberToMemberOption(m)));
            setName(groupModel.name);
        }
    }, []);

    useEffect(() => {
        setIsGroupValid((name !== "" && selectedMembers.length > 0));
    }, [name, selectedMembers.length]);

    function onMemeberSelect(selectedMember: any) {
        setSelectedMembers(selectedMember);
    }

    function onCompleteAction(){
        let group: Split = {
            id: uuid(),
            name,
            members: selectedMembers,
            type: SplitType.Group,
            overviews:[]
        }
        onComplete(group);
    }

    function onCancelAction(){
        onCancel?.();
    }

    //ToDo: custom input component to modify the default component later
    // function inputComp(opt:any){
    //     return (<div data-value="">
    //                 <input className="group-form-input" 
    //                     placeholder="Add Member..."
    //                     autoCapitalize="none" autoComplete="off" 
    //                     autoCorrect="off" id="react-select-4-input" 
    //                     spellCheck="false" tabIndex={0} type="text" 
    //                     aria-autocomplete="list" aria-expanded="false" 
    //                     aria-haspopup="true" role="combobox" value={opt.value} onChange={opt.onChange}/>
    //             </div>)
    // }

    return(
        <div className="group-form-cont">
            <div className="group-name-cont p_5">
                <p className="disp_ib p_5">Name</p>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="group-name-field disp_ib std-style" />
            </div>
            <div className="group-memebers-select-cont">
                <Select
                    isMulti
                    classNamePrefix="react-select"
                    placeholder = ""
                    options={memberList.map(m => MemberToMemberOption(m))} 
                    value={selectedMembers}
                    components={{IndicatorsContainer:() => <div></div>}}//To hide the Indicator at thr right side, passed this empty div to overwrite that component.
                    onChange={onMemeberSelect}/>
            </div>
            <div className="group-actions-cont t_align_c">
                <button className="complete-action-btn p_5" disabled={!isGroupValid} onClick={onCompleteAction}>{groupModel? "Save" : "Ok"}</button>
                <button className="cancel-action-btn p_5" onClick={onCancelAction}>Cancel</button>
            </div>
        </div>
    )
}

export default GroupForm;