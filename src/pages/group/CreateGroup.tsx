import GroupForm from "../../components/GroupForm";
import { useNavigate } from "react-router-dom";
import { Split } from "../../models/Split";
import { useDispatch } from "react-redux";
import { addGroup } from "../../store/actions/splitActions";

const tempMembers = [{firstName: "Selva",lastName: "thayalan",id: "m0",emailId: "selvathayalan.r@gmail.com",mobile: "1234567890"},{id:"m1", lastName: "raj", firstName: "Mohan", mobile: "2345678901", emailId:"mohan@xyz.com"},{id:"m2", lastName: "", firstName: "Mariappan", mobile: "3456789012", emailId:"mari@xyz.com"}];

const CreateGroup = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    function onCompleteForm(newGroup: Split){
        dispatch(addGroup(newGroup));
        navigate("/");
    }

    function onCancelForm(){
        navigate("/");
    }

    return (
        <div className="group-page-cont main-content-area">
            <GroupForm onComplete={onCompleteForm} onCancel={onCancelForm} memberList={tempMembers}/>
        </div>
    )
}

export default CreateGroup;