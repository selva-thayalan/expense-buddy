import { Member } from "../Member";
import { Share } from "../Share";

interface ShareComponentProps{
    isEditMode?: Boolean,
    shares?: Share[],
    members: Member[],
    amount: number,
    onComplete : (shares: Share[]) => void,
    onCancel: () => void
}

interface EqualShareView{
    name: string,
    id: string,
    isSelected: Boolean
}

interface UnequalShareView{
    name: string,
    id: string,
    amount: number
}

export { type ShareComponentProps as default, type EqualShareView, type UnequalShareView }