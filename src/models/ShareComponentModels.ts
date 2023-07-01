import { Member } from "./Member";
import { Share } from "./Share";

interface ShareComponentProps{
    isEditMode?: Boolean,
    shares?: Share[],
    members: Member[],
    amount: number,
    onComplete : (shares: Share[]) => void
}

interface EqualShareView{
    name: string,
    id: string,
    isSelected: Boolean
}

export { type ShareComponentProps as default, type EqualShareView }