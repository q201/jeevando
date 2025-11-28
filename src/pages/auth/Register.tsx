import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuthStore } from '@/store/authStore';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Droplet } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import type { UserRole, BloodType } from '@/types';

const schema = yup.object({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    name: yup.string().required('Name is required'),
    phone: yup.string().required('Phone is required'),
    role: yup.string().oneOf(['donor', 'patient', 'hospital']).required('Role is required'),
    bloodType: yup.string().when('role', {
        is: (val: string) => val === 'donor' || val === 'patient',
        then: (schema) => schema.required('Blood type is required'),
        otherwise: (schema) => schema.optional(),
    }),
    address: yup.string().when('role', {
        is: (val: string) => val === 'donor' || val === 'patient' || val === 'hospital',
        then: (schema) => schema.required('Address is required'),
        otherwise: (schema) => schema.optional(),
    }),
    city: yup.string().when('role', {
        is: (val: string) => val === 'donor' || val === 'patient' || val === 'hospital',
        then: (schema) => schema.required('City is required'),
        otherwise: (schema) => schema.optional(),
    }),
    state: yup.string().when('role', {
        is: (val: string) => val === 'donor' || val === 'patient' || val === 'hospital',
        then: (schema) => schema.required('State is required'),
        otherwise: (schema) => schema.optional(),
    }),
    pincode: yup.string().when('role', {
        is: (val: string) => val === 'donor' || val === 'patient' || val === 'hospital',
        then: (schema) => schema.required('Pincode is required'),
        otherwise: (schema) => schema.optional(),
    }),
    hospitalName: yup.string().when('role', {
        is: 'hospital',
        then: (schema) => schema.required('Hospital name is required'),
        otherwise: (schema) => schema.optional(),
    }),
    licenseNumber: yup.string().when('role', {
        is: 'hospital',
        then: (schema) => schema.required('License number is required'),
        otherwise: (schema) => schema.optional(),
    }),
});

type RegisterForm = yup.InferType<typeof schema>;

const bloodTypes: BloodType[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

export const Register: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { register: registerUser } = useAuthStore();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<RegisterForm>({
        resolver: yupResolver(schema),
        defaultValues: {
            role: 'donor',
        },
    });

    const selectedRole = watch('role');

    const onSubmit = async (data: RegisterForm) => {
        setIsLoading(true);
        setError(null);
        try {
            const registerData: any = {
                email: data.email,
                password: data.password,
                name: data.name,
                phone: data.phone,
                role: data.role as UserRole,
            };

            if (data.role === 'donor' || data.role === 'patient') {
                registerData.bloodType = data.bloodType as BloodType;
                registerData.location = {
                    lat: 28.6139, // Mock coordinates
                    lng: 77.2090,
                    address: data.address!,
                    city: data.city!,
                    state: data.state!,
                    pincode: data.pincode!,
                };
            }

            if (data.role === 'hospital') {
                registerData.hospitalName = data.hospitalName;
                registerData.licenseNumber = data.licenseNumber;
                registerData.location = {
                    lat: 28.6139,
                    lng: 77.2090,
                    address: data.address!,
                    city: data.city!,
                    state: data.state!,
                    pincode: data.pincode!,
                };
            }

            await registerUser(registerData);
            const user = useAuthStore.getState().user;

            const routes: Record<string, string> = {
                donor: '/donor',
                patient: '/patient',
                hospital: '/hospital',
                admin: '/admin',
            };
            navigate(routes[user?.role || 'donor']);
        } catch (err: any) {
            setError(err.message || 'Registration failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
            <div className="absolute top-4 right-4 flex gap-2">
                <LanguageSwitcher />
                <ThemeToggle />
            </div>

            <Card className="w-full max-w-2xl my-8">
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <Droplet className="w-16 h-16 text-primary-500" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {t('auth.register')}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">{t('app.tagline')}</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            label={t('auth.name')}
                            placeholder="John Doe"
                            error={errors.name?.message}
                            {...register('name')}
                        />

                        <Input
                            label={t('auth.email')}
                            type="email"
                            placeholder="john@example.com"
                            error={errors.email?.message}
                            {...register('email')}
                        />

                        <Input
                            label={t('auth.phone')}
                            type="tel"
                            placeholder="+91-9876543210"
                            error={errors.phone?.message}
                            {...register('phone')}
                        />

                        <Input
                            label={t('auth.password')}
                            type="password"
                            placeholder="••••••••"
                            error={errors.password?.message}
                            {...register('password')}
                        />
                    </div>

                    {/* Role Selection */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {t('auth.role')}
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                            {['donor', 'patient', 'hospital'].map((role) => (
                                <label
                                    key={role}
                                    className={`flex items-center justify-center p-3 border-2 rounded-lg cursor-pointer transition-all ${selectedRole === role
                                            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                                            : 'border-gray-300 dark:border-gray-600 hover:border-primary-300'
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        value={role}
                                        className="sr-only"
                                        {...register('role')}
                                    />
                                    <span className="text-sm font-medium capitalize">
                                        {t(`auth.${role}`)}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Blood Type (for donor/patient) */}
                    {(selectedRole === 'donor' || selectedRole === 'patient') && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                {t('auth.bloodType')}
                            </label>
                            <select
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                {...register('bloodType')}
                            >
                                <option value="">Select blood type</option>
                                {bloodTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                            {errors.bloodType && (
                                <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                                    {errors.bloodType.message}
                                </p>
                            )}
                        </div>
                    )}

                    {/* Hospital Fields */}
                    {selectedRole === 'hospital' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                                label={t('auth.hospitalName')}
                                placeholder="City Hospital"
                                error={errors.hospitalName?.message}
                                {...register('hospitalName')}
                            />
                            <Input
                                label={t('auth.licenseNumber')}
                                placeholder="HOSP-123456"
                                error={errors.licenseNumber?.message}
                                {...register('licenseNumber')}
                            />
                        </div>
                    )}

                    {/* Location Fields */}
                    {(selectedRole === 'donor' || selectedRole === 'patient' || selectedRole === 'hospital') && (
                        <>
                            <Input
                                label={t('auth.address')}
                                placeholder="123 Main Street"
                                error={errors.address?.message}
                                {...register('address')}
                            />
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Input
                                    label={t('auth.city')}
                                    placeholder="New Delhi"
                                    error={errors.city?.message}
                                    {...register('city')}
                                />
                                <Input
                                    label={t('auth.state')}
                                    placeholder="Delhi"
                                    error={errors.state?.message}
                                    {...register('state')}
                                />
                                <Input
                                    label={t('auth.pincode')}
                                    placeholder="110001"
                                    error={errors.pincode?.message}
                                    {...register('pincode')}
                                />
                            </div>
                        </>
                    )}

                    {error && (
                        <div className="p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg">
                            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                        </div>
                    )}

                    <Button type="submit" className="w-full" isLoading={isLoading}>
                        {t('auth.registerButton')}
                    </Button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        {t('auth.haveAccount')}{' '}
                        <Link
                            to="/login"
                            className="text-primary-500 hover:text-primary-600 font-medium"
                        >
                            {t('auth.login')}
                        </Link>
                    </p>
                </div>
            </Card>
        </div>
    );
};
