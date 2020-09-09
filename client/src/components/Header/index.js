import React, { useContext } from 'react'
import './Header.css'

import { Expenses } from '../Expenses'

// Context Import
import { TransactionContext } from '../../context/TransactionContext'

export const Header = () => {
    const { transactions } = useContext(TransactionContext)

    return (
        <header>
            <div className="expensesInfo">
                <h1>₴{ transactions.reduce((prev, curr) => {
                    return prev + curr.amount
                }, 0) }</h1>
                <p>Records: { transactions.length }</p>
            </div>

            <Expenses transactions={ transactions }/>
        </header>
    )
}