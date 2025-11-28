import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { MainLayout } from '@/layouts/MainLayout';
import { Login } from '@/pages/auth/Login';
import { Register } from '@/pages/auth/Register';
import { DonorDashboard } from '@/pages/donor/DonorDashboard';
import { PatientDashboard } from '@/pages/patient/PatientDashboard';
import { HospitalDashboard } from '@/pages/hospital/HospitalDashboard';
import { AdminDashboard } from '@/pages/admin/AdminDashboard';
import { ToastContainer, useToast } from '@/components/ui/Toast';
import '@/i18n/config';
import '@/styles/index.css';

// Create a toast context provider
export const ToastContext = React.createContext<ReturnType<typeof useToast> | null>(null);

function AppContent() {
    const { isAuthenticated, user } = useAuthStore();
    const toast = useToast();

    // Redirect authenticated users from login/register to their dashboard
    const getDefaultRoute = () => {
        if (!isAuthenticated || !user) return '/login';

        const routes: Record<string, string> = {
            donor: '/donor',
            patient: '/patient',
            hospital: '/hospital',
            admin: '/admin',
        };
        return routes[user.role] || '/login';
    };

    return (
        <ToastContext.Provider value={toast}>
            <BrowserRouter>
                <Routes>
                    {/* Public routes */}
                    <Route
                        path="/login"
                        element={isAuthenticated ? <Navigate to={getDefaultRoute()} replace /> : <Login />}
                    />
                    <Route
                        path="/register"
                        element={isAuthenticated ? <Navigate to={getDefaultRoute()} replace /> : <Register />}
                    />

                    {/* Protected routes with layout */}
                    <Route element={<MainLayout />}>
                        <Route
                            path="/donor"
                            element={
                                <ProtectedRoute allowedRoles={['donor']}>
                                    <DonorDashboard />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/patient"
                            element={
                                <ProtectedRoute allowedRoles={['patient']}>
                                    <PatientDashboard />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/hospital"
                            element={
                                <ProtectedRoute allowedRoles={['hospital']}>
                                    <HospitalDashboard />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/admin"
                            element={
                                <ProtectedRoute allowedRoles={['admin']}>
                                    <AdminDashboard />
                                </ProtectedRoute>
                            }
                        />
                    </Route>

                    {/* Default redirect */}
                    <Route path="/" element={<Navigate to={getDefaultRoute()} replace />} />
                    <Route path="*" element={<Navigate to={getDefaultRoute()} replace />} />
                </Routes>
            </BrowserRouter>
            <ToastContainer toasts={toast.toasts} />
        </ToastContext.Provider>
    );
}

function App() {
    return <AppContent />;
}

export default App;
