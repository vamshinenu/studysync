import { create } from 'zustand';
import { User } from './app/components/UserInit';

const useStore = create((set, get) => ({
    longitude: -1000,
    setLongitude: (longitude: number) => set({ longitude }),
    latitude: -1000,
    setLatitude: (latitude: number) => set({ latitude }),
    user: '',
    setUser: (user: User) => set({ user }),

}));

export default useStore;