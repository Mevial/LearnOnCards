import React, {useState} from 'react'
import s from './EditableSpan.module.scss'
import {InputText} from '../inputText/InputText';

type DefaultInputPropsType = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type DefaultSpanPropsType = React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>

type EditableSpanType = DefaultInputPropsType & {
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string
    spanClassName?: string

    spanProps?: DefaultSpanPropsType
}

export const EditableSpan: React.FC<EditableSpanType> = (
    {
        autoFocus,
        onBlur,
        onEnter,
        spanProps,

        ...restProps
    }
) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const {children, onDoubleClick, className, ...restSpanProps} = spanProps || {}

    const onEnterCallback = () => {
        setEditMode(false)
        onEnter && onEnter()
    }
    const onBlurCallback = (e: React.FocusEvent<HTMLInputElement>) => {
        setEditMode(false)
        onBlur && onBlur(e)
    }
    const onDoubleClickCallBack = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        setEditMode(true)
        onDoubleClick && onDoubleClick(e)
    }

    const spanClassName = `${s.span} ${className}`

    return (
        <div className={s.divSpan}>
            {editMode
                ? (
                    <InputText
                        autoFocus
                        onBlur={onBlurCallback}
                        onEnter={onEnterCallback}
                        className={s.input}

                        {...restProps}
                    />
                ) : (
                    <span onDoubleClick={onDoubleClickCallBack} className={spanClassName} {...restSpanProps}>
                        ✎ {children || restProps.value}
                    </span>
                )
            }
        </div>
    )
}