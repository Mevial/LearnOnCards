import React from 'react'
import s from './Select.module.scss'

type DefaultSelectPropsType = React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>
type SelectPropsType = DefaultSelectPropsType & {
    options: Array<string>
    onChangeOption?: (option: string) => void
}

export const Select: React.FC<SelectPropsType> = (
    {
        options,
        onChange, onChangeOption,
        className,
        ...restProps
    }
) => {
    const mappedOptions: JSX.Element[] = options ? options.map((option, index) =>
        <option className={s.option} key={option + '-' + index}>{option}</option>) : []

    const onChangeCallback = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange && onChange(e)
        onChangeOption && onChangeOption(e.currentTarget.value)
        finalClasses = finalClasses + s.onBlur
    }

    let finalClasses = s.select + ' ' + (className || '')

    return (
        <select className={finalClasses} onChange={onChangeCallback} {...restProps}>
            {mappedOptions}
        </select>
    )
}
