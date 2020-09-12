import React, { Component } from 'react'

// Context Import
import { TransactionProvider } from '../context/TransactionContext'

// Components Import
import { Header } from './Header'
import { History } from './History'
import { Transaction } from './Transaction'
import { LogOut } from '../components/LogOut'

export class TrackerPage extends Component {
    render () {
        return (
            <>
                <TransactionProvider>
                    <Header />
                    <History />
                    <Transaction />
                    <LogOut />
                </TransactionProvider>
            </>
        )
    }
}
