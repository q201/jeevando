import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/store/authStore';
import { useDonorStore } from '@/store/donorStore';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Droplet, MapPin, Calendar, Activity } from 'lucide-react';
import type { Donor } from '@/types';

export const DonorDashboard: React.FC = () => {
    const { t } = useTranslation();
    const { user } = useAuthStore();
    const { profile, donationHistory, updateAvailability, fetchProfile, fetchDonationHistory } = useDonorStore();
    const donor = user as Donor;

    useEffect(() => {
        if (donor?.id) {
            fetchProfile(donor.id);
            fetchDonationHistory(donor.id);
        }
    }, [donor?.id]);

    const handleAvailabilityToggle = async () => {
        if (donor?.id) {
            await updateAvailability(donor.id, !donor.isAvailable);
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg p-6 text-white">
                <h1 className="text-3xl font-bold mb-2">
                    {t('common.welcome')}, {donor?.name}!
                </h1>
                <p className="text-primary-100">
                    {t('donor.thankYou')} {donor?.donationCount || 0} {t('donor.donations')}
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardContent className="flex items-center gap-4 p-4">
                        <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                            <Droplet className="w-6 h-6 text-primary-500" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{t('auth.bloodType')}</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{donor?.bloodType}</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="flex items-center gap-4 p-4">
                        <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                            <Activity className="w-6 h-6 text-green-500" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{t('donor.totalDonations')}</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">{donor?.donationCount || 0}</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="flex items-center gap-4 p-4">
                        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                            <Calendar className="w-6 h-6 text-blue-500" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{t('donor.lastDonation')}</p>
                            <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                {donor?.lastDonationDate ? new Date(donor.lastDonationDate).toLocaleDateString() : 'N/A'}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Availability Toggle */}
            <Card>
                <CardHeader>
                    <CardTitle>{t('donor.availability')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-gray-700 dark:text-gray-300 mb-1">
                                {t('donor.currentStatus')}:{' '}
                                <Badge variant={donor?.isAvailable ? 'success' : 'default'}>
                                    {donor?.isAvailable ? t('donor.available') : t('donor.notAvailable')}
                                </Badge>
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {t('donor.availabilityHelp')}
                            </p>
                        </div>
                        <Button onClick={handleAvailabilityToggle} variant={donor?.isAvailable ? 'secondary' : 'primary'}>
                            {donor?.isAvailable ? t('donor.markUnavailable') : t('donor.markAvailable')}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Location */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <MapPin className="w-5 h-5" />
                        {t('auth.location')}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-700 dark:text-gray-300">{donor?.location?.address}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        {donor?.location?.city}, {donor?.location?.state} - {donor?.location?.pincode}
                    </p>
                </CardContent>
            </Card>

            {/* Donation History */}
            <Card>
                <CardHeader>
                    <CardTitle>{t('donor.donationHistory')}</CardTitle>
                </CardHeader>
                <CardContent>
                    {donationHistory.length > 0 ? (
                        <div className="space-y-3">
                            {donationHistory.map((donation) => (
                                <div
                                    key={donation.id}
                                    className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                                >
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">
                                            {donation.hospital.hospitalName}
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {new Date(donation.donationDate).toLocaleDateString()} • {donation.units} unit(s)
                                        </p>
                                    </div>
                                    <Badge variant="success">{donation.status}</Badge>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                            {t('donor.noDonations')}
                        </p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
};
