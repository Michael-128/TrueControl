import { useContext } from 'react';
import { TrueNasContext } from '../Contexts/TrueNasContext';

export function useTrueNas() {
    const context = useContext(TrueNasContext);
    if (!context) {
        throw new Error("useTrueNas must be used within a TrueNasProvider");
    }
    return context;
}