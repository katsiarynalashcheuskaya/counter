import React, {
    ChangeEvent,
    DetailedHTMLProps,
    InputHTMLAttributes,
    ReactNode,
} from 'react'
import s from './Input.module.css'

type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement>

type SuperInputTextPropsType = Omit<DefaultInputPropsType, 'type'> & {
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: ReactNode
    spanClassName?: string
}

const Input: React.FC<SuperInputTextPropsType> = (
    {
        onChange,
        onChangeText,
        onKeyPress,
        onEnter,
        error,
        className,
        spanClassName,
        id,
        ...restProps
    }
) => {
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange?.(e)
        onChangeText?.(e.currentTarget.value)
    }

    const finalInputClassName = s.input
        + (error ? ' ' + s.errorInput : ' ' + s.superInput)
        + (className ? ' ' + s.className : '')

    return (
        <div className={s.inputWrapper}>
            <input
                id={id}
                type={'number'}
                onChange={onChangeCallback}
                className={finalInputClassName}
                {...restProps}
            />
        </div>
    )
}

export default Input
