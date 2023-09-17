import "../../styles/components/common/StyledButton.scss";

interface StyledButtonProps{
    title: string,
    buttonStyle?: ButtonStyle
    customClass?: string,
    iconClass?: string,
    onClick: () => void
}

enum ButtonStyle{
    default,
    float
}

const ButtonStyleClasses = {
    [ButtonStyle.default]:"default-btn",
    [ButtonStyle.float]: "float-action-btn"
}



const StyledButton = ({title, iconClass, customClass, buttonStyle = ButtonStyle.default, onClick}: StyledButtonProps) => {
    return (
        <button className={`${ButtonStyleClasses[buttonStyle]} ${customClass ?? ""}`} onClick={() => onClick()}>
            <p>{title}</p>
            {iconClass && <i className={iconClass}></i>}
        </button>
    )
}

export { StyledButton as default, ButtonStyle };