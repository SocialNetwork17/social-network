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
    crop: { x: number; y: number }
    zoom: number
    aspect: number
    croppedAreaPixels?: CropArea
    croppedBlob?: Blob
    croppedPreviewUrl?: string
    isCropped: boolean
    filter: string
}
