import React, {ReactNode, useRef} from 'react';
import cl from 'classnames'
import s from './Span.module.scss'

type TypePropsSpan = {
    children: ReactNode
    maxValue: number
    error: string
    className: string
}

export const Span: React.FC<TypePropsSpan> = (props) => {

    const {children, error, maxValue, className} = props

    const styleSpan = useRef<HTMLSpanElement>(null)

    if (styleSpan.current !== null) {
        if ((typeof children) === 'number') {
            styleSpan.current.style.fontSize = '82px'
        } else {
            styleSpan.current.style.fontSize = ''
        }
        if (children === maxValue) {
            styleSpan.current.classList.add(`${s.spanStopAnime}`)
        }else{
            styleSpan.current.classList.remove(`${s.spanStopAnime}`)
        }
    }

    return (
        <div className={cl(error === 'stop' ? s.spanStop : '', className)}>
            <span ref={styleSpan}>{children}</span>
        </div>
    )
}