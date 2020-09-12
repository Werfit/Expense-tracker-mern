import React, { createContext, useReducer } from 'react'
import TransactionReducer from './TransactionReducer'
import axios from 'axios'

// Transaction List
const initialState = {
    transactions: [],
    error: null
}

export const TransactionContext = createContext()

export const TransactionProvider = ({ children }) => {
    const [state, dispatch] = useReducer(TransactionReducer, initialState)

    const config = {
        headers: {
            'Content-type': 'application/json'
        }
    }

    // Actions
    async function getTransactions (userId) {
        try {
            const res = await axios.post('/api/v1/transactions/', { userId }, config)

            if (res.data.data)
                dispatch({
                    type: 'GET',
                    payload: JSON.parse(res.data.data.transactions)
                })

        } catch (err) {
            dispatch({
                type: 'ERROR',
                payload: err.response.data.error
            })
        }
    }

    async function deleteTransaction (userId, _id) {
        try {
            await axios.delete(`/api/v1/transactions/${userId}/${_id}`)

            dispatch({
                type: 'DELETE',
                payload: _id
            })
        } catch (err) {
            dispatch({
                type: 'ERROR',
                payload: err.response.data.error
            })
        }
    }

    async function addTransaction (transaction) {
        try {
            const res = await axios.post('/api/v1/transactions/new-transaction', transaction, config)

            dispatch({
                type: 'ADD',
                payload: res.data.data
            })
        } catch (err) {
            dispatch({
                type: 'ERROR',
                payload: err.response.data.error
            })
        }
    }

    return (
        <TransactionContext.Provider value={{
            transactions: state.transactions,
            getTransactions,
            deleteTransaction,
            addTransaction
        }}>
            { children }
        </TransactionContext.Provider>
    )
}