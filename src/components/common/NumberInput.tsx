interface NumberInputProps{
    value: number,
    placeHolder?: string,
    className?: string,
    onChange: (value: number) => void
}

const NumberInput = ({ value, placeHolder, className, onChange }: NumberInputProps) => {

    function onValueChange(e: any){
        onChange(e.target.value.replace(/[^\d.]/g, ""));
    }

    return <input type="text" value={value > 0 ? value : ""} onChange={onValueChange} placeholder={placeHolder} className={className} />;
}

export default NumberInput;