
import { AppDispatch } from "../../store";
import { client } from "../../helpers/Client";
import { CheckErrors } from "../../helpers/CheckErrors";
import { setMessage } from "@/store/slices/messageSlice/messageSilce";
import { setLoading, setSelectedUser, setUsers } from "@/store/slices/usersSilce/usersSlice";
import { userSignUp } from "@/helpers/signUp";



export const subscribeToUsersUpdates = () => (dispatch: AppDispatch) => {
    const sub = client.models.Users.observeQuery().subscribe({
        next: ({ items }) => {

            dispatch(setUsers([...items]));
        },
        error: (err) => {

            dispatch(
                setMessage({
                    title: "Error de suscripción",
                    message: err,
                    type: "error",
                })
            );
        },
    });
    return () => sub.unsubscribe();
};


export const fetchUsers = () => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
        let allUsers: any[] = [];
        let nextToken: string | null = null;

        do {
            const rawResponse = await client.models.Users.list({ nextToken });
            if (!rawResponse || !rawResponse.data) {
                throw new Error("No se recibió una respuesta válida");
            }

            const response: any = {
                data: rawResponse.data,
                nextToken: rawResponse.nextToken || null,
            };

            allUsers = [...allUsers, ...response.data];
            nextToken = response.nextToken;
        } while (nextToken);

        dispatch(setUsers(allUsers));
        dispatch(setLoading(false));
    } catch (error: any) {
        dispatch(
            setMessage({
                title: "¡Error!",
                message: error,
                type: "warning",
            })
        );
    }
};


export const fetchUserById = (id: string) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
        const { data } = await client.models.Users.get({ id });
        dispatch(setSelectedUser(data));
        dispatch(setLoading(false));
    } catch (error: any) {
        dispatch(
            setMessage({
                title: "¡Error!",
                message: error,
                type: "warning",
            })
        );
    }
};

export const createUser = (data: any) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
        await userSignUp(data.email, data.password, data.role);
        const newData = await client.models.Users.create(data);
        await CheckErrors(newData);
        dispatch(setLoading(false));
        dispatch(
            setMessage({
                title: "¡Éxito!",
                message: "Se ha creado un nuevo usuario, verifique su correo.",
                type: "success",
            })
        );
        return newData;
    } catch (error: any) {
        dispatch(
            setMessage({
                title: "¡Error!",
                message: error,
                type: "warning",
            })
        );
    }
};

export const updateUser = (id: string, data: any) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
        const updateData = await client.models.Users.update({ id, ...data });
        await CheckErrors(updateData);
        dispatch(setLoading(false));
        dispatch(
            setMessage({
                title: "¡Éxito!",
                message: "El usuario actualizo correctamente.",
                type: "success",
            })
        );
    } catch (error: any) {
        dispatch(
            setMessage({
                title: "¡Error!",
                message: error,
                type: "warning",
            })
        );
    }
};

export const deleteUser = (id: string) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
        const deleteData = await client.models.Users.delete({ id });
        await CheckErrors(deleteData);
        dispatch(setLoading(false));
        dispatch(
            setMessage({
                title: "¡Éxito!",
                message: "El usuario se  elimino correctamente.",
                type: "success",
            })
        );
    } catch (error: any) {
        dispatch(
            setMessage({
                title: "¡Error!",
                message: error,
                type: "warning",
            })
        );
    }
};
