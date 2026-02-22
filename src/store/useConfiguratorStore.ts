import { create } from 'zustand';

interface ConfiguratorState {
  carcasaSuperiorColor: string;
  carcasaBaseColor: string;
  ruedaColor: string;
  botonesColor: string;
  setCarcasaSuperiorColor: (color: string) => void;
  setCarcasaBaseColor: (color: string) => void;
  setRuedaColor: (color: string) => void;
  setBotonesColor: (color: string) => void;
}

export const useConfiguratorStore = create<ConfiguratorState>((set) => ({
  carcasaSuperiorColor: '#ffffff', // Blanco
  carcasaBaseColor: '#3b82f6',   // Azul por defecto (como en tu imagen)
  ruedaColor: '#101010',
  botonesColor: '#101010',
  
  setCarcasaSuperiorColor: (color) => set({ carcasaSuperiorColor: color }),
  setCarcasaBaseColor: (color) => set({ carcasaBaseColor: color }),
  setRuedaColor: (color) => set({ ruedaColor: color }),
  setBotonesColor: (color) => set({ botonesColor: color }),
}));