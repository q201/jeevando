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

const schema = yup.object({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

type LoginForm = yup.InferType<typeof schema>;

export const Login: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { login } = useAuthStore();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginForm>({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data: LoginForm) => {
        setIsLoading(true);
        setError(null);
        try {
            await login(data.email, data.password);
            const user = useAuthStore.getState().user;

            // Redirect based on role
            const routes: Record<string, string> = {
                donor: '/donor',
                patient: '/patient',
                hospital: '/hospital',
                admin: '/admin',
            };
            navigate(routes[user?.role || 'donor']);
        } catch (err: any) {
            setError(err.message || 'Login failed');
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

            <Card className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <Droplet className="w-16 h-16 text-primary-500" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {t('app.name')}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">{t('app.tagline')}</p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <Input
                        label={t('auth.email')}
                        type="email"
                        placeholder="donor@example.com"
                        error={errors.email?.message}
                        {...register('email')}
                    />

                    <Input
                        label={t('auth.password')}
                        type="password"
                        placeholder="••••••••"
                        error={errors.password?.message}
                        {...register('password')}
                    />

                    {error && (
                        <div className="p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg">
                            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                        </div>
                    )}

                    <Button type="submit" className="w-full" isLoading={isLoading}>
                        {t('auth.loginButton')}
                    </Button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        {t('auth.noAccount')}{' '}
                        <Link
                            to="/register"
                            className="text-primary-500 hover:text-primary-600 font-medium"
                        >
                            {t('auth.register')}
                        </Link>
                    </p>
                </div>

                {/* Demo credentials */}
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <p className="text-xs font-semibold text-blue-900 dark:text-blue-300 mb-2">
                        Demo Credentials:
                    </p>
                    <div className="text-xs text-blue-800 dark:text-blue-400 space-y-1">
                        <p>Donor: donor1@example.com</p>
                        <p>Patient: patient1@example.com</p>
                        <p>Hospital: aiims@example.com</p>
                        <p>Admin: admin@jeevando.com</p>
                        <p className="mt-2 font-medium">Password: any password (mock API)</p>
                    </div>
                </div>
            </Card>
        </div>
    );
};
