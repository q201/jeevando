import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { CheckCircle, XCircle, Calendar } from 'lucide-react';

export const HospitalDashboard: React.FC = () => {
    const { t } = useTranslation();
    const [isRecordModalOpen, setIsRecordModalOpen] = useState(false);

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {t('hospital.dashboard')}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                    {t('hospital.manageVerifications')}
                </p>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card hover className="cursor-pointer">
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                                <CheckCircle className="w-8 h-8 text-green-500" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {t('hospital.verification')}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {t('hospital.verifyDonorsPatients')}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card hover className="cursor-pointer" onClick={() => setIsRecordModalOpen(true)}>
                    <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                                <Calendar className="w-8 h-8 text-blue-500" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {t('hospital.recordDonation')}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    {t('hospital.recordNewDonation')}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Pending Verifications */}
            <Card>
                <CardHeader>
                    <CardTitle>{t('hospital.pendingVerifications')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {[1, 2].map((i) => (
                            <div
                                key={i}
                                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                            >
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">Sample User {i}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Donor • O+ • Registered 2 days ago
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <Button size="sm" variant="primary">
                                        <CheckCircle className="w-4 h-4 mr-1" />
                                        {t('hospital.verify')}
                                    </Button>
                                    <Button size="sm" variant="danger">
                                        <XCircle className="w-4 h-4 mr-1" />
                                        {t('hospital.reject')}
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Recent Donations */}
            <Card>
                <CardHeader>
                    <CardTitle>{t('hospital.recentDonations')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                            >
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">Donor Name {i}</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        O+ • 1 unit • {new Date().toLocaleDateString()}
                                    </p>
                                </div>
                                <Badge variant="success">{t('status.completed')}</Badge>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Record Donation Modal */}
            <Modal
                isOpen={isRecordModalOpen}
                onClose={() => setIsRecordModalOpen(false)}
                title={t('hospital.recordDonation')}
            >
                <form className="space-y-4">
                    <Input label={t('hospital.donorName')} placeholder="Enter donor name" />
                    <Input label={t('auth.bloodType')} placeholder="O+" />
                    <Input label={t('hospital.units')} type="number" defaultValue="1" />
                    <Input label={t('hospital.donationDate')} type="date" />
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            {t('hospital.notes')}
                        </label>
                        <textarea
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                            rows={3}
                        />
                    </div>
                    <div className="flex gap-2 justify-end">
                        <Button type="button" variant="ghost" onClick={() => setIsRecordModalOpen(false)}>
                            {t('common.cancel')}
                        </Button>
                        <Button type="submit">{t('common.save')}</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};
