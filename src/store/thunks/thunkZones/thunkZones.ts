import { setLoading, setSelectedZone, setZones, } from "@/store/slices/zonesSlice/zonesSlice";
import { AppDispatch } from "../../store";
import { client } from "../../helpers/Client";
import { CheckErrors } from "../../helpers/CheckErrors";
import { setMessage } from "@/store/slices/messageSlice/messageSilce";


export interface Zone {
    id: string;
    name: string;
    location: string;
    type: string;
}

interface ZonesState {
    zones: Zone[];
    selectedZone: Zone | null;
    loading: boolean;
    error: string | null;
}


export const subscribeToZoneUpdates = () => (dispatch: AppDispatch) => {
    const sub = client.models.Zone.observeQuery().subscribe({
        next: ({ items }) => {

            dispatch(setZones([...items]));
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


export const fetchZones = () => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
        let allZones: Zone[] = [];
        let nextToken: string | null = null;

        do {
            const rawResponse = await client.models.Zone.list({ nextToken });
            if (!rawResponse || !rawResponse.data) {
                throw new Error("No se recibió una respuesta válida");
            }

            const response: { data: Zone[]; nextToken: string | null } = {
                data: rawResponse.data,
                nextToken: rawResponse.nextToken || null,
            };

            allZones = [...allZones, ...response.data];
            nextToken = response.nextToken;
        } while (nextToken);

        dispatch(setZones(allZones));
    } catch (error: any) {
        dispatch(
            setMessage({
                title: "¡Error!",
                message: error,
                type: "warning",
            })
        );
    } finally {
        dispatch(setLoading(false));
    }
};



export const fetchZoneByType = (type: string) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
        const { data } = await client.models.Zone.listZoneByType({
            type
        });
        dispatch(setSelectedZone(data.length > 0 ? data : null));
    } catch (error: any) {
        dispatch(
            setMessage({
                title: "¡Error!",
                message: error,
                type: "warning",
            })
        );
    } finally {
        dispatch(setLoading(false));
    }
};
export const fetchZoneById = (id: string) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
        const { data } = await client.models.Zone.get({ id });
        dispatch(setSelectedZone(data));
    } catch (error: any) {
        dispatch(
            setMessage({
                title: "¡Error!",
                message: error,
                type: "warning",
            })
        );
    } finally {
        dispatch(setLoading(false));
    }
};

export const createZone = (data: Omit<Zone, "id">) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
        const newZone = await client.models.Zone.create(data);
        await CheckErrors(newZone);
    } catch (error: any) {
        dispatch(
            setMessage({
                title: "¡Error!",
                message: error,
                type: "warning",
            })
        );
    } finally {
        dispatch(setLoading(false));
        dispatch(
            setMessage({
                title: "¡Éxito!",
                message: "La zona se creo correctamente.",
                type: "success",
            })
        );
    }
};

export const updateZone = (id: string, data: Partial<Zone>) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
        const updatedZone = await client.models.Zone.update({ id, ...data });
        await CheckErrors(updatedZone);
    } catch (error: any) {
        dispatch(
            setMessage({
                title: "¡Error!",
                message: error,
                type: "warning",
            })
        );
    } finally {
        dispatch(setLoading(false));
        dispatch(
            setMessage({
                title: "¡Éxito!",
                message: "La zona se actualizo correctamente.",
                type: "success",
            })
        );
    }
};

export const deleteZone = (id: string) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
        const deleteData = await client.models.Zone.delete({ id });
        await CheckErrors(deleteData);

    } catch (error: any) {
        dispatch(
            setMessage({
                title: "¡Error!",
                message: error,
                type: "warning",
            })
        );
    } finally {
        dispatch(setLoading(false));
        dispatch(
            setMessage({
                title: "¡Éxito!",
                message: "La zona se elimino correctamente.",
                type: "success",
            })
        );
    }
};
