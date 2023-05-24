import React, {ChangeEvent, ReactNode} from "react";
import s from "./Input.module.scss"

type TypePropsInput = {
    value: number
    error?: string
    disabledInput?: boolean
    className?: string
    children?: ReactNode
    callBack: (valueInput: number) => void
}

export const Input: React.FC<TypePropsInput> = (props) => {

    const {value, callBack, error, className, children, disabledInput} = props

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        callBack(Number(e.currentTarget.value))
    }

    const classInput = `${error === 'error' ? s.error : ''}`

    return (
        <label className={className}>{children}
            <input className={classInput} type="number" value={value} onChange={onChangeHandler} disabled={disabledInput}/>
        </label>
    )
}