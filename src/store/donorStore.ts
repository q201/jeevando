import { create } from 'zustand';
import type { Donor, DonationRecord, Match } from '@/types';
import { donorApi, matchingApi } from '@/api/endpoints';

interface DonorState {
    profile: Donor | null;
    donationHistory: DonationRecord[];
    matches: Match[];
    isLoading: boolean;
    error: string | null;
    fetchProfile: (donorId: string) => Promise<void>;
    updateAvailability: (donorId: string, isAvailable: boolean) => Promise<void>;
    fetchDonationHistory: (donorId: string) => Promise<void>;
    fetchMatches: (requestId: string) => Promise<void>;
    acceptMatch: (matchId: string) => Promise<void>;
    declineMatch: (matchId: string) => Promise<void>;
}

export const useDonorStore = create<DonorState>((set) => ({
    profile: null,
    donationHistory: [],
    matches: [],
    isLoading: false,
    error: null,

    fetchProfile: async (donorId: string) => {
        set({ isLoading: true, error: null });
        try {
            const profile = await donorApi.getProfile(donorId);
            set({ profile, isLoading: false });
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    },

    updateAvailability: async (donorId: string, isAvailable: boolean) => {
        set({ isLoading: true, error: null });
        try {
            const profile = await donorApi.updateAvailability(donorId, isAvailable);
            set({ profile, isLoading: false });
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    },

    fetchDonationHistory: async (donorId: string) => {
        set({ isLoading: true, error: null });
        try {
            const donationHistory = await donorApi.getDonationHistory(donorId);
            set({ donationHistory, isLoading: false });
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

    acceptMatch: async (matchId: string) => {
        set({ isLoading: true, error: null });
        try {
            await matchingApi.acceptMatch(matchId);
            set((state) => ({
                matches: state.matches.map((m) =>
                    m.id === matchId ? { ...m, status: 'accepted' as const } : m
                ),
                isLoading: false,
            }));
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    },

    declineMatch: async (matchId: string) => {
        set({ isLoading: true, error: null });
        try {
            await matchingApi.declineMatch(matchId);
            set((state) => ({
                matches: state.matches.map((m) =>
                    m.id === matchId ? { ...m, status: 'declined' as const } : m
                ),
                isLoading: false,
            }));
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    },
}));
