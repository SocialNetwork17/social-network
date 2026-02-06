import createClient from 'openapi-fetch';
import type { paths } from '@/shared/api/schema';
import type { Middleware } from 'openapi-fetch';

// Middleware только для сервера
const serverAuthMiddleware: Middleware = {
  async onRequest({ request }) {
    // Проверяем, что мы на сервере
    if (typeof window !== 'undefined') {
      // Если мы на клиенте, просто возвращаем request
      // Этот middleware НЕ должен использоваться на клиенте!
      return request;
    }
    
    try {
      // На сервере импортируем next/headers динамически
      const { cookies } = await import('next/headers');
      const cookieStore = cookies();
      
      const token = cookieStore.get('accessToken')?.value;
      
      if (token && request) {
        request.headers.set('Authorization', `Bearer ${token}`);
      }
    } catch (error) {
      console.error('Failed to get cookies on server:', error);
    }
    
    return request;
  },
  
  async onResponse({ request, response }) {
    // Проверяем, что мы на сервере
    if (typeof window !== 'undefined' || response.status !== 401) {
      return response;
    }
    
    try {
      const { cookies } = await import('next/headers');
      const cookieStore = cookies();
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      
      const res = await fetch(`${baseUrl}/api/v1/auth/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Cookie: cookieStore.toString(),
        },
      });

      if (res.ok) {
        const body = await res.json();
        const newAccessToken = body?.accessToken;
        
        if (newAccessToken) {
          const headers = new Headers(request.headers);
          headers.set('Authorization', `Bearer ${newAccessToken}`);
          const retryRequest = new Request(request, { headers });
          return fetch(retryRequest);
        }
      }
    } catch (error) {
      console.error('Server refresh failed:', error);
    }
    
    return response;
  },
};

// Фабрика для создания серверных клиентов
export function createServerClient() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_BASE_URL is not defined");
  }

  // Создаем клиент с типизацией из вашей схемы
  const serverClient = createClient<paths>({ baseUrl });
  
  // Подключаем middleware для аутентификации
  serverClient.use(serverAuthMiddleware);
  
  return serverClient;
}

// Экспортируем готовый экземпляр (можно переиспользовать)
export const serverClient = createServerClient();