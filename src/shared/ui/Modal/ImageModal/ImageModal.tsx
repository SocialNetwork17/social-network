'use client'

import { useEffect } from 'react'
import styles from './ImageModal.module.scss'
import { PostsArray } from '@/entites/profile/userData'

type ImageModalProps = {
  isOpen: boolean
  onClose: () => void
  postInfo: PostsArray
  alt?: string
  isLoading: boolean
}

export default function ImageModal({ isOpen, onClose, postInfo, alt = '' }: ImageModalProps) {
  if (!isOpen) return null

  return (
    <div className={styles.container}>

    </div>
  )

//   // Блокируем скролл при открытии модалки
//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = 'hidden'
//       document.addEventListener('keydown', handleEscapeKey)
//     }

//     return () => {
//       document.body.style.overflow = 'unset'
//       document.removeEventListener('keydown', handleEscapeKey)
//     }
//   }, [isOpen])

//   const handleEscapeKey = (e: KeyboardEvent) => {
//     if (e.key === 'Escape') {
//       onClose()
//     }
//   }

//   const handleBackdropClick = (e: React.MouseEvent) => {
//     if (e.target === e.currentTarget) {
//       onClose()
//     }
//   }

//   if (!isOpen) return null

//   return (
//     <div
//       className={styles.modalBackdrop}
//       onClick={handleBackdropClick}
//       role="dialog"
//       aria-modal="true"
//       aria-label="Увеличенное изображение"
//     >
//       <div className={styles.modalContent}>
//         <div>
//           <Card images={postInfo.images} />
//         </div>
//         <button
//           onClick={onClose}
//           className={styles.closeButton}
//           aria-label="Закрыть модальное окно"
//         >
//           ✕
//         </button>
//       </div>
//     </div>
//   )
// }

// Блокируем скролл
  

//тут второй вариант
// useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = 'hidden'
//       const handleEscape = (e: KeyboardEvent) => {
//         if (e.key === 'Escape') onClose()
//       }
//       document.addEventListener('keydown', handleEscape)
      
//       return () => {
//         document.body.style.overflow = 'unset'
//         document.removeEventListener('keydown', handleEscape)
//       }
//     }
//   }, [isOpen, onClose])

//   const handleBackdropClick = (e: React.MouseEvent) => {
//     if (e.target === e.currentTarget) {
//       onClose()
//     }
//   }

//   return (
//     <div 
//       className="fixed inset-0 z-50 flex items-center justify-center bg-black/75"
//       onClick={handleBackdropClick}
//     >
//       <div className="relative max-w-4xl max-h-[90vh] p-4">
//         {isLoading ? (
//           <div className="text-white">Загрузка...</div>
//         ) : postInfo ? (
//           <img 
//             src={postInfo.images[0]?.url} 
//             alt="Post"
//             className="max-h-[80vh] max-w-full object-contain"
//           />
//         ) : (
//           <div className="text-white">Ошибка загрузки</div>
//         )}
        
//         <button
//           onClick={onClose}
//           className="absolute top-2 right-2 text-white bg-black/50 hover:bg-black/70 rounded-full w-8 h-8 flex items-center justify-center"
//         >
//           ✕
//         </button>
//       </div>
//     </div>
//   )
}
