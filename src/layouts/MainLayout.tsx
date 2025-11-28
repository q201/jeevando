import React from 'react';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/store/authStore';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Bell, LogOut, Droplet } from 'lucide-react';
import { useNotificationStore } from '@/store/notificationStore';

export const MainLayout: React.FC = () => {
    const { t } = useTranslation();
    const { user, logout } = useAuthStore();
    const { unreadCount } = useNotificationStore();

    const handleLogout = () => {
        logout();
        window.location.href = '/login';
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-14 sm:h-16">
                        {/* Logo */}
                        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                            <Droplet className="w-6 h-6 sm:w-8 sm:h-8 text-primary-500" />
                            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                                {t('app.name')}
                            </h1>
                        </div>

                        {/* Right side */}
                        <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
                            {/* Language Switcher - Hidden on very small screens */}
                            <div className="hidden xs:block">
                                <LanguageSwitcher />
                            </div>

                            {/* Theme Toggle */}
                            <ThemeToggle />

                            {/* Notifications */}
                            <button className="relative p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-gray-300" />
                                {unreadCount > 0 && (
                                    <span className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-primary-500 text-white text-[10px] sm:text-xs rounded-full flex items-center justify-center font-medium">
                                        {unreadCount > 9 ? '9+' : unreadCount}
                                    </span>
                                )}
                            </button>

                            {/* User menu */}
                            <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
                                {/* User info - Hidden on mobile, shown on tablet+ */}
                                <div className="hidden md:block text-right">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate max-w-[120px] lg:max-w-none">
                                        {user?.name}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                                        {user?.role}
                                    </p>
                                </div>

                                {/* Logout button */}
                                <button
                                    onClick={handleLogout}
                                    className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                    title={t('nav.logout')}
                                    aria-label={t('nav.logout')}
                                >
                                    <LogOut className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-gray-300" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main content */}
            <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
                <Outlet />
            </main>
        </div>
    );
};
