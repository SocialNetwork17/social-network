import {cancelCreatePostModalAC, ModalState} from "@/widgets/modal/model/modal.types";
import styles from './ModalWrapper.module.scss'
import {useModal} from "@/widgets/modal/model/modal.context";
import {useLockScroll} from "@/shared/hooks/useLockScroll";
import {CreatePostWizard} from "@/entites/posts/createPost/ui/CreatePostWizard";
import {BaseModal} from "@/widgets/modal/ui/baseModal/BaseModal";
import {useState} from "react";
import {WizardStep} from "@/entites/posts/createPost/lib/usePostWizard";
import ImageModal from "@/shared/ui/Modal/ImageModal/ImageModal";


export const ModalWrapper = () => {
    const {stack, clearModals, popModal, pushModal} = useModal()

    const [step, setStep] = useState<WizardStep | null>(null)

    useLockScroll(stack.length > 0)

    if (!stack.length) return null

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target !== e.currentTarget) return

        const topModal = stack[stack.length - 1]
        if(!topModal) return
        console.log(topModal)

        switch (topModal.type) {
            case 'CREATE_POST':
                if (step === 'UPLOAD' || step == null) {
                    clearModals()
                } else {
                    const isConfirmOpen = stack.some(m => m.type === 'CANCEL_CREATE_POST')
                    if (!isConfirmOpen) {
                        pushModal(cancelCreatePostModalAC({
                            title: 'Close',
                            description: 'Do you really want to close the creation of a publication?' + 'If you close everything will be deleted'

                        }))
                    }
                }
                break

            case 'CONFIRM_LOGOUT':
            case 'CONFIRM_REGISTRATION':
                popModal()
                break

            default:
                popModal()
        }
    }

    const renderModal = (modal: ModalState) => {
        switch (modal.type) {
            case 'DELETE_POST':
            case 'CONFIRM_REGISTRATION':
            case 'CONFIRM_LOGOUT':
            case 'CANCEL_CREATE_POST':
                return <BaseModal modal={modal}/>
            case 'CREATE_POST':
                return <CreatePostWizard setStep={setStep}/>
            case 'VIEW_POST':
                return (
                    <ImageModal
                        isOpen
                        postId={modal.payload.postId}
                        mode="view"
                        onClose={popModal}
                    />
                )
            case 'EDIT_POST':
                return (
                    <ImageModal
                        isOpen
                        postId={modal.payload.postId}
                        mode="edit"
                        onClose={popModal}
                    />
                )
            default:
                return null
        }
    }

    return (
        <>
            {stack.map((modal, index) => (
                <div
                    className={styles.backdrop}
                    onClick={handleBackdropClick}
                    key={index}
                    style={{zIndex: 1000 + index}}
                >
                    {renderModal(modal)}
                </div>
            ))}
        </>
    )
}