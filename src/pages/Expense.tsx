import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import ExpenseForm from "../components/ExpenseForm";
import addNewExpenseAction from "../store/actions/expense/addNewExpenseAction";
import { ExpenseFormModel } from "../models/Common";
import { Expense as ExpenseModel } from "../models/Expense";

const Expense = ({isEditMode = false}:{isEditMode?: boolean}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    var { splitId } = useParams();

    function onCompleteEdit(modifiedExpense: ExpenseFormModel){

    }

    function onCompleteAdd(newExpense: ExpenseFormModel){
        var expense: ExpenseModel = {...newExpense, splitId: splitId||"g0", id:"e04", time: new Date()};
        dispatch(addNewExpenseAction(expense));
        navigate("../");
    }

    return <ExpenseForm 
                isEditMode={isEditMode} 
                onComplete={isEditMode ? onCompleteEdit : onCompleteAdd}
                onCancel={() => navigate("../")}/>
}

export default Expense;