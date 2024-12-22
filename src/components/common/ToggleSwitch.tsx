import "../../styles/components/common/ToggleSwitch.scss";
import ToggleSwitchProps from "../../models/ComponentModels/ToggleSwitchComponent";
import { useState } from "react";

const ToggleSwitch = ({checked, onToggle: onChange}: ToggleSwitchProps) => {
    const [isChecked, setIsChecked] = useState(checked);

    const onToggle = () => {
        setIsChecked(!isChecked);
        onChange();
    }

    return(
        <label className="toggle-switch clickable" data-checked={isChecked}>
            <input type="checkbox" data-checked={isChecked} onChange={onToggle} />
            <span className="slider round"></span>
        </label>
    );
}

export default ToggleSwitch;