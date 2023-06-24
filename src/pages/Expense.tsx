import { useNavigate } from "react-router-dom";
import ExpenseForm from "../components/ExpenseForm";

const Expense = ({isEditMode = false}:{isEditMode?: boolean}) => {
    const navigate = useNavigate();
    return <ExpenseForm isEditMode={isEditMode} onCancel={() => navigate("../")}/>
}

export default Expense;