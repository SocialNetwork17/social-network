import {useMutation} from "@tanstack/react-query";
import {RegistrationType} from "@/features/signUp/lib/registrationSchema";
import {client} from "@/shared/api/client";
import {PATH} from "@/shared/constants/routings";
import {handleError} from "@/shared/utils/handleError";
import {EditProfileType} from "@/features/editProfile/model/editProfile.schema";

export const useUpdateProfileInformation = () => {
    const mutation = useMutation({
        mutationKey: ['profile', 'update profile information'],
        mutationFn:  async (data: EditProfileType) => {
            const response = await client.PUT('/api/v1/users/profile', {
                body: {
                    ...data,
                    dateOfBirth: data.dateOfBirth.toDateString(),
                    city: '',
                    country: '',
                    region: ''
                },
            })
            if (response.error) {
                handleError(response.error)
            }
            return response.data
        },
    })
    return mutation
}