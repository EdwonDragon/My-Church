import { setLoading, setSelectedZone, setZones, } from "@/store/slices/zonesSlice/zonesSlice";
import { AppDispatch } from "../../store";
import { client } from "../../helpers/Client";
import { CheckErrors } from "../../helpers/CheckErrors";
import { setMessage } from "@/store/slices/messageSlice/messageSilce";



export const subscribeToZoneUpdates = (type: string) => (dispatch: AppDispatch) => {
    const sub = client.models.Zone.observeQuery().subscribe({
        next: ({ items }) => {
            dispatch(fetchZoneByTypeAll(type));
        },
        error: (err) => {
            console.log(err)
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


export const fetchZoneByTypeAll = (type: string) => async (dispatch: AppDispatch) => {

    dispatch(setLoading(true));
    try {
        const { data } = await client.models.Zone.listZoneByType({
            type
        });
        dispatch(setZones(data.length > 0 ? data : null));
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


export const fetchZoneByType = (type: string) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
        const { data } = await client.models.Zone.listZoneByType({
            type
        });

        dispatch(setSelectedZone(data.length > 0 ? data : null));
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
export const fetchZoneById = (id: string) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
        const { data } = await client.models.Zone.get({ id });
        dispatch(setSelectedZone(data));
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

export const createZone = (data: any) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
        const newZone = await client.models.Zone.create(data);
        await CheckErrors(newZone);
        dispatch(setLoading(false));
        dispatch(
            setMessage({
                title: "¡Éxito!",
                message: "La zona se creo correctamente.",
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

export const updateZone = (id: string, data: Partial<any>, disabledAlert: boolean) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
        const updatedZone = await client.models.Zone.update({ id, ...data });
        await CheckErrors(updatedZone);
        dispatch(setLoading(false));
        if (!disabledAlert) {
            dispatch(
                setMessage({
                    title: "¡Éxito!",
                    message: "La zona se actualizo correctamente.",
                    type: "success",
                })
            );
        }
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

export const deleteZone = (id: string) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
        const deleteData = await client.models.Zone.delete({ id });
        await CheckErrors(deleteData);
        dispatch(setLoading(false));
        dispatch(
            setMessage({
                title: "¡Éxito!",
                message: "La zona se elimino correctamente.",
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
