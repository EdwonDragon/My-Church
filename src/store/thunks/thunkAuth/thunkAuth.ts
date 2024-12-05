
import { AppDispatch } from "../../store";
import { client } from "../../helpers/Client";
import { setMessage } from "@/store/slices/messageSlice/messageSilce";
import { setLoading, setUser } from "@/store/slices/authSlice/authSlice";

export const setAuthUser = (email: string) => async (dispatch: AppDispatch) => {
    dispatch(
        setLoading(true)
    );
    try {
        const { data } = await client.models.Users.listUsersByEmail({
            email,
        });

        dispatch(
            setUser(data[0])
        );
        dispatch(
            setLoading(false)
        );
    } catch (error: any) {
        dispatch(
            setLoading(false)
        );
        dispatch(
            setMessage({
                title: "¡Error!",
                message: error,
                type: "warning",
            })
        );
    }
};

