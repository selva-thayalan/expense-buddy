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

interface ShareView{
    name: string,
    id: string,
}

interface EqualShareView extends ShareView{
    isSelected: Boolean
}

interface UnequalShareView extends ShareView{
    amount: number
}

export { type ShareComponentProps as default, type EqualShareView, type UnequalShareView }