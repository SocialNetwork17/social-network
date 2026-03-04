// @flow
import * as React from 'react';
import {useState} from 'react';
import {Input} from "@/shared/ui/Input/Input";
import styles from "./UpdateProfileInformationForm.module.scss"
import {DatePicker} from "@/shared/ui/DatePicker/DatePicker";
import {Controller, FieldErrors, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {editProfileSchema, EditProfileType} from "@/features/editProfile/model/editProfile.schema";
import {Button} from "@/shared/ui/Button/Button";
import SelectBox from "@/shared/ui/select-box/SelectBox";
import {TextArea} from "@/shared/ui/TextArea/TextArea";
import {useUpdateProfileInformationMutation} from "@/features/editProfile/api/useUpdateProfileInformation";
import {useQueryClient} from "@tanstack/react-query";
import {City, countries, Country} from "@/shared/constants/geo/countries";
import {Spinner} from "@/shared/ui/Spinner/Spinner";
import {SchemaProfileViewModel} from "@/shared/api/schema";
import {getErrorMessage} from "@/shared/utils/handleError";
import {useSnackbar} from "@/widgets/snackbar/model/snackbar.context";
import {ErrorWithMessageResponse} from "@/shared/types/types";

type Props = {
    profileData: SchemaProfileViewModel
}

export const UpdateProfileInformationForm = ({profileData}: Props) => {

    const queryClient = useQueryClient()
    const {successSnackbar} = useSnackbar()
    const {mutate: updateProfileInformation, isPending} = useUpdateProfileInformationMutation()
    const [cities, setCities] = useState<City[]>([])

    const {
        register,
        control,
        handleSubmit,
        setValue,
        formState: {errors, isValid},
        setError

    } = useForm<EditProfileType>({
        resolver: zodResolver(editProfileSchema),
        mode: "onChange",
        defaultValues: {
            userName: profileData?.userName,
            firstName: profileData?.firstName ?? '',
            lastName: profileData?.lastName ?? '',
            aboutMe: profileData?.aboutMe ?? '',
            dateOfBirth: profileData?.dateOfBirth
                ? new Date(profileData?.dateOfBirth)
                : undefined,
            cityId: profileData.city
                ? profileData.city
                : undefined,
            countryId: profileData.country
                ? profileData.country
                : undefined,
        }
    })

    const onSubmit = (data: EditProfileType) => {
        updateProfileInformation(data, {
            onSuccess: () => {
                successSnackbar("Your settings are saved!")
                queryClient.invalidateQueries({queryKey: ['my profile data']})
            },
            onError: (error: unknown) => {
                const err = getErrorMessage(error) as ErrorWithMessageResponse
                setError(err.field as keyof EditProfileType, {message: err.message})
            }
        })
    }

    const onError = (errors: FieldErrors<EditProfileType>) => {
        console.log(errors)
    }

    return (
        <form className={styles.editProfileForm} onSubmit={handleSubmit(onSubmit, onError)}>
            <div className={styles.inputsContainer}>
                <Input
                    label={'Username'}
                    type={'text'}
                    required
                    {...register("userName")}
                    error={!!errors.userName}
                    errorText={errors.userName?.message}
                />
                <Input
                    label={'First Name'}
                    type={'text'}
                    required
                    {...register("firstName")}
                    error={!!errors.firstName}
                    errorText={errors.firstName?.message}
                />
                <Input
                    label={'Last name'}
                    type={'text'}
                    required
                    {...register("lastName")}
                    error={!!errors.lastName}
                    errorText={errors.lastName?.message}
                />
            </div>
            <Controller
                name="dateOfBirth"
                control={control}
                render={({field, fieldState}) => (
                    <DatePicker
                        label="Date of Birth"
                        mode="single"
                        required
                        value={field.value}
                        onChange={field.onChange}
                        error={fieldState.error?.message}
                    />
                )}
            />
            <div className={styles.selectsContainer}>
                <Controller
                    name="countryId"
                    control={control}
                    render={({field}) => (
                        <SelectBox<Country>
                            label="Choose your country"
                            options={countries}
                            defaultValue={countries.find(c => c.id === field.value)}
                            onChange={(country) => {
                                field.onChange(country.id)
                                setCities(country.cities)
                                setValue("cityId", "")
                            }}
                            placeholder="Country"
                        />
                    )}
                />
                <Controller
                    name="cityId"
                    control={control}
                    render={({field}) => (
                        <SelectBox<City>
                            label="Choose your city"
                            options={cities}
                            defaultValue={cities.find(c => c.id === field.value)}
                            disabled={!cities.length}
                            onChange={(city) => field.onChange(city.id)}
                            placeholder="City"
                        />
                    )}
                />
            </div>
            <div className={styles.textareaContainer}>
                <Controller
                    name="aboutMe"
                    control={control}
                    render={({field}) => (
                        <TextArea
                            label="About Me"
                            maxLength={200}
                            value={profileData?.aboutMe || ''}
                            onChange={field.onChange}
                            error={!!errors.aboutMe}
                            errorText={errors.aboutMe?.message}
                        />
                    )}
                />
            </div>
            <div className={styles.divider}></div>
            <div className={styles.buttonContainer}>
                <Button
                    variant={"primary"}
                    disabled={isPending || !isValid}
                    width={159}
                    height={36}
                    type="submit"
                >
                    {isPending ? <Spinner/> : 'Save Changes'}
                </Button>
            </div>
        </form>
    )
}