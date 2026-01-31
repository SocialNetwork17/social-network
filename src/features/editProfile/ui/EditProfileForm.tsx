// @flow
import * as React from 'react';
import {Input} from "@/shared/ui/Input/Input";
import styles from "./EditProfile.module.scss"
import {useDataMyProfileQuery} from "@/pages/profile/api/useDataMyProfileQuery";
import {DatePicker} from "@/shared/ui/DatePicker/DatePicker";
import {Controller, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {editProfileSchema, EditProfileType} from "@/features/editProfile/model/editProfile.schema";
import {Button} from "@/shared/ui/Button/Button";

export const EditProfileForm = () => {

    const { data } =  useDataMyProfileQuery()
    const {
        register,
        control,
        handleSubmit,

    } = useForm<EditProfileType>({
        resolver: zodResolver(editProfileSchema),
        defaultValues: {
            userName: data?.userName
        }
    })

    const onSubmit = (data: EditProfileType) => {
        console.log(data)
    }

    return (
        <form className={styles.editProfileForm} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.inputsContainer}>
                <Input
                    value={data?.userName}
                    label={'Username'} type={'text'}
                    required={true}
                    {...register("userName")}
                />
                <Input
                    label={'First Name'}
                    type={'text'}
                    placeholder={"Add first Name"}
                    required={true}
                    {...register("firstName")}
                />
                <Input
                    label={'Last name'}
                    type={'text'}
                    placeholder={"Add last name"}
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

            <Button
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