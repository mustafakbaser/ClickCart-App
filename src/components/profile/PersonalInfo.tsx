import { User } from '@supabase/supabase-js';
import { motion } from 'framer-motion';
import { AvatarUpload } from './personal/AvatarUpload';
import { BasicInfo } from './personal/BasicInfo';
import { ContactInfo } from './personal/ContactInfo';
import { Activity } from 'lucide-react';

interface PersonalInfoProps {
  user: User;
}

export function PersonalInfo({ user }: PersonalInfoProps) {
  const handleProfileUpdate = () => {
    window.location.reload();
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Personal Information</h2>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Activity className="h-4 w-4" />
          <span>Last updated: {new Date(user.updated_at).toLocaleDateString()}</span>
        </div>
      </div>

      <motion.div 
        className="bg-gradient-to-br from-brand-primary/5 to-brand-dark/5 rounded-xl p-8 text-center"
        variants={itemVariants}
      >
        <AvatarUpload user={user} onAvatarUpdate={handleProfileUpdate} />
        <p className="mt-4 text-sm text-gray-500">
          Click the camera icon to update your profile picture
        </p>
        <div className="mt-4 text-xs text-gray-400">
          Supported formats: JPG, PNG, GIF (max 5MB)
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div variants={itemVariants}>
          <BasicInfo user={user} onUpdate={handleProfileUpdate} />
        </motion.div>
        <motion.div variants={itemVariants}>
          <ContactInfo user={user} onUpdate={handleProfileUpdate} />
        </motion.div>
      </div>

      <motion.div 
        className="bg-blue-50 rounded-lg p-4 text-sm text-blue-700"
        variants={itemVariants}
      >
        <p className="flex items-center">
          <span className="font-medium">Pro tip:</span>
          <span className="ml-2">
            Keeping your profile information up to date helps us provide you with better service
            and ensures you don't miss important notifications.
          </span>
        </p>
      </motion.div>
    </motion.div>
  );
}