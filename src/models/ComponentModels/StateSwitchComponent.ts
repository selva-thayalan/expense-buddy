enum StateStyle{
    radio,
    tab
}

interface StateSwitchOption{
    label: string,
    value: any
}

interface StateSwitchProps{
    style: StateStyle,
    options: StateSwitchOption[],
    value: any,
    onChange: (value: any, index?: number) => void
}

export {type StateSwitchProps as default, type StateSwitchOption, StateStyle};