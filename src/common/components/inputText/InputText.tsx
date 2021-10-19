import React from "react";
import s from './InputText.module.scss'

type DefaultInputPropsType = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type InputTextPropsType = DefaultInputPropsType & {
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string
    errorClassName?: string
    label?: string
    labelClassName?: string
}

export const InputText: React.FC<InputTextPropsType> = (
    {   type,
        onChange, onChangeText,
        onKeyPress, onEnter,
        error, label,
        labelClassName,
        className, errorClassName,

        ...restProps
    } ) => {
    const onChangeCallback = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e)
        onChangeText && onChangeText(e.currentTarget.value)
    }
    const onKeyPressCallback = (e: React.KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e);
        (onEnter && e.key === 'Enter') && onEnter()
    }

    const finalSpanClassName = `${s.error} ${errorClassName || ''}`
    const finalInputClassName = `${s.input} ${error && s.errorInput} ${s.superInput} ${className || ''}`

    return (
        <div className={s.divInput}>
            <span className={`${s.label} ${labelClassName || ''}`}>{label}</span>
            <input
                type={type || 'text'}
                onChange={onChangeCallback}
                onKeyPress={onKeyPressCallback}
                className={finalInputClassName}

                {...restProps}
            />
            {error && <span className={finalSpanClassName}>{error}</span>}
        </div>
    )
}