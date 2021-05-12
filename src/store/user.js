import create from 'zustand'
import { devtools } from 'zustand/middleware'
// USER STORE

const userStore = create(devtools((set) => ({
    user: undefined,
    error: undefined,
    isLoading: true,
    faunaClient: undefined,
    getFauna: () => {
        // TODO FAUNA
    },
    checkSession: () => new Promise((resolve) => {
        set(state => ({ ...state,user:undefined, isLoading: true }))
        
        fetch('/api/auth/me')
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error('The request to the profile has failed!')
            })
            .then(user => set(state => {
                // TODO FAUNA
                state.getFauna()
                return({ ...state, user, error: undefined })
            }
            ))
            .catch(error => set(state => ({ ...state, user: null, error })))
            .finally(() => {
                set(state => ({ ...state, isLoading: false }))
                resolve(undefined)
            })
    })
})))

export default userStore