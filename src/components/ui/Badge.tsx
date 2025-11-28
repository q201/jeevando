import React from 'react';
import { clsx } from 'clsx';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'donor' | 'patient' | 'critical' | 'success' | 'warning' | 'info' | 'default';
    className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', className }) => {
    const variants = {
        donor: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
        patient: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
        critical: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 animate-pulse-slow',
        success: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
        warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
        info: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300',
        default: 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
    };

    return (
        <span
            className={clsx(
                'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                variants[variant],
                className
            )}
        >
            {children}
        </span>
    );
};
