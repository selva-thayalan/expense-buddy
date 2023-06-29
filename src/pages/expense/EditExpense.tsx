import { useNavigate, useParams } from "react-router-dom";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import ExpenseForm from "../../components/ExpenseForm";
import { ExpenseFormModel } from "../../models/Common";
import { Expense } from "../../models/Expense";
import { updateExpense } from "../../store/actions/expenseActions";
import { RootState } from "../../store/store";

const EditExpense = () => {
    const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    var { expenseId } = useParams();
    const expense = useTypedSelector(state => state.expenses.find(exp => exp.id === expenseId))
    
    function onCompleteEdit(modifiedExpense: ExpenseFormModel){
        if(expense){
            var updatedExp: Expense = {...expense, ...modifiedExpense, time: new Date()};
            dispatch(updateExpense(updatedExp));
            navigate("../");
        }
    }

    return <ExpenseForm
            isEditMode={true}
            expenseModel={expense}
            onComplete={onCompleteEdit}
            onCancel={() => navigate("../")}/>
}

export default EditExpense;