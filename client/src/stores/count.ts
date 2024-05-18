import { create } from 'zustand'

// Definindo a interface para o estado do store
interface CounterState {
  countA: number
  countB: number
  setCountA: (value: number) => void
  setCountB: (value: number) => void
}

// Criando o store com tipagem forte
export const countStore = create<CounterState>((set) => ({
  countA: 0, // Valor inicial do contador A
  countB: 0, // Valor inicial do contador B
  setCountA: (value: number) =>
    set((state) => {
      console.log('stateA', state)
      return { countA: value }
    }),
  setCountB: (value: number) =>
    set((state) => {
      console.log('stateB', state)
      return { countB: value }
    }),
}))
