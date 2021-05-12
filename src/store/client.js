import create from 'zustand'

const useClientStore = create(set => ({
    clientId: 0,
    setClient: (id) => {
        set(state => ({...state, clientId : id}))
    }
}))
const { subscribe, getState, setState } = useClientStore

const unsub = subscribe((state) => {
    console.log(state)
}, state => state.clientId)

unsub()

export default useClientStore