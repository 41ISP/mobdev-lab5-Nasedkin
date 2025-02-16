import AsyncStorage from "@react-native-async-storage/async-storage"
import { create } from "zustand"
import { persist, createJSONStorage } from 'zustand/middleware'

export interface ITask {
    name: string,
    id: string,
    state: boolean
}
export interface IStorage {
    tasks: ITask[],
    deleteTask: (id: string) => void,
    addTask: (task: ITask) => void,
    toggleSwitch: (id: string) => void
}

export const useStorage = create<IStorage>()(
    persist(
        (set) => ({
            tasks: [],
            addTask: (task) => set((a) => ({ ...a, tasks: [...a.tasks, task] })),
            deleteTask: (id) => set((state) => ({ ...state, tasks: state.tasks.filter((task) => task.id !== id) })),
            toggleSwitch: (id) => set((state) => ({...state, tasks: state.tasks.map((tsk) => tsk.id === id ? { ...tsk, state: !tsk.state } : tsk)}))
        }), {
        name: "taskName",
        storage: createJSONStorage(() => AsyncStorage)
    })
)