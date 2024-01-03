import { FC } from 'react'
import s from './Form.module.scss'
import { IButton } from './form.interface'
import cn from 'classnames'

const Button: FC<IButton> = ({ children, className, ...rest }) => {
    return (
        <button className={cn(s.root__button, className)} {...rest}>
            {children}
        </button>
    )
}

export default Button