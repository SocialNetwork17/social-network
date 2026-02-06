import { Profile } from '@/pages/profile/ui/Profile'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

export default async  function ProfilePage() {
  const queryClient = new QueryClient();
  
  await queryClient.prefetchQuery({
    queryKey: ['my profile data'],
    queryFn: async () => {
      // Динамический импорт, чтобы избежать включения серверного кода в клиентский бандл
      const { createServerClient } = await import('@/shared/api/server-client');
      
      // Создаем клиент (синхронная версия)
      const serverClient = createServerClient();
      
      // Или используем асинхронную версию:
      // const { createAsyncServerClient } = await import('@/shared/api/server-client');
      // const serverClient = await createAsyncServerClient();
      
      const response = await serverClient.GET('/api/v1/users/profile');
      
      if (response.error) {
        console.error('Profile fetch error:', response.error);
        return null;
      }
      
      return response.data;
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Profile />
    </HydrationBoundary>
  )
}
