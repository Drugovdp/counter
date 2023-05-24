import { ChangeEvent, useState } from "react"
import s from './Counter.module.scss'

type TypePropsCounter = {}

export const Counter: React.FC<TypePropsCounter> = (props) => {

    const { } = props

    const [valueCounter, setValueCounter] = useState(0)
    const [choiceValue, setChoiceValue] = useState('')
    const [disableChange, setDisableChange] = useState(true)
    const [error, setError] = useState('')

    const incValueCounter = () => {
        setValueCounter(valueCounter + 1)
    }

    const resetValueCounter = () => {
        setValueCounter(0)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setChoiceValue(e.currentTarget.value)
    }

    const onClickConfirmValueHahdler = () => {
        if (Number(choiceValue) <= 0) {
            setError('error')
            setChoiceValue('')
        } else {
            setError('')
        }
    }

    const classInput = `${error ? s.error : ''}` 

    return (
        <div className={s.wrapper}>
            <div className={s.counter}>
                <input type='number' value={choiceValue} className={classInput} onChange={onChangeHandler} />
                
                <button className={s.counterConf} onClick={onClickConfirmValueHahdler} disabled={!disableChange}>Confirm</button>
                <div className={s.counterValue}><span>{valueCounter}</span></div>
                <button className={s.counterInc} onClick={incValueCounter} disabled={disableChange}>inc</button>
                <button className={s.counterReset} onClick={resetValueCounter} disabled={disableChange}>reset</button>
            </div>
        </div>
    )
}