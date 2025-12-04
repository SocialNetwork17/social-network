//глобальное хранилище для accessToken.
// зачем?
// Middleware физически не может получить токен другим способом
// React state доступен только внутри компонентов
// Единый источник токена для всех

let _accessToken: string | null = null;
//Подчёркивание _ — это просто соглашение между разработчиками - эту переменную не трогать напрямую


export const tokenService = {
    // Метод для получения текущего токена
    get() {
        return _accessToken;
    },
    // Метод для установки нового токена
    set(token: string | null) {
        _accessToken = token;
    },
    // Метод для очистки токена
    clear() {
        _accessToken = null;
    },
};
