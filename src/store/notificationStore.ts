import { create } from 'zustand';
import type { Notification } from '@/types';
import { notificationApi } from '@/api/endpoints';

interface NotificationState {
    notifications: Notification[];
    unreadCount: number;
    isLoading: boolean;
    error: string | null;
    fetchNotifications: (userId: string) => Promise<void>;
    markAsRead: (notificationId: string) => Promise<void>;
    addNotification: (notification: Notification) => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
    notifications: [],
    unreadCount: 0,
    isLoading: false,
    error: null,

    fetchNotifications: async (userId: string) => {
        set({ isLoading: true, error: null });
        try {
            const notifications = await notificationApi.getNotifications(userId);
            const unreadCount = notifications.filter((n) => !n.read).length;
            set({ notifications, unreadCount, isLoading: false });
        } catch (error: any) {
            set({ error: error.message, isLoading: false });
        }
    },

    markAsRead: async (notificationId: string) => {
        try {
            await notificationApi.markAsRead(notificationId);
            set((state) => ({
                notifications: state.notifications.map((n) =>
                    n.id === notificationId ? { ...n, read: true } : n
                ),
                unreadCount: Math.max(0, state.unreadCount - 1),
            }));
        } catch (error: any) {
            set({ error: error.message });
        }
    },

    addNotification: (notification: Notification) => {
        set((state) => ({
            notifications: [notification, ...state.notifications],
            unreadCount: state.unreadCount + 1,
        }));
    },
}));
