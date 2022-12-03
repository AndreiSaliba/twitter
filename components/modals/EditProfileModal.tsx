import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Button from "@components/Button";
import Input from "@components/Input";
import { useAuth } from "@context/Auth";
import { Dialog } from "@headlessui/react";
import { updateUserProfile } from "@utils/Database";
import toast from "react-hot-toast";

export interface EditProfileFormValues {
    name: string;
    username: string;
    bio: string;
    location: string;
    website: string;
    profileImageUrl: string;
    bannerImageUrl: string;
}

function EditProfileModal() {
    const { currentUser, setCurrentUser } = useAuth();
    const router = useRouter();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<EditProfileFormValues>();

    const onSubmit = ({
        name,
        username,
        bio,
        location,
        website,
        profileImageUrl,
        bannerImageUrl,
    }) => {
        if (
            !website.match(
                /^(https?:\/\/)?([\w\-])+\.{1}([a-zA-Z]{2,63})([\/\w-]*)*\/?\??([^#\n\r]*)?#?([^\n\r]*)/
            )
        ) {
            toast("Url is not valid");
            return;
        }
        updateUserProfile(
            currentUser.userid,
            name,
            username,
            bio,
            location,
            website,
            profileImageUrl,
            bannerImageUrl
        ).then(() => {
            setCurrentUser((prevState) => ({
                ...prevState,
                name: name,
                username: username,
                description: bio,
                location: location,
                url: website,
                profile_image_url: profileImageUrl,
                profile_banner_url: bannerImageUrl,
            }));
        });
        router
            .push(
                router.pathname === "/[user]" ? `/${username}` : router.pathname
            )
            .then(() =>
                resetForm({
                    name,
                    username,
                    bio,
                    location,
                    website,
                    profileImageUrl,
                    bannerImageUrl,
                })
            );
    };

    const resetForm = (
        defaultValues = {
            name: currentUser?.name,
            username: currentUser?.username,
            bio: currentUser?.description,
            location: currentUser?.location,
            website: currentUser?.url,
            profileImageUrl: currentUser?.profile_image_url,
            bannerImageUrl: currentUser?.profile_banner_url,
        }
    ) => {
        reset({
            ...defaultValues,
        });
    };

    return (
        <Dialog
            as="div"
            className="relative z-10"
            open={!!router.query.editProfile}
            onClose={() => {
                router
                    .push(
                        router.pathname === "/[user]"
                            ? `/${router?.query?.user}`
                            : router.pathname,
                        undefined,
                        { shallow: true }
                    )
                    .then(() => resetForm());
            }}
        >
            <div className="fixed inset-0 z-[55] bg-[#5B7085] bg-opacity-40" />
            <div className="fixed inset-0 z-[60] overflow-y-auto font-TwitterChirp">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Dialog.Panel className="bg-theme flex h-full max-h-[650px] w-full max-w-[600px] transform flex-col overflow-x-hidden overflow-y-scroll rounded-2xl text-left align-middle shadow-xl transition-all">
                        <div className=" mb-[15px] flex w-full flex-col justify-center">
                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="flex w-full max-w-[600px] flex-col"
                            >
                                <div className="mx-[15px] flex h-[50px] w-full flex-row items-center justify-between">
                                    <div className="flex flex-row items-center">
                                        <div className="w-[53px]">
                                            <div
                                                className="-ml-[7.5px] w-min rounded-full p-[7.5px] light:hover:bg-[#e6e7e7] dim:hover:bg-[#2c3640] dark:hover:bg-[#181818]"
                                                onClick={() => {
                                                    router
                                                        .push(
                                                            router.pathname ===
                                                                "/[user]"
                                                                ? `/${router?.query?.user}`
                                                                : router.pathname,
                                                            undefined,
                                                            { shallow: true }
                                                        )
                                                        .then(() =>
                                                            resetForm()
                                                        );
                                                }}
                                            >
                                                <svg
                                                    viewBox="0 0 24 24"
                                                    className="w-[19px] fill-[#EFF3F4] light:fill-[#0f1419]"
                                                >
                                                    <g>
                                                        <path d="M13.414 12l5.793-5.793c.39-.39.39-1.023 0-1.414s-1.023-.39-1.414 0L12 10.586 6.207 4.793c-.39-.39-1.023-.39-1.414 0s-.39 1.023 0 1.414L10.586 12l-5.793 5.793c-.39.39-.39 1.023 0 1.414.195.195.45.293.707.293s.512-.098.707-.293L12 13.414l5.793 5.793c.195.195.45.293.707.293s.512-.098.707-.293c.39-.39.39-1.023 0-1.414L13.414 12z"></path>
                                                    </g>
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="text-[19px] font-bold leading-[23px]">
                                            Edit profile
                                        </div>
                                    </div>

                                    <div className="mr-[30px]">
                                        <Button
                                            type="submit"
                                            variant="rounded"
                                            color="white-black"
                                            className="h-[30px] w-[61.5px] bg-[#eff3f4] px-[15px] py-0 light:border-[#0f1419] light:hover:border-[#0f1419]"
                                            textClassName="text-[13px] leading-[19px] font-bold"
                                        >
                                            Save
                                        </Button>
                                    </div>
                                </div>
                                <Input
                                    {...register("name", { required: true })}
                                    variant="floating"
                                    placeholder="Name"
                                    className="my-[11px] mx-[15px] max-w-[568px]"
                                    maxLength={50}
                                    charCounter
                                    defaultValue={currentUser?.name}
                                />
                                <Input
                                    {...register("username", {
                                        required: true,
                                        pattern: {
                                            value: /^[a-zA-Z0-9_]+$/,
                                            message:
                                                "Your username can only contain letters, numbers and '_'",
                                        },
                                        maxLength: {
                                            value: 15,
                                            message:
                                                "Your username must be shorter than 15 characters.",
                                        },
                                    })}
                                    variant="floating"
                                    placeholder="Username"
                                    className="my-[11px] mx-[15px] max-w-[568px]"
                                    maxLength={15}
                                    charCounter
                                    defaultValue={currentUser?.username}
                                    error={
                                        errors?.username &&
                                        errors?.username.type !== "required"
                                    }
                                />
                                {errors?.username && (
                                    <span className="w-80 text-sm text-[#f4212e]">
                                        {errors?.username.message}
                                    </span>
                                )}

                                <Input
                                    {...register("bio")}
                                    variant="floating"
                                    as="textarea"
                                    placeholder="Bio"
                                    className="my-[11px] mx-[15px] max-w-[568px]"
                                    maxLength={160}
                                    charCounter
                                    defaultValue={currentUser?.description}
                                />
                                <Input
                                    {...register("location")}
                                    variant="floating"
                                    placeholder="Location"
                                    className="my-[11px] mx-[15px] max-w-[568px]"
                                    maxLength={30}
                                    charCounter
                                    defaultValue={currentUser?.location}
                                />
                                <Input
                                    {...register("website")}
                                    variant="floating"
                                    placeholder="Website"
                                    className="my-[11px] mx-[15px] max-w-[568px]"
                                    maxLength={100}
                                    charCounter
                                    defaultValue={currentUser?.url}
                                />
                                <Input
                                    {...register("profileImageUrl")}
                                    variant="floating"
                                    placeholder="Profile Image Url"
                                    className="my-[11px] mx-[15px] max-w-[568px]"
                                    maxLength={100}
                                    charCounter
                                    defaultValue={
                                        currentUser?.profile_image_url
                                    }
                                />
                                <Input
                                    {...register("bannerImageUrl")}
                                    variant="floating"
                                    placeholder="Banner Image Url"
                                    className="my-[11px] mx-[15px] max-w-[568px]"
                                    maxLength={100}
                                    charCounter
                                    defaultValue={
                                        currentUser?.profile_banner_url
                                    }
                                />
                            </form>
                        </div>
                    </Dialog.Panel>
                </div>
            </div>
        </Dialog>
    );
}

export default EditProfileModal;
