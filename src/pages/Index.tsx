import { AuthProvider, useAuth } from '@/lib/auth';
import LoginScreen from '@/components/admin/LoginScreen';
import AdminLayout from '@/components/admin/AdminLayout';

const Gate = () => {
  const { user } = useAuth();
  return user ? <AdminLayout /> : <LoginScreen />;
};

const Index = () => (
  <AuthProvider>
    <Gate />
  </AuthProvider>
);

export default Index;
