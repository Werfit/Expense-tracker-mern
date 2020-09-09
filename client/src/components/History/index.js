import React, { useContext, useEffect } from 'react'
import { Expense } from '../Expense'
import './History.css'

// Context Import
import { TransactionContext } from '../../context/TransactionContext'

// Months
const monthsList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

export const History = () => {
    const { transactions, getTransactions } = useContext(TransactionContext)

    // eslint-disable-next-line
    useEffect(() => {
        getTransactions()
    }, []) // It slows down when `getTransactions in here`

    let lastDate = [-1, -1]

    return (
        <div className="historyBlock sectionBlock">
            <h2>History</h2>

            <div className="expensesList">
                {
                    transactions.map(transaction => {
                        let toShowDate = false
                        if (transaction.createdAt[0] !== lastDate[0] || transaction.createdAt[1] !== lastDate[1])
                        {
                            lastDate = transaction.createdAt
                            toShowDate = true
                        }

                        return (
                            <span key={transaction._id}>
                                <h4>{ toShowDate ? monthsList[transaction.createdAt[0]] : '' }</h4>
                                <Expense name={ transaction.name } amount={ transaction.amount } _id={ transaction._id } />
                            </span>
                        )
                    })
                }
            </div>
        </div>
    )
}
