import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Users, Droplet, Activity, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { adminApi } from '@/api/endpoints';
import type { AnalyticsData } from '@/types';

const COLORS = ['#E53935', '#1976D2', '#388E3C', '#F57C00', '#7B1FA2', '#C2185B', '#0097A7', '#5D4037'];

export const AdminDashboard: React.FC = () => {
    const { t } = useTranslation();
    const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);

    useEffect(() => {
        const fetchAnalytics = async () => {
            const data = await adminApi.getAnalytics();
            setAnalytics(data);
        };
        fetchAnalytics();
    }, []);

    if (!analytics) {
        return <div className="text-center py-12">{t('common.loading')}</div>;
    }

    const bloodTypeData = Object.entries(analytics.donations.byBloodType).map(([type, count]) => ({
        name: type,
        value: count,
    }));

    const urgencyData = Object.entries(analytics.requests.byUrgency).map(([level, count]) => ({
        name: t(`urgency.${level}`),
        count,
    }));

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {t('admin.analytics')}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                    {t('admin.systemOverview')}
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                <Users className="w-6 h-6 text-blue-500" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{t('admin.totalDonors')}</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {analytics.users.totalDonors}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                                <Users className="w-6 h-6 text-purple-500" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{t('admin.totalPatients')}</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {analytics.users.totalPatients}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                                <Droplet className="w-6 h-6 text-green-500" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{t('admin.completedDonations')}</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {analytics.donations.totalDonations}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
                                <AlertCircle className="w-6 h-6 text-red-500" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{t('admin.pendingRequests')}</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {analytics.requests.pendingRequests}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Blood Type Distribution */}
                <Card>
                    <CardHeader>
                        <CardTitle>{t('admin.bloodTypeDistribution')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={bloodTypeData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {bloodTypeData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* Request Urgency */}
                <Card>
                    <CardHeader>
                        <CardTitle>{t('admin.requestsByUrgency')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart data={urgencyData}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="count" fill="#E53935" />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Activity */}
            <Card>
                <CardHeader>
                    <CardTitle>{t('admin.recentActivity')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {analytics.recentActivity.map((activity) => (
                            <div
                                key={activity.id}
                                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg ${activity.type === 'donation' ? 'bg-green-100 dark:bg-green-900/30' :
                                            activity.type === 'request' ? 'bg-red-100 dark:bg-red-900/30' :
                                                'bg-blue-100 dark:bg-blue-900/30'
                                        }`}>
                                        <Activity className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">{activity.description}</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {new Date(activity.timestamp).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                                <Badge variant={activity.type === 'donation' ? 'success' : 'info'}>
                                    {activity.type}
                                </Badge>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};
