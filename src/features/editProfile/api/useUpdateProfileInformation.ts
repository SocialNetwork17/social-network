import {useMutation, useQueryClient} from "@tanstack/react-query";
import {client} from "@/shared/api/client";
import {handleError} from "@/shared/utils/handleError";
import {EditProfileType} from "@/features/editProfile/model/editProfile.schema";

export const useUpdateProfileInformationMutation = () => {
    const mutation = useMutation({
        mutationKey: ['update profile information'],
        mutationFn:  async (data: EditProfileType) => {
            const response = await client.PUT('/api/v1/users/profile', {
                body: {
                    ...data,
                    dateOfBirth: data.dateOfBirth?.toDateString(),
                },
            })
            if (response.error) {
                handleError(response.error)
            }
            return response.data
        },
        retry: 1,
    })

    return mutation
}