// @flow
import * as React from 'react';
import {Input} from "@/shared/ui/Input/Input";
import styles from "./UpdateProfileInformationForm.module.scss"
import {useDataMyProfileQuery} from "@/pages/profile/api/useDataMyProfileQuery";
import {DatePicker} from "@/shared/ui/DatePicker/DatePicker";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {editProfileSchema, EditProfileType} from "@/features/editProfile/model/editProfile.schema";
import {Button} from "@/shared/ui/Button/Button";
import SelectBox, {Option} from "@/shared/ui/select-box/SelectBox";
import {useState} from "react";
import {TextArea} from "@/shared/ui/TextArea/TextArea";
import {useUpdateProfileInformation} from "@/features/editProfile/api/useUpdateProfileInformation";

export const UpdateProfileInformationForm = () => {

    const {data: updateProfileInformation} = useUpdateProfileInformation()

    const [countries, setCountries] = useState<Option[]>( [
        { id: '1', label: 'Russian', countryCode: 'RU' },
        { id: '2', label: 'English', countryCode: 'GB' },
        { id: '3', label: 'Canadian', countryCode: 'CA' },
    ]);

    const { data } =  useDataMyProfileQuery()
    const {
        register,
        control,
        handleSubmit,

    } = useForm<EditProfileType>({
        resolver: zodResolver(editProfileSchema),
        defaultValues: {
            userName: data?.userName ?? '',
            firstName: data?.firstName ?? '',
            lastName: data?.lastName ?? '',
        }
    })

    const onSubmit = (data: EditProfileType) => {
        console.log(data)
    }

    return (
        <form className={styles.editProfileForm} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.inputsContainer}>
                <Input
                    label={'Username'}
                    type={'text'}
                    required={true}
                    {...register("userName")}
                />
                <Input
                    label={'First Name'}
                    type={'text'}
                    required={true}
                    {...register("firstName")}
                />
                <Input
                    label={'Last name'}
                    type={'text'}
                    required={true}
                    {...register("lastName")}
                />
            </div>
            <Controller
                name="dateOfBirth"
                control={control}
                render={({ field, fieldState }) => (
                    <DatePicker
                        label="Date of Birth"
                        mode="single"
                        value={field.value}
                        onChange={field.onChange}
                        error={fieldState.error?.message}
                    />
                )}
            />
            <div className={styles.selectsContainer}>
                <SelectBox label={'Choose your country'} placeholder={'Country'} options={countries} onChange={()=>{}}/>
                <SelectBox label ={'Choose your city'} placeholder={'City'} options={countries} onChange={()=> {}}/>
            </div>
            <div className={styles.textareaContainer}>
                <Controller
                    name="aboutMe"
                    control={control}
                    render={({ field, fieldState }) => (
                        <TextArea
                            label="About Me"
                            maxLength={200}
                            value={data?.aboutMe || ''}
                            onChange={field.onChange}
                            error={!!fieldState.error}
                            errorText={fieldState.error?.message}
                        />
                    )}
                />
            </div>
            <div className={styles.divider}></div>
            <Button
                style={{justifySelf: "flex-end"}}
                variant={"primary"}
                disabled={false}
                width={159}
                height={36}
                type="submit"
            >
                Save Changes
            </Button>
        </form>
    )
}