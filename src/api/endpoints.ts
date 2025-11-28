import type {
    AuthResponse,
    LoginCredentials,
    RegisterData,
    User,
    Donor,
    BloodRequest,
    DonationRecord,
    Match,
    Notification,
    AnalyticsData,
} from '@/types';
import { mockApi } from './mockApi';

// Auth API
export const authApi = {
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        return mockApi.login(credentials);
    },

    register: async (data: RegisterData): Promise<AuthResponse> => {
        return mockApi.register(data);
    },

    getMe: async (): Promise<User> => {
        const token = localStorage.getItem('auth_token');
        if (!token) {
            throw new Error('No token found');
        }
        return mockApi.getMe(token);
    },

    logout: async (): Promise<void> => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
    },
};

// Donor API
export const donorApi = {
    getProfile: async (donorId: string): Promise<Donor> => {
        return mockApi.getDonorProfile(donorId);
    },

    updateAvailability: async (donorId: string, isAvailable: boolean): Promise<Donor> => {
        return mockApi.updateDonorAvailability(donorId, isAvailable);
    },

    getDonationHistory: async (donorId: string): Promise<DonationRecord[]> => {
        return mockApi.getDonationHistory(donorId);
    },
};

// Patient API
export const patientApi = {
    getRequests: async (patientId: string): Promise<BloodRequest[]> => {
        return mockApi.getPatientRequests(patientId);
    },

    createRequest: async (request: Omit<BloodRequest, 'id' | 'createdAt' | 'patient'>): Promise<BloodRequest> => {
        return mockApi.createBloodRequest(request);
    },
};

// Matching API
export const matchingApi = {
    findMatches: async (requestId: string): Promise<Match[]> => {
        return mockApi.findMatches(requestId);
    },

    acceptMatch: async (matchId: string): Promise<Match> => {
        return mockApi.acceptMatch(matchId);
    },

    declineMatch: async (matchId: string): Promise<Match> => {
        return mockApi.declineMatch(matchId);
    },
};

// Hospital API
export const hospitalApi = {
    verifyUser: async (userId: string, verified: boolean): Promise<User> => {
        return mockApi.verifyUser(userId, verified);
    },

    recordDonation: async (donation: Omit<DonationRecord, 'id'>): Promise<DonationRecord> => {
        return mockApi.recordDonation(donation);
    },
};

// Notification API
export const notificationApi = {
    getNotifications: async (userId: string): Promise<Notification[]> => {
        return mockApi.getNotifications(userId);
    },

    markAsRead: async (notificationId: string): Promise<Notification> => {
        return mockApi.markNotificationRead(notificationId);
    },
};

// Admin API
export const adminApi = {
    getAnalytics: async (): Promise<AnalyticsData> => {
        return mockApi.getAnalytics();
    },

    getAllUsers: async (): Promise<User[]> => {
        return mockApi.getAllUsers();
    },

    getAllRequests: async (): Promise<BloodRequest[]> => {
        return mockApi.getAllRequests();
    },

    getAllDonations: async (): Promise<DonationRecord[]> => {
        return mockApi.getAllDonations();
    },
};
