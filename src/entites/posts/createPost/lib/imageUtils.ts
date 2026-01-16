export async function getCroppedImg(
    imageSrc: string,
    pixelCrop: { x: number; y: number; width: number; height: number } | null,
    filter: string = 'none'
): Promise<Blob> {

    const image = new Image()
    image.src = imageSrc
    image.crossOrigin = 'anonymous'

    await new Promise((resolve, reject) => {
        image.onload = resolve
        image.onerror = reject
    })

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    if (!ctx) throw new Error('No canvas context')

    // Если координат кропа нет, берем всю картинку
    const crop = pixelCrop || {
        x: 0,
        y: 0,
        width: image.naturalWidth,
        height: image.naturalHeight,
    }

    canvas.width = crop.width
    canvas.height = crop.height

    // Применяем фильтр
    ctx.filter = filter

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

    return new Promise((resolve, reject) => {
        canvas.toBlob((blob) => {
            if (!blob) {
                reject(new Error('Canvas is empty'))
                return
            }
            resolve(blob)
        }, 'image/jpeg', 0.95)
    })
}