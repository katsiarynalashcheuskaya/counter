import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react';
import s from './Button.module.css'

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement>

type ButtonPropsType = DefaultButtonPropsType & {
    xType?: string
}

const Button: React.FC<ButtonPropsType> = (
    {
        xType,
        className,
        disabled,
        ...restProps
    } )=> {

    const finalClassName = `${s.button} + ${(disabled ? s.disabled : '')}`
    return (
        <button
            className={finalClassName}
            disabled={disabled}
            {...restProps}/>
    );
};

export default Button;