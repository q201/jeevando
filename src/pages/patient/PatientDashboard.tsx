import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useAuthStore } from '@/store/authStore';
import { usePatientStore } from '@/store/patientStore';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Plus, Clock, CheckCircle } from 'lucide-react';
import type { Patient, BloodType, UrgencyLevel } from '@/types';

export const PatientDashboard: React.FC = () => {
    const { t } = useTranslation();
    const { user } = useAuthStore();
    const { requests, createRequest, fetchRequests } = usePatientStore();
    const patient = user as Patient;
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
        if (patient?.id) {
            fetchRequests(patient.id);
        }
    }, [patient?.id]);

    const onSubmit = async (data: any) => {
        await createRequest({
            patientId: patient.id,
            bloodType: data.bloodType as BloodType,
            unitsRequired: parseInt(data.unitsRequired),
            urgency: data.urgency as UrgencyLevel,
            location: patient.location,
            description: data.description,
            status: 'pending',
            requiredBy: data.requiredBy,
        });
        setIsModalOpen(false);
        reset();
    };

    const getUrgencyColor = (urgency: UrgencyLevel) => {
        const colors = {
            low: 'info',
            medium: 'warning',
            high: 'warning',
            critical: 'critical',
        };
        return colors[urgency] as any;
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        {t('patient.myRequests')}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                        {t('patient.manageRequests')}
                    </p>
                </div>
                <Button onClick={() => setIsModalOpen(true)}>
                    <Plus className="w-5 h-5 mr-2" />
                    {t('patient.createRequest')}
                </Button>
            </div>

            {/* Requests List */}
            {requests.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                    {requests.map((request) => (
                        <Card key={request.id} hover>
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                                {request.bloodType} Blood Request
                                            </h3>
                                            <Badge variant={getUrgencyColor(request.urgency)}>
                                                {t(`urgency.${request.urgency}`)}
                                            </Badge>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-400">{request.description}</p>
                                    </div>
                                    <Badge variant={request.status === 'completed' ? 'success' : 'default'}>
                                        {t(`status.${request.status}`)}
                                    </Badge>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                    <div>
                                        <p className="text-gray-500 dark:text-gray-400">{t('patient.unitsRequired')}</p>
                                        <p className="font-medium text-gray-900 dark:text-white">{request.unitsRequired}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 dark:text-gray-400">{t('patient.requiredBy')}</p>
                                        <p className="font-medium text-gray-900 dark:text-white">
                                            {new Date(request.requiredBy).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 dark:text-gray-400">{t('common.createdAt')}</p>
                                        <p className="font-medium text-gray-900 dark:text-white">
                                            {new Date(request.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 dark:text-gray-400">{t('hospital.hospital')}</p>
                                        <p className="font-medium text-gray-900 dark:text-white">
                                            {request.hospital?.hospitalName || 'N/A'}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <Card>
                    <CardContent className="text-center py-12">
                        <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500 dark:text-gray-400 mb-4">{t('patient.noRequests')}</p>
                        <Button onClick={() => setIsModalOpen(true)}>
                            {t('patient.createFirstRequest')}
                        </Button>
                    </CardContent>
                </Card>
            )}

            {/* Create Request Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={t('patient.createRequest')}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                {t('auth.bloodType')}
                            </label>
                            <select
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                                {...register('bloodType', { required: true })}
                                defaultValue={patient?.bloodType}
                            >
                                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((type) => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>

                        <Input
                            label={t('patient.unitsRequired')}
                            type="number"
                            min="1"
                            defaultValue="1"
                            {...register('unitsRequired', { required: true })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                {t('patient.urgencyLevel')}
                            </label>
                            <select
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                                {...register('urgency', { required: true })}
                            >
                                <option value="low">{t('urgency.low')}</option>
                                <option value="medium">{t('urgency.medium')}</option>
                                <option value="high">{t('urgency.high')}</option>
                                <option value="critical">{t('urgency.critical')}</option>
                            </select>
                        </div>

                        <Input
                            label={t('patient.requiredBy')}
                            type="date"
                            {...register('requiredBy', { required: true })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            {t('patient.description')}
                        </label>
                        <textarea
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                            rows={3}
                            placeholder={t('patient.descriptionPlaceholder')}
                            {...register('description', { required: true })}
                        />
                    </div>

                    <div className="flex gap-2 justify-end">
                        <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
                            {t('common.cancel')}
                        </Button>
                        <Button type="submit">
                            {t('patient.submitRequest')}
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};
