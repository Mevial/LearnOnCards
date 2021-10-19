import React from 'react'
import s from './Range.module.scss'

type DefaultInputPropsType = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type RangePropsType = DefaultInputPropsType & {
    onChangeRange?: (value: number) => void
};

export const Range: React.FC<RangePropsType> = (
    {
        type,
        onChange, onChangeRange,
        className,

        ...restProps
    }
) => {
    const onChangeCallback = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(e)
        onChangeRange && onChangeRange(+e.currentTarget.value)
    }

    const finalRangeClassName = `${s.range} ${className || ''}`

    return (
            <input
                type={'range'}
                onChange={onChangeCallback}
                className={finalRangeClassName}
                value={restProps.value}

                {...restProps}
            />
    )
}
