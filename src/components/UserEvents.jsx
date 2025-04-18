import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Calendar, MapPin, Users, Globe, Tag, Clock } from 'lucide-react';
import Swal from 'sweetalert2';
import UpdateEvent from './UpdateEvent';
import { useTranslation } from 'react-i18next';

const UserEvents = () => {
  const { t } = useTranslation();
  const { user: currentUser } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();
  const [editingEvent, setEditingEvent] = useState(null);

  const { data: { data: events = [] } = {}, isLoading } = useQuery({
    queryKey: ['userEvents', currentUser?.email],
    queryFn: async () => {
      const res = await axiosPublic.get(`/events/userEvents/${currentUser?.email}`);
      return res.data;
    },
    enabled: !!currentUser?.email
  });

  const updateMutation = useMutation({
    mutationFn: (updatedEvent) =>
      axiosPublic.patch(`/events/${updatedEvent._id}`, updatedEvent),
    onSuccess: () => {
      queryClient.invalidateQueries(['userEvents', currentUser?.email]);
      setEditingEvent(null);
      Swal.fire(t('user_events.update_success.title'), t('user_events.update_success.message'), 'success');
    },
    onError: (error) => {
      Swal.fire(t('common.error'), error.response?.data?.message || t('user_events.update_error'), 'error');
    }
  });

  const deleteMutation = useMutation({
    mutationFn: (eventId) => axiosPublic.delete(`/events/${eventId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(['userEvents', currentUser?.email]);
      Swal.fire(t('user_events.delete_success.title'), t('user_events.delete_success.message'), 'success');
    },
    onError: (error) => {
      Swal.fire(t('common.error'), error.response?.data?.message || t('user_events.delete_error'), 'error');
    }
  });

  const handleEdit = (event) => {
    setEditingEvent(event);
  };

  const handleCancelEdit = () => {
    setEditingEvent(null);
  };

  const handleDelete = (eventId) => {
    Swal.fire({
      title: t('user_events.delete_confirm.title'),
      text: t('user_events.delete_confirm.text'),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: t('user_events.delete_confirm.confirm_button')
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(eventId);
      }
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(t('common.locale'), {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) return <div className="text-center py-8">{t('user_events.loading')}</div>;

  if (editingEvent) {
    return (
      <UpdateEvent
        event={editingEvent}
        onCancel={handleCancelEdit}
        onSubmit={(updatedEvent) => updateMutation.mutate(updatedEvent)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold border-b pb-4">
        {t('user_events.title')} ({events.length})
      </h2>

      {events.length === 0 ? (
        <div className="text-center py-8">{t('user_events.no_events')}</div>
      ) : (
        <div className="space-y-6">
          {events.map(event => (
            <div key={event._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold">{event.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`badge capitalize ${event.status === 'pending' ? 'badge-primary' : event.status === 'approved' ? 'badge-success' : 'badge-error'}`}>
                        {t(`user_events.status.${event.status}`)}
                      </span>
                      <span className="text-sm text-gray-500">
                        {t('user_events.last_updated')}: {formatDate(event.updatedAt)}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(event)}
                      className="btn btn-sm btn-outline"
                    >
                      {t('common.edit')}
                    </button>
                    <button
                      onClick={() => handleDelete(event._id)}
                      className="btn btn-sm btn-error text-white"
                    >
                      {t('common.delete')}
                    </button>
                  </div>
                </div>

                <p className="mt-3 text-gray-600">{event.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="text-gray-500" size={18} />
                      <p>
                        <span className="font-medium">{t('user_events.dates')}:</span> {formatDate(event.startDate)} - {formatDate(event.endDate)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="text-gray-500" size={18} />
                      <p>
                        <span className="font-medium">{t('user_events.location')}:</span> {event.location} ({event.format})
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="text-gray-500" size={18} />
                      <p>
                        <span className="font-medium">{t('user_events.audience')}:</span> {event.targetAudience?.join(', ')}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Tag className="text-gray-500" size={18} />
                      <p>
                        <span className="font-medium">{t('user_events.type')}:</span> {event.eventType} ({event.scientificField})
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="text-gray-500" size={18} />
                      <p>
                        <span className="font-medium">{t('user_events.deadlines')}:</span>
                        {event.subThemeDeadline && <span className="block ml-5">{t('user_events.sub_theme')}: {formatDate(event.subThemeDeadline)}</span>}
                        {event.submissionDeadline && <span className="block ml-5">{t('user_events.article')}: {formatDate(event.submissionDeadline)}</span>}
                        {event.registrationDeadline && <span className="block ml-5">{t('user_events.registration')}: {formatDate(event.registrationDeadline)}</span>}
                      </p>
                    </div>
                  </div>
                </div>

                {event.tags?.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {event.tags.map(tag => (
                      <span key={tag} className="badge badge-outline">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserEvents;