import { useRouter } from 'next/router';
import { useEffect } from 'react';

const ErrorPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.push('/');
  });
};

export default ErrorPage;
