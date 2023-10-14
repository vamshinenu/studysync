import { create } from 'zustand';

const useStore = create((set, get) => ({
    searchTerm: '',
    setSearchTerm: (searchTerm: string) => set({ searchTerm }),
    menuHovered: false,
    setMenuHovered: (menuHovered: boolean) => set({ menuHovered }),
    candidates: [],
    setCandidates: async (candidates: any) => set({ candidates }),
    currentUser: {},
    setCurrentUser: async (currentUser: any) => set({ currentUser }),
    sortTerm: 'all',
    setSortTerm: (sortTerm: string) => set({ sortTerm }),
    candidate: {},
    setCandidate: (candidate: any) => set({ candidate }),
    notifications: [],
    // setNotifications: (notification: any) => set({ notifications: [...get().notifications, notification] }),
}));

export default useStore;