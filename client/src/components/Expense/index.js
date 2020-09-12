import React, { useState, useContext } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import './Expense.css'
import X from './x.svg'

// Context Import
import { TransactionContext } from '../../context/TransactionContext'

export const Expense = ({ name, amount, _id }) => {
    const [closeButtonState, setCloseButtonState] = useState(false)

    const { user } = useAuth0()
    const { deleteTransaction } = useContext(TransactionContext)

    return (
        <div className={`expenseBlock ${closeButtonState ? 'toClose' : ''}`} >
            <div className="removeItem" onClick={ () => {
                setCloseButtonState(false)
                deleteTransaction(user.sub, _id)
            }}>
                <img src={X} alt="X" />
            </div>
            <div className={`expenseItem__block ${(amount > 0) ? 'incomeItem' : 'expenseItem'}`} onClick={ () => setCloseButtonState(!closeButtonState) }>
                <span>{ name.charAt(0).toUpperCase() + name.slice(1) }</span>
                <span>{ amount > 0 ? `+₴${ amount }` : `-₴${ -amount }` }</span>
            </div>
        </div>
    )
}
