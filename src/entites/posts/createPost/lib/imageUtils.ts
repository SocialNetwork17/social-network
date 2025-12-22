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

// import { Area } from "react-easy-crop";
//
// export async function getCroppedImg(
//     imageSrc: string,
//     crop: Area
// ): Promise<Blob> {
//     const image = new Image();
//     image.crossOrigin = 'anonymous';
//
//     const promise = new Promise((resolve, reject) => {
//         image.onload = resolve;
//         image.onerror = reject;
//     });
//
//     image.src = imageSrc;
//     await promise;
//
//     const canvas = document.createElement('canvas');
//     // Используем pixel-координаты от библиотеки
//     canvas.width = crop.width;
//     canvas.height = crop.height;
//
//     const ctx = canvas.getContext('2d');
//     if (!ctx) throw new Error('No canvas context');
//
//     ctx.drawImage(
//         image,
//         crop.x,
//         crop.y,
//         crop.width,
//         crop.height,
//         0,
//         0,
//         crop.width,
//         crop.height
//     );
//
//     return new Promise((resolve, reject) => {
//         canvas.toBlob((blob) => {
//             if (!blob) reject(new Error('Failed to create blob'));
//             else resolve(blob);
//         }, 'image/jpeg', 0.90); // Слегка жмем качество для экономии места
//     });
// }


// // imageUtils.ts
// export type PixelCrop = { x: number; y: number; width: number; height: number }
//
// export async function getCroppedImg(imageSrc: string, pixelCrop: PixelCrop): Promise<Blob> {
//     // create image
//     const image = await new Promise<HTMLImageElement>((resolve, reject) => {
//         const img = new Image()
//         img.onload = () => resolve(img)
//         img.onerror = (e) => reject(new Error('Image load error'))
//         // object URLs work fine without crossOrigin; for remote images you may need CORS
//         img.crossOrigin = 'anonymous'
//         img.src = imageSrc
//     })
//
//     // canvas size must consider devicePixelRatio for crispness
//     const canvas = document.createElement('canvas')
//     const ctx = canvas.getContext('2d')
//     if (!ctx) throw new Error('No canvas context')
//
//     const scaleX = image.naturalWidth / image.width
//     const scaleY = image.naturalHeight / image.height
//
//     // pixelCrop already in px of original natural size when using react-easy-crop,
//     // but in case it's relative to displayed image, we detect and handle.
//     // Ensure integer sizes:
//     const pixelRatio = window.devicePixelRatio || 1
//     const outWidth = Math.round(pixelCrop.width * pixelRatio)
//     const outHeight = Math.round(pixelCrop.height * pixelRatio)
//
//     canvas.width = outWidth
//     canvas.height = outHeight
//
//     // drawImage arguments: source x,y,width,height -> dest 0,0,width,height
//     // If pixelCrop is relative to natural size -> draw directly
//     // But if pixelCrop was relative to displayed size, scale it via scaleX/scaleY
//     // Heuristic: if crop coords are larger than naturalWidth, scale down - but usually pixelCrop is correct.
//     ctx.scale(pixelRatio, pixelRatio)
//
//     // compute source coords in natural pixels
//     const sx = pixelCrop.x
//     const sy = pixelCrop.y
//     const sWidth = pixelCrop.width
//     const sHeight = pixelCrop.height
//
//     ctx.drawImage(
//         image,
//         sx,
//         sy,
//         sWidth,
//         sHeight,
//         0,
//         0,
//         sWidth,
//         sHeight
//     )
//
//     return await new Promise<Blob>((resolve, reject) => {
//         canvas.toBlob((blob) => {
//             if (!blob) reject(new Error('Canvas is empty'))
//             else resolve(blob)
//         }, 'image/jpeg', 0.92)
//     })
// }
