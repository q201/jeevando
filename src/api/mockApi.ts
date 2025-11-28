import type {
    User,
    Donor,
    Patient,
    Hospital,
    BloodRequest,
    DonationRecord,
    Match,
    Notification,
    AuthResponse,
    LoginCredentials,
    RegisterData,
    BloodType,
    Location,
    AnalyticsData,
} from '@/types';

// Mock data storage
let mockUsers: User[] = [];
let mockRequests: BloodRequest[] = [];
let mockDonations: DonationRecord[] = [];
let mockMatches: Match[] = [];
let mockNotifications: Notification[] = [];

// Initialize mock data
const initializeMockData = () => {
    // Mock Donors
    const donors: Donor[] = [
        {
            id: 'd1',
            email: 'donor1@example.com',
            name: 'Rahul Sharma',
            phone: '+91-9876543210',
            role: 'donor',
            bloodType: 'O+',
            isAvailable: true,
            location: {
                lat: 28.6139,
                lng: 77.2090,
                address: '123 Main Street',
                city: 'New Delhi',
                state: 'Delhi',
                pincode: '110001',
            },
            lastDonationDate: '2024-08-15',
            donationCount: 5,
            verified: true,
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-11-01T00:00:00Z',
        },
        {
            id: 'd2',
            email: 'donor2@example.com',
            name: 'Priya Patel',
            phone: '+91-9876543211',
            role: 'donor',
            bloodType: 'A+',
            isAvailable: true,
            location: {
                lat: 28.7041,
                lng: 77.1025,
                address: '456 Park Avenue',
                city: 'New Delhi',
                state: 'Delhi',
                pincode: '110035',
            },
            donationCount: 3,
            verified: true,
            createdAt: '2024-02-01T00:00:00Z',
            updatedAt: '2024-11-01T00:00:00Z',
        },
        {
            id: 'd3',
            email: 'donor3@example.com',
            name: 'Amit Kumar',
            phone: '+91-9876543212',
            role: 'donor',
            bloodType: 'B+',
            isAvailable: false,
            location: {
                lat: 28.5355,
                lng: 77.3910,
                address: '789 Lake Road',
                city: 'Noida',
                state: 'Uttar Pradesh',
                pincode: '201301',
            },
            lastDonationDate: '2024-10-20',
            donationCount: 8,
            verified: true,
            createdAt: '2024-01-15T00:00:00Z',
            updatedAt: '2024-11-01T00:00:00Z',
        },
    ];

    // Mock Patients
    const patients: Patient[] = [
        {
            id: 'p1',
            email: 'patient1@example.com',
            name: 'Sunita Verma',
            phone: '+91-9876543220',
            role: 'patient',
            bloodType: 'O+',
            location: {
                lat: 28.6304,
                lng: 77.2177,
                address: '321 Hospital Road',
                city: 'New Delhi',
                state: 'Delhi',
                pincode: '110002',
            },
            verified: true,
            createdAt: '2024-10-01T00:00:00Z',
            updatedAt: '2024-11-01T00:00:00Z',
        },
    ];

    // Mock Hospitals
    const hospitals: Hospital[] = [
        {
            id: 'h1',
            email: 'aiims@example.com',
            name: 'AIIMS Delhi',
            phone: '+91-11-26588500',
            role: 'hospital',
            hospitalName: 'All India Institute of Medical Sciences',
            location: {
                lat: 28.5672,
                lng: 77.2100,
                address: 'Ansari Nagar',
                city: 'New Delhi',
                state: 'Delhi',
                pincode: '110029',
            },
            licenseNumber: 'HOSP-DL-001',
            verified: true,
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-11-01T00:00:00Z',
        },
    ];

    // Mock Admin
    const admins: User[] = [
        {
            id: 'a1',
            email: 'admin@jeevando.com',
            name: 'Admin User',
            phone: '+91-9999999999',
            role: 'admin',
            createdAt: '2024-01-01T00:00:00Z',
            updatedAt: '2024-11-01T00:00:00Z',
        },
    ];

    mockUsers = [...donors, ...patients, ...hospitals, ...admins];

    // Mock Blood Requests
    mockRequests = [
        {
            id: 'r1',
            patientId: 'p1',
            patient: patients[0],
            bloodType: 'O+',
            unitsRequired: 2,
            urgency: 'critical',
            location: patients[0].location,
            description: 'Emergency surgery required',
            status: 'pending',
            createdAt: '2024-11-28T10:00:00Z',
            requiredBy: '2024-11-29T10:00:00Z',
            hospitalId: 'h1',
            hospital: hospitals[0],
        },
    ];

    // Mock Donations
    mockDonations = [
        {
            id: 'dn1',
            donorId: 'd1',
            donor: donors[0],
            hospitalId: 'h1',
            hospital: hospitals[0],
            bloodType: 'O+',
            units: 1,
            donationDate: '2024-08-15',
            status: 'completed',
            notes: 'Regular donation',
        },
    ];

    // Mock Matches
    mockMatches = [
        {
            id: 'm1',
            requestId: 'r1',
            request: mockRequests[0],
            donorId: 'd1',
            donor: donors[0],
            distance: 5.2,
            matchedAt: '2024-11-28T10:30:00Z',
            status: 'pending',
        },
    ];

    // Mock Notifications
    mockNotifications = [
        {
            id: 'n1',
            userId: 'd1',
            title: 'New Match Request',
            message: 'You have been matched with a patient in need of O+ blood',
            type: 'urgent',
            read: false,
            createdAt: '2024-11-28T10:30:00Z',
            actionUrl: '/donor/matches',
        },
    ];
};

// Initialize on module load
initializeMockData();

// Simulate network delay
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API functions
export const mockApi = {
    // Auth endpoints
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        await delay();
        const user = mockUsers.find(u => u.email === credentials.email);
        if (!user) {
            throw new Error('Invalid credentials');
        }
        return {
            user,
            token: 'mock-jwt-token-' + user.id,
        };
    },

    async register(data: RegisterData): Promise<AuthResponse> {
        await delay();
        const newUser: User = {
            id: 'u' + Date.now(),
            email: data.email,
            name: data.name,
            phone: data.phone,
            role: data.role,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            ...(data.bloodType && { bloodType: data.bloodType }),
            ...(data.location && { location: data.location }),
            ...(data.role === 'donor' && { isAvailable: true, donationCount: 0, verified: false }),
            ...(data.role === 'patient' && { verified: false }),
            ...(data.role === 'hospital' && {
                hospitalName: data.hospitalName,
                licenseNumber: data.licenseNumber,
                verified: false,
            }),
        };
        mockUsers.push(newUser);
        return {
            user: newUser,
            token: 'mock-jwt-token-' + newUser.id,
        };
    },

    async getMe(token: string): Promise<User> {
        await delay();
        const userId = token.replace('mock-jwt-token-', '');
        const user = mockUsers.find(u => u.id === userId);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    },

    // Donor endpoints
    async getDonorProfile(donorId: string): Promise<Donor> {
        await delay();
        const donor = mockUsers.find(u => u.id === donorId && u.role === 'donor') as Donor;
        if (!donor) {
            throw new Error('Donor not found');
        }
        return donor;
    },

    async updateDonorAvailability(donorId: string, isAvailable: boolean): Promise<Donor> {
        await delay();
        const donor = mockUsers.find(u => u.id === donorId && u.role === 'donor') as Donor;
        if (!donor) {
            throw new Error('Donor not found');
        }
        donor.isAvailable = isAvailable;
        donor.updatedAt = new Date().toISOString();
        return donor;
    },

    async getDonationHistory(donorId: string): Promise<DonationRecord[]> {
        await delay();
        return mockDonations.filter(d => d.donorId === donorId);
    },

    // Patient endpoints
    async getPatientRequests(patientId: string): Promise<BloodRequest[]> {
        await delay();
        return mockRequests.filter(r => r.patientId === patientId);
    },

    async createBloodRequest(request: Omit<BloodRequest, 'id' | 'createdAt' | 'patient'>): Promise<BloodRequest> {
        await delay();
        const patient = mockUsers.find(u => u.id === request.patientId && u.role === 'patient') as Patient;
        const newRequest: BloodRequest = {
            ...request,
            id: 'r' + Date.now(),
            patient,
            createdAt: new Date().toISOString(),
        };
        mockRequests.push(newRequest);
        return newRequest;
    },

    // Matching endpoints
    async findMatches(requestId: string): Promise<Match[]> {
        await delay();
        return mockMatches.filter(m => m.requestId === requestId);
    },

    async acceptMatch(matchId: string): Promise<Match> {
        await delay();
        const match = mockMatches.find(m => m.id === matchId);
        if (!match) {
            throw new Error('Match not found');
        }
        match.status = 'accepted';
        match.respondedAt = new Date().toISOString();
        return match;
    },

    async declineMatch(matchId: string): Promise<Match> {
        await delay();
        const match = mockMatches.find(m => m.id === matchId);
        if (!match) {
            throw new Error('Match not found');
        }
        match.status = 'declined';
        match.respondedAt = new Date().toISOString();
        return match;
    },

    // Hospital endpoints
    async verifyUser(userId: string, verified: boolean): Promise<User> {
        await delay();
        const user = mockUsers.find(u => u.id === userId);
        if (!user) {
            throw new Error('User not found');
        }
        (user as any).verified = verified;
        user.updatedAt = new Date().toISOString();
        return user;
    },

    async recordDonation(donation: Omit<DonationRecord, 'id'>): Promise<DonationRecord> {
        await delay();
        const newDonation: DonationRecord = {
            ...donation,
            id: 'dn' + Date.now(),
        };
        mockDonations.push(newDonation);
        return newDonation;
    },

    // Notification endpoints
    async getNotifications(userId: string): Promise<Notification[]> {
        await delay();
        return mockNotifications.filter(n => n.userId === userId);
    },

    async markNotificationRead(notificationId: string): Promise<Notification> {
        await delay();
        const notification = mockNotifications.find(n => n.id === notificationId);
        if (!notification) {
            throw new Error('Notification not found');
        }
        notification.read = true;
        return notification;
    },

    // Admin endpoints
    async getAnalytics(): Promise<AnalyticsData> {
        await delay();
        const donors = mockUsers.filter(u => u.role === 'donor') as Donor[];
        return {
            donations: {
                totalDonations: mockDonations.length,
                thisMonth: mockDonations.filter(d => {
                    const donationDate = new Date(d.donationDate);
                    const now = new Date();
                    return donationDate.getMonth() === now.getMonth() && donationDate.getFullYear() === now.getFullYear();
                }).length,
                thisWeek: mockDonations.filter(d => {
                    const donationDate = new Date(d.donationDate);
                    const now = new Date();
                    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                    return donationDate >= weekAgo;
                }).length,
                byBloodType: {
                    'A+': mockDonations.filter(d => d.bloodType === 'A+').length,
                    'A-': mockDonations.filter(d => d.bloodType === 'A-').length,
                    'B+': mockDonations.filter(d => d.bloodType === 'B+').length,
                    'B-': mockDonations.filter(d => d.bloodType === 'B-').length,
                    'AB+': mockDonations.filter(d => d.bloodType === 'AB+').length,
                    'AB-': mockDonations.filter(d => d.bloodType === 'AB-').length,
                    'O+': mockDonations.filter(d => d.bloodType === 'O+').length,
                    'O-': mockDonations.filter(d => d.bloodType === 'O-').length,
                },
            },
            users: {
                totalDonors: donors.length,
                totalPatients: mockUsers.filter(u => u.role === 'patient').length,
                totalHospitals: mockUsers.filter(u => u.role === 'hospital').length,
                activeDonors: donors.filter(d => d.isAvailable).length,
                verifiedDonors: donors.filter(d => d.verified).length,
            },
            requests: {
                totalRequests: mockRequests.length,
                pendingRequests: mockRequests.filter(r => r.status === 'pending').length,
                completedRequests: mockRequests.filter(r => r.status === 'completed').length,
                criticalRequests: mockRequests.filter(r => r.urgency === 'critical').length,
                byUrgency: {
                    low: mockRequests.filter(r => r.urgency === 'low').length,
                    medium: mockRequests.filter(r => r.urgency === 'medium').length,
                    high: mockRequests.filter(r => r.urgency === 'high').length,
                    critical: mockRequests.filter(r => r.urgency === 'critical').length,
                },
            },
            recentActivity: [
                {
                    id: '1',
                    type: 'donation',
                    description: 'Rahul Sharma donated blood at AIIMS Delhi',
                    timestamp: '2024-11-28T09:00:00Z',
                },
                {
                    id: '2',
                    type: 'request',
                    description: 'New critical blood request for O+ blood',
                    timestamp: '2024-11-28T10:00:00Z',
                },
                {
                    id: '3',
                    type: 'match',
                    description: 'Donor matched with patient request',
                    timestamp: '2024-11-28T10:30:00Z',
                },
            ],
        };
    },

    async getAllUsers(): Promise<User[]> {
        await delay();
        return mockUsers;
    },

    async getAllRequests(): Promise<BloodRequest[]> {
        await delay();
        return mockRequests;
    },

    async getAllDonations(): Promise<DonationRecord[]> {
        await delay();
        return mockDonations;
    },
};
