export type UploadImageResponseItem = {
    url: string
    width: number
    height: number
    fileSize: number
    createdAt: string
    uploadId: string
}


export type CropArea = {
    x: number
    y: number
    width: number
    height: number
}

export type ImageItem = {
    id: string
    file: File
    url: string

    // crop-related state
    crop: { x: number; y: number }
    zoom: number
    aspect: number //соотношение сторон

    croppedAreaPixels: CropArea | null
    croppedBlob: Blob | null

    croppedPreviewUrl?: string
    uploadInfo?: unknown
}
