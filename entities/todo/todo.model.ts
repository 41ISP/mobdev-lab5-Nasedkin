import AsyncStorage from "@react-native-async-storage/async-storage"
import { create } from "zustand"
import { persist, createJSONStorage } from 'zustand/middleware'

export interface ITodo {
    name: string,
    id: string,
    state: boolean
}
export interface IStorage {
    todos: ITodo[]
}

export const useStorage = create<IStorage>()(
    persist((set) => ({
        todos: []
    }), {
        name: "taskName",
        storage: createJSONStorage(()=>AsyncStorage)
    })
)