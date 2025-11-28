// User Roles
export type UserRole = 'donor' | 'patient' | 'hospital' | 'admin';

// Blood Types
export type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';

// Request Urgency Levels
export type UrgencyLevel = 'low' | 'medium' | 'high' | 'critical';

// Request Status
export type RequestStatus = 'pending' | 'matched' | 'completed' | 'cancelled';

// Donation Status
export type DonationStatus = 'scheduled' | 'completed' | 'cancelled';

// User Base Interface
export interface User {
    id: string;
    email: string;
    name: string;
    phone: string;
    role: UserRole;
    createdAt: string;
    updatedAt: string;
}

// Location Interface
export interface Location {
    lat: number;
    lng: number;
    address: string;
    city: string;
    state: string;
    pincode: string;
}

// Donor Interface
export interface Donor extends User {
    role: 'donor';
    bloodType: BloodType;
    isAvailable: boolean;
    location: Location;
    lastDonationDate?: string;
    donationCount: number;
    verified: boolean;
}

// Patient Interface
export interface Patient extends User {
    role: 'patient';
    bloodType: BloodType;
    location: Location;
    verified: boolean;
}

// Hospital Interface
export interface Hospital extends User {
    role: 'hospital';
    hospitalName: string;
    location: Location;
    licenseNumber: string;
    verified: boolean;
}

// Admin Interface
export interface Admin extends User {
    role: 'admin';
}

// Blood Request Interface
export interface BloodRequest {
    id: string;
    patientId: string;
    patient: Patient;
    bloodType: BloodType;
    unitsRequired: number;
    urgency: UrgencyLevel;
    location: Location;
    description: string;
    status: RequestStatus;
    createdAt: string;
    requiredBy: string;
    hospitalId?: string;
    hospital?: Hospital;
}

// Donation Record Interface
export interface DonationRecord {
    id: string;
    donorId: string;
    donor: Donor;
    patientId?: string;
    patient?: Patient;
    requestId?: string;
    hospitalId: string;
    hospital: Hospital;
    bloodType: BloodType;
    units: number;
    donationDate: string;
    status: DonationStatus;
    notes?: string;
}

// Match Interface
export interface Match {
    id: string;
    requestId: string;
    request: BloodRequest;
    donorId: string;
    donor: Donor;
    distance: number; // in kilometers
    matchedAt: string;
    status: 'pending' | 'accepted' | 'declined' | 'expired';
    respondedAt?: string;
}

// Notification Interface
export interface Notification {
    id: string;
    userId: string;
    title: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error' | 'urgent';
    read: boolean;
    createdAt: string;
    actionUrl?: string;
    metadata?: Record<string, any>;
}

// Auth Interfaces
export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterData {
    email: string;
    password: string;
    name: string;
    phone: string;
    role: UserRole;
    bloodType?: BloodType;
    location?: Location;
    hospitalName?: string;
    licenseNumber?: string;
}

export interface AuthResponse {
    user: User | Donor | Patient | Hospital | Admin;
    token: string;
}

// API Response Wrapper
export interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
}

// Analytics Interfaces (for Admin)
export interface DonationStats {
    totalDonations: number;
    thisMonth: number;
    thisWeek: number;
    byBloodType: Record<BloodType, number>;
}

export interface UserStats {
    totalDonors: number;
    totalPatients: number;
    totalHospitals: number;
    activeDonors: number;
    verifiedDonors: number;
}

export interface RequestStats {
    totalRequests: number;
    pendingRequests: number;
    completedRequests: number;
    criticalRequests: number;
    byUrgency: Record<UrgencyLevel, number>;
}

export interface AnalyticsData {
    donations: DonationStats;
    users: UserStats;
    requests: RequestStats;
    recentActivity: Array<{
        id: string;
        type: 'donation' | 'request' | 'match';
        description: string;
        timestamp: string;
    }>;
}
