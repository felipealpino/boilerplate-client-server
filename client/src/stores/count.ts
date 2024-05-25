import { create } from 'zustand';

// Definindo a interface para o estado do store

export type CounterAction = { action: 'add' | 'remove' };
interface CounterState {
  socketCount: number;
  count: number;
  setSocketCount: (value: number, action: CounterAction) => void;
  setCount: (value: number) => void;
}

// Criando o store com tipagem forte
export const countStore = create<CounterState>((set) => ({
  socketCount: 0, // Valor inicial do contador A
  count: 0, // Valor inicial do contador B
  setSocketCount(value, args) {
    set((state) => {
      console.log('setSocketCount', value, args);

      return { socketCount: args.action === 'add' ? state.socketCount + value : state.socketCount - value };
    });
  },

  setCount: (value: number) =>
    set((state) => {
      console.log('setCount', state);
      return { count: value };
    }),
}));
