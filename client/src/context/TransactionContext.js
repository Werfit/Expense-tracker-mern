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

    // Actions
    async function getTransactions () {
        try {
            const res = await axios.get('/api/v1/transactions/')

            dispatch({
                type: 'GET',
                payload: res.data.data.reverse()
            })
        } catch (err) {
            dispatch({
                type: 'ERROR',
                payload: err.response.data.error
            })
        }
    }

    async function deleteTransaction (id) {
        try {
            await axios.delete(`/api/v1/transactions/${id}`)

            dispatch({
                type: 'DELETE',
                payload: id
            })
        } catch (err) {
            dispatch({
                type: 'ERROR',
                payload: err.response.data.error
            })
        }
    }

    async function addTransaction (transaction) {
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        try {
            const res = await axios.post('/api/v1/transactions/', transaction, config)

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