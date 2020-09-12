export default (state, action) => {
    switch (action.type) {
        case 'GET':
            console.log(action.payload)
            return {
                ...state,
                transactions: action.payload
            }
        case 'DELETE':
            return {
                ...state,
                transactions: state.transactions.filter(transaction => transaction._id !== action.payload)
            }
        case 'ADD':
            console.log ({
                ...state,
                transactions: [
                    action.payload,
                    ...state.transactions
                ]
            })
            return {
                ...state,
                transactions: [
                    action.payload,
                    ...state.transactions
                ]
            }
        case 'ERROR':
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}