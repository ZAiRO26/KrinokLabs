import { create } from 'zustand';

type CursorState = 'default' | 'hover' | 'view';

interface UIState {
    // Menu
    isMenuOpen: boolean;
    toggleMenu: () => void;
    setMenuOpen: (open: boolean) => void;

    // Loading
    isLoading: boolean;
    setLoading: (loading: boolean) => void;

    // Page transition
    isTransitioning: boolean;
    setTransitioning: (transitioning: boolean) => void;

    // Cursor
    cursorState: CursorState;
    setCursorState: (state: CursorState) => void;
}

export const useStore = create<UIState>((set) => ({
    // Menu state
    isMenuOpen: false,
    toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
    setMenuOpen: (open) => set({ isMenuOpen: open }),

    // Loading state
    isLoading: true,
    setLoading: (loading) => set({ isLoading: loading }),

    // Transition state
    isTransitioning: false,
    setTransitioning: (transitioning) => set({ isTransitioning: transitioning }),

    // Cursor state
    cursorState: 'default',
    setCursorState: (state) => set({ cursorState: state }),
}));
