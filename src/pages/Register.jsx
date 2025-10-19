import RegisterForm from '../components/Auth/RegisterForm';
import { useAuth } from '../hooks/useAuth';

export default function Register() {
  const { login } = useAuth();
  return <RegisterForm onRegister={login} />;
}
