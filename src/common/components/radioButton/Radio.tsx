import React from 'react'
import s from './Radio.module.scss'

type DefaultRadioPropsType = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type RadioPropsType = DefaultRadioPropsType & {
    options: Array<string>
    onChangeOption?: (option: string) => void
    labelClassName?: string
}

export const Radio: React.FC<RadioPropsType> = (
    {
        type, name,
        options, value,
        onChange, onChangeOption,
        className, labelClassName,
        ...restProps
    }
) => {
    const onChangeCallback = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e)
        onChangeOption && onChangeOption(e.currentTarget.value)
    }

    const mappedOptions: JSX.Element[] = options ?
        options.map((option, index) => (
            <label key={name + '-' + index} className={s.label + ' ' + (labelClassName || '')}>
                <input
                    type={'radio'}
                    name={name}
                    value={option}
                    checked={option === value}
                    onChange={onChangeCallback}
                    className={s.radio + ' ' + (className || '')}
                    {...restProps}
                />
                {option}
            </label>
        )) : []

    return (
        <>
            {mappedOptions}
        </>
    )
}
