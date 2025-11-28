import { create } from 'zustand';
import type { BloodRequest, Match } from '@/types';
import { patientApi, matchingApi } from '@/api/endpoints';

interface PatientState {
    requests: BloodRequest[];
    matches: Match[];
    isLoading: boolean;
    error: string | null;
    fetchRequests: (patientId: string) => Promise<void>;
    createRequest: (request: Omit<BloodRequest, 'id' | 'createdAt' | 'patient'>) => Promise<void>;
    fetchMatches: (requestId: string) => Promise<void>;
}

export const usePatientStore = create<PatientState>((set) => ({
    requests: [],
    matches: [],
    isLoading: false,
    error: null,

    fetchRequests: async (patientId: string) => {
        set({ isLoading: true, error: null });
        try {
            const requests = await patientApi.getRequests(patientId);
            set({ requests, isLoading: false });
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    },

    createRequest: async (request: Omit<BloodRequest, 'id' | 'createdAt' | 'patient'>) => {
        set({ isLoading: true, error: null });
        try {
            const newRequest = await patientApi.createRequest(request);
            set((state) => ({
                requests: [...state.requests, newRequest],
                isLoading: false,
            }));
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    },

    fetchMatches: async (requestId: string) => {
        set({ isLoading: true, error: null });
        try {
            const matches = await matchingApi.findMatches(requestId);
            set({ matches, isLoading: false });
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    },
}));
