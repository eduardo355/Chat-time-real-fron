import { create } from "zustand"

export const useStore = create((set) => ({
    name: '',
    asigname: (value) => set(state => ({
        name: state.name = value
    }))
}))
