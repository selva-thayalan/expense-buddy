import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import ExpenseForm from "../../components/ExpenseForm";
import { ExpenseFormModel } from "../../models/Common";
import { Expense as ExpenseModel } from "../../models/Expense";
import { addExpense } from "../../store/actions/expenseActions";

const AddExpense = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    var { splitId } = useParams();

    function onCompleteAdd(newExpense: ExpenseFormModel){
        var expense: ExpenseModel = {...newExpense, splitId: splitId||"g0", id:"e04", time: new Date()};
        dispatch(addExpense(expense));
        navigate("../");
    }

    return <ExpenseForm 
                onComplete={onCompleteAdd}
                onCancel={() => navigate("../")}/>
}

export default AddExpense;