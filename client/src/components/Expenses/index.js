import React from 'react'
import './Expenses.css'

export const Expenses = (props) => {
    return (
        <div className="expensesBlock">
            <div className="amountOfMoney">
                <span>Income</span>
                <p className="earned">+₴{
                        props.transactions.reduce((prev, curr) => {
                            if (curr.amount > 0)
                                    return prev + curr.amount
                            return prev
                        }, 0)
                }</p>   
            </div>
            <div className="dividerBlock"></div>
            <div className="amountOfMoney">
                <span>Expense</span>
                <p className="spent">-₴{
                    -props.transactions.reduce((prev, curr) => {
                        if (curr.amount < 0)
                            return prev + curr.amount
                        return prev < 0 ? prev : 0
                    }, 0)
                }</p>
            </div>
        </div>
    )
}
