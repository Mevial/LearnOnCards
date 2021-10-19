import React from 'react'
import s from './Checkbox.module.scss'

type DefaultInputPropsType = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type CheckboxPropsType = DefaultInputPropsType & {
    onChangeChecked?: (checked: boolean) => void
    spanClassName?: string
}

export const Checkbox: React.FC<CheckboxPropsType> = (
    {
        type,
        onChange, onChangeChecked,
        className, spanClassName,
        children,

        ...restProps
    }
) => {
    const onChangeCallback = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChangeChecked && onChangeChecked(e.currentTarget.checked)
        onChange && onChange(e)
    }

    const finalInputClassName = `${s.checkbox} ${className || ''}`

    return (
        <label className={s.label}>
            <input
                type={'checkbox'}
                onChange={onChangeCallback}
                className={finalInputClassName}

                {...restProps}
            />
            {children && <span className={s.spanClassName}>{children}</span>}
        </label>
    )
}
