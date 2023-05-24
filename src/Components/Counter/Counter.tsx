import {useEffect, useState} from "react"
import s from './Counter.module.scss'
import {Input} from "../Input/Input";
import {Button} from "../Button/Button";
import {Span} from "../Span/Span";

type TypePropsCounter = {}

export const Counter: React.FC<TypePropsCounter> = (props) => {

    const {} = props

    const defaultValue = "Enter value and pres set"
    const defaultValueError = "Incorrect value!"

    const start = localStorage.getItem('start')
    const startLocalStorageValue = start ? JSON.parse(start) : 0

    const max = localStorage.getItem('max')
    const maxLocalStorageValue = max ? JSON.parse(max) : 0

    //----------------------------------------------------------------//
    // Блок локального стейта - значения начальные по умолчания (default)
    //Начальные состояния окна счётчика, maxValue и startValue
    const [defoltValueCounter, setDefoltValueCounter] = useState<string | number>(defaultValue)
    const [maxValue, setMaxValue] = useState(maxLocalStorageValue)
    const [startValue, setStartValue] = useState(startLocalStorageValue)
    //Начальное состояние кнопок set, inc, reset- все отключены (не кликабельны)
    //кнопка set
    const [disabledSet, setDisabledSet] = useState(true)
    //кнопка inc
    const [disabledInc, setDisabledInc] = useState(true)
    //кнопка reset
    const [disabledReset, setDisabledReset] = useState(true)
    //Начальное состояние ошибки - пустая строка
    const [error, setError] = useState('')
    //----------------------------------------------------------------------//

    //Блок проверки на недопустимый ввод
    //Функции вспомогательные isError - исключаем повторение кода
    const isError = (valueError: string, valueDisSet: boolean) => {
        setError(valueError)
        setDisabledSet(valueDisSet)
    }

    //Проверка на недопустимый ввод осуществляется благодаря useEffect, при изменениях значений maxValue и startValue,
    //срабатывает хук useEffect с проверкой условий.
    useEffect(() => {
        if (maxValue === 0) {
            // setStartValue(maxValue)
            isError('', true)
        }
        if (maxValue > 0) {
            isError('', false)
        }
        if (maxValue < 0 || startValue < 0) {
            isError('error', true)
        }
        if (maxValue <= startValue && maxValue !== 0 && startValue !== 0) {
            isError('error', true)
        }
        localStorage.setItem("max", JSON.stringify(maxValue))
        localStorage.setItem("start", JSON.stringify(startValue))
    }, [maxValue, startValue])

    //---------------------------------------------------------------------//

    //Блок функций срабатывающих на изменения в Input.
    //Функция вспомогательная changeHelperFunction - исключаем повторение кода.
    const changeHelperFunction = () => {
        setDefoltValueCounter(defaultValue)
        setDisabledInc(true)
        setDisabledReset(true)
    }

    //Функция меняет значение maxValue при изменениях в input.
    const changeMaxValueHandler = (maxValueInp: number) => {
        setMaxValue(maxValueInp)
        changeHelperFunction()
    }

    //Функция меняет значение startValue при изменениях в input.
    const changeStartValueHandler = (startValueInp: number) => {
        setStartValue(startValueInp)
        changeHelperFunction()
    }
    //----------------------------------------------------------//


    //Блок функций для кнопок, запускаются при событии onClick.
    //Функция вспомогательная clickHelperFunc - исключаем повторение кода.
    const clickHelperFunc = (valueErr: string, valueSetDisInc: boolean, valueSetDisRes: boolean) => {
        setError(valueErr)
        setDisabledInc(valueSetDisInc)
        setDisabledReset(valueSetDisRes)
    }

    //Кнопка set.
    const onClickSetHandler = () => {
        setDefoltValueCounter(startValue)
        setDisabledSet(true)
        clickHelperFunc('', false, true)
    }

    //Кнопка inc.
    const onClickIncHandler = () => {
        setDisabledReset(false)
        setDefoltValueCounter(Number(defoltValueCounter) + 1)
        if (Number(defoltValueCounter) + 1 === maxValue) {
            clickHelperFunc('stop', true, false)
        }
    }

    //Кнопка reset.
    const onClickResetHandle = () => {
        setDefoltValueCounter(startValue)
        clickHelperFunc('', false, false)
    }
    //----------------------------------------------------------------------------//

    //Значение переменной valueCounterSpan меняется в зависимости от ввода значения в input, либо "Enter value and pres set"
    //либо "Incorrect value!", а также присваивается значение при клике на кнопку set, т.е. - startValue.
    //Данная переменная используется для вывода данных в окне счётчика в компоненте Span через children.
    const valueCounterSpan = error !== 'error' ? defoltValueCounter : defaultValueError

    return (
        <div className={s.wrapper}>
            <h1 className={s.wrapperTitle}>Counter</h1>
            <div className={s.wrapperCounter}>
                <div className={s.managerCount}>
                    <div className={s.managerCountInput}>
                        <Input className={s.managerCountInputLabel} value={maxValue} callBack={changeMaxValueHandler}
                               error={error}>max value:</Input>
                        <Input className={s.managerCountInputLabel} value={startValue}
                               callBack={changeStartValueHandler} error={error}>start value</Input>
                    </div>
                    <Button className={s.managerCountSet} callBack={onClickSetHandler} error={error}
                            disabled={disabledSet}>set</Button>
                </div>
                <div className={s.counter}>
                    <Span className={s.counterValue} maxValue={maxValue} error={error}>{valueCounterSpan}</Span>
                    <Button className={s.counterInc} callBack={onClickIncHandler} disabled={disabledInc}>inc</Button>
                    <Button className={s.counterReset} callBack={onClickResetHandle}
                            disabled={disabledReset}>reset</Button>
                </div>
            </div>
        </div>
    )
}