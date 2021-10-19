import React from 'react'
import s from './Button.module.scss'

type DefaultButtonPropsType = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type ButtonPropsType = DefaultButtonPropsType & {
    red?: boolean
    value?: string
}

export const Button: React.FC<ButtonPropsType> = (
    {
        red, className, value,
        ...restProps
    }
) => {
    const finalClassName = `${red && s.red} ${s.default} ${className}`

    return (
        <button className={finalClassName}{...restProps}>
            {value}
        </button>
    )
}
