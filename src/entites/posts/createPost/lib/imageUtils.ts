//Эта утилита берёт выбранную пользователем область, вырезает её через canvas и возвращает Blob — то есть файл в памяти браузера, который можно отправить на сервер. Async и Promise нужны, потому что загрузка картинки и создание файла происходят не мгновенно.

// способ в браузере получить реальный файл (Blob) после обрезки и отправить его на сервер

//библиотека даёт координаты, canvas режет изображение, функция возвращает Blob (который можно отправить на сервер).

export async function getCroppedImg(
    imageSrc: string,                                               //строка с картинкой
    crop: { x: number; y: number; width: number; height: number }   // координаты выбранной области, приходят из react-easy-crop
): Promise<Blob> {

    // 1. Загружаем картинку
    const image = new Image()                   //создаём HTML-элемент <img> в памяти
    image.src = imageSrc                        //загрузи вот эту картинку
    image.crossOrigin = 'anonymous'             // разрешаем canvas безопасно работать с картинкой

    await new Promise((resolve, reject) => { //ждём, пока картинка загрузится
        image.onload = resolve                  //картинка загрузилась — продолжаем
        image.onerror = reject                  //если ошибка — прерываем функцию
    })

    // 2. Создаём canvas (виртуальный холст)
    const canvas = document.createElement('canvas')
    canvas.width = crop.width                   //задаём ширину холста, ровно как ширина кропа
    canvas.height = crop.height

    const ctx = canvas.getContext('2d')  //инструмент для рисования
    if (!ctx) throw new Error('No canvas context')                  //если вдруг контекста нет — ошибка

    // 3. Рисуем нужный кусок картинки
    ctx.drawImage(
        image,
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        0,
        0,
        crop.width,
        crop.height
    )

    // 4. Превращаем canvas в Blob
    return new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {                   //браузер превращает canvas в файл
            if (!blob) reject(new Error('Failed to create blob'))   //защита: если файл не создался
            else resolve(blob)                                      //возвращаем готовый файл
        }, 'image/jpeg', 0.92)
    })
}
