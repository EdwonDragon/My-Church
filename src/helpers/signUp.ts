import { client } from "@/store/helpers/Client";

interface CreateUserResponse {
    success: boolean
    message: string
    User: {
        Username: string;
    };
}

export const userSignUp = async (
    userName: string,
    TemporaryPassword: string,
    groupName: string
) => {

    const newUser: any = await client.mutations.createUser({
        userName,
        TemporaryPassword,
    });

    const parsedData: CreateUserResponse | null =
        newUser?.data ? JSON.parse(newUser.data as string) : null;
    if (!parsedData?.success) {
        throw new Error(parsedData?.message);
    }

    await client.mutations.addUserToGroup({
        groupName,
        userId: parsedData.User.Username,
    });
};
