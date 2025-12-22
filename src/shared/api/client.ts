import createClient from "openapi-fetch";
import type {paths} from "@/shared/api/schema";
import {Middleware} from "openapi-fetch";
import {tokenService} from "@/shared/api/tokenService";


const baseUrl: string = 'https://inctagram.work'

// mutex - это механизм обновления accessToken с защитой от параллельных запросов.
//Автоматически получает новый accessToken через refreshToken
// Гарантирует, что только один запрос на обновление выполняется в один момент времени

// Хранит Promise, который разрешится в новый токен
let refreshPromise: Promise<string> | null = null;


// doRefresh Эта функция всегда возвращает Promise<string> (новый токен)
//  создаёт новый HTTP запрос ТОЛЬКО если его ещё нет
// Функция doRefresh() вызывается в middleware в блоке onResponse, когда ловим статус 401
async function doRefresh(): Promise<string> {

    if (!refreshPromise) {
        refreshPromise = (async () => {

            //fetch вызываем напрямую, не через client, чтобы не зациклиться (если бы мы использовали client, то middleware снова мог бы поймать 401 и вызвать doRefresh — рекурсия).
            const res = await fetch(`${baseUrl}/api/v1/auth/update`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            });

            if (!res.ok) {
                throw new Error("Refresh failed");
            }
            const body = await res.json(); //Достаём тело ответа
            const newAccessToken = body?.accessToken; // получаем токен из ответа
            if (!newAccessToken) throw new Error("No accessToken returned on refresh"); // если токена нет кидаем ошибку
            tokenService.set(newAccessToken); //сохр токен в память
            return newAccessToken;
        })();

        // Автоматическая очистка мьютекса
        refreshPromise.finally(() => (refreshPromise = null));
    }

    return refreshPromise;
}

const authMiddleware: Middleware = {
    async onRequest({ request, options }) {

        // добавляем Authorization если accessToken есть в tokenService
        const accessToken = tokenService.get();
        if (accessToken) {
            request.headers.set("Authorization", `Bearer ${accessToken}`)
        }

        return request

    },
    async onResponse({ request, response, options }) {

        if (response.ok) return response;

        // если получили 401 — пробуем refresh
        if (response.status === 401) {
            try {
                const newAccessToken = await doRefresh();
                // повторяем исходный запрос с новым access token
                const original = new Request(request);
                const headers = new Headers(original.headers);
                headers.set("Authorization", `Bearer ${newAccessToken}`);
                const retry = new Request(original, { headers });
                return fetch(retry);
            } catch (e) {
                // refresh не удался — пробрасываем оригинальный response дальше
                return response;
            }
        }

        // другое не-OK поведение — проброс
        return response;

    },
    async onError({ error }) {

    },
};



// const baseUrl: string = process.env.NEXT_PUBLIC_BASE_URL;
// if (!baseUrl) throw new Error("NEXT_PUBLIC_BASE_URL is not defined");

export const client = createClient<paths>({
    baseUrl,
    headers: {}
});

client.use(authMiddleware);