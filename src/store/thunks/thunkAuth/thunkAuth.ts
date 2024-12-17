
import { AppDispatch } from "../../store";
import { client } from "../../helpers/Client";
import { setMessage } from "@/store/slices/messageSlice/messageSilce";
import { setLoading, setPermissions, setRouteNames, setUser, setZoneOwner } from "@/store/slices/authSlice/authSlice";

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
        const { data: zoneOwner } = await data[0].zoneOwner();

        const permission: any = [];
        const routeNames: any = {
            "/": "Inicio",
            "/Home": "Inicio",
            "/Home/": "Inicio",
            "/Zones": "Zonas",
            "/Modules": "Módulos",
        }
        if (data[0].role != "SUPERADMIND") {
            dispatch(
                setZoneOwner(zoneOwner)
            );

            const { data: modules } = await client.models.Modules.listModulesByZoneId({ zoneId: zoneOwner?.id || "" });

            modules.map((m: any) => {
                if (m.rolesUser.includes(data[0].role)) {
                    permission.push(m.route);
                    routeNames[m.route] = m.name
                }
            });
            dispatch(
                setPermissions(permission)
            );

            dispatch(
                setRouteNames(routeNames)
            );
        } else {
            dispatch(
                setRouteNames(routeNames)
            );
        }

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

