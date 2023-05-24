import React, {ReactNode, useState} from 'react'
import cl from 'classnames'
import s from './Button.module.scss'

type TypePropsButton = {
    children: ReactNode
    className?: string
    disabled?: boolean
    error?: string
    callBack: () => void
}

export const Button: React.FC<TypePropsButton> = (props) => {

    const {children, className, disabled, callBack} = props

    const onClickButtonHandler = () => {
        callBack()
    }

    return (
        <button className={cl(s.btnMain, className)} onClick={onClickButtonHandler} disabled={disabled}>{children}</button>
    )
}