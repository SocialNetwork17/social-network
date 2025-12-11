//глобальное хранилище для accessToken.

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
