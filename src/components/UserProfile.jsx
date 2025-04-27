import { useContext, useState,  } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { fill } from '@cloudinary/url-gen/actions/resize';
import supabase from '../utils/supabase';
import { useTranslation } from 'react-i18next';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { AuthContext } from '../context/AuthContext';

const cld = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
  }
});

const UserProfile = () => {
  const { t } = useTranslation();
  
  const { user: currentUser } = useContext(AuthContext)
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [image, setImage] = useState(null);

  const defaultUser = {
    name: currentUser?.user_metadata?.full_name || '',
    email: currentUser?.email || '',
    profilePicture: currentUser?.user_metadata?.avatar_url || '',
    mobileNumber: '',
    address: '',
    occupation: '',
    favorites: []
  };

  const { data: user = defaultUser, isLoading } = useQuery({
    queryKey: ['user', currentUser?.email],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`/users/private/${currentUser?.email}`);
        return {
          ...defaultUser,
          ...res.data?.data
        };
      } catch (error) {
        console.error('Error fetching user:', error);
        return defaultUser;
      }
    },
    enabled: !!currentUser?.email
  });

  const updateMutation = useMutation({
    mutationFn: async (updatedData) => {
      await axiosSecure.patch(`/users/profile/${currentUser?.email}`, updatedData);
      
      if (updatedData.name || updatedData.profilePicture) {
        await supabase.auth.updateUser({
          data: {
            full_name: updatedData.name || user.name,
            avatar_url: updatedData.profilePicture || user.profilePicture
          }
        });        
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['user', currentUser?.email]);
      setIsEditing(false);
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append('file', file);
    uploadData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

    try {
      const res = await axiosPublic.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        uploadData
      );
      setImage(res.data.secure_url);
      setFormData(prev => ({ ...prev, profilePicture: res.data.secure_url }));
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateMutation.mutate({
      ...formData,
      name: formData.name || user.name,
      profilePicture: formData.profilePicture || user.profilePicture
    });
  };

  if (isLoading) return <div className="text-center py-8">{t('profile.loading')}</div>;

  const myImage = cld.image(user.profilePicture?.split('/').pop().split('.')[0]);
  myImage.resize(fill().width(150).height(150));

  return (
    <div className="space-y-4">
      <div className="border-b pb-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold">{t('profile.title')}</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="btn btn-primary"
        >
          {isEditing ? t('profile.cancel') : t('profile.edit_button')}
        </button>
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center gap-4 w-full md:w-1/3">
              <div className="relative">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 border-2 border-primary">
                  {image ? (
                    <img src={image} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <AdvancedImage cldImg={myImage} className="w-full h-full object-cover" />
                  )}
                </div>
                <label className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-primary text-white px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-primary-focus transition">
                  {t('profile.change_photo')}
                  <input
                    type="file"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="text-sm text-gray-500">{t('profile.upload_hint')}</p>
            </div>

            <div className="w-full md:w-2/3 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">{t('profile.full_name')}*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={user.name}
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">{t('profile.email')}</span>
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    className="input input-bordered w-full bg-gray-100"
                    disabled
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">{t('profile.mobile')}</span>
                  </label>
                  <input
                    type="text"
                    name="mobileNumber"
                    defaultValue={user.mobileNumber}
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                    placeholder={t('profile.mobile_placeholder')}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text font-semibold">{t('profile.occupation')}</span>
                  </label>
                  <input
                    type="text"
                    name="occupation"
                    defaultValue={user.occupation}
                    onChange={handleInputChange}
                    className="input input-bordered w-full"
                    placeholder={t('profile.occupation_placeholder')}
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">{t('profile.address')}</span>
                </label>
                <input
                  type="text"
                  name="address"
                  defaultValue={user.address}
                  onChange={handleInputChange}
                  className="input input-bordered w-full"
                  placeholder={t('profile.address_placeholder')}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="btn btn-ghost"
            >
              {t('profile.cancel')}
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={updateMutation.isLoading}
            >
              {updateMutation.isLoading ? (
                <>
                  <span className="loading loading-spinner"></span>
                  {t('profile.saving')}
                </>
              ) : t('profile.save_button')}
            </button>
          </div>
        </form>
      ) : (
        <div className="flex flex-col md:flex-row gap-8 my-8">
          <div className="flex flex-col items-center gap-3 w-full md:w-1/3">
            <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 border-2 border-primary">
              <AdvancedImage cldImg={myImage} className="w-full h-full object-cover" />
            </div>
            <h3 className="text-xl font-semibold">{user.name}</h3>
          </div>

          <div className="w-full md:w-2/3 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">{t('profile.email')}</p>
                <p className="text-base">{user.email}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">{t('profile.mobile')}</p>
                <p className="text-base">{user.mobileNumber || t('profile.not_provided')}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">{t('profile.occupation')}</p>
                <p className="text-base">{user.occupation || t('profile.not_provided')}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">{t('profile.address')}</p>
                <p className="text-base">{user.address || t('profile.not_provided')}</p>
              </div>
            </div>

            {user.favorites?.length > 0 && (
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-500">{t('profile.favorites')}</p>
                <p className="text-base">{user.favorites.length} {t('profile.saved')}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;