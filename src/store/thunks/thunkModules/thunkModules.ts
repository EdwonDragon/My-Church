
import { AppDispatch } from "../../store";
import { client } from "../../helpers/Client";
import { CheckErrors } from "../../helpers/CheckErrors";
import { setMessage } from "@/store/slices/messageSlice/messageSilce";
import { setLoading, setModules, setSelectedModule } from "@/store/slices/modulesSlice/modulesSlice";


export interface Module {
    id: string;
    name: string;
    route: string;
    rolesUser: (string | null)[] | null;
    zoneId: string | null;
}


export const subscribeToModulesUpdates = () => (dispatch: AppDispatch) => {
    const sub = client.models.Modules.observeQuery().subscribe({
        next: ({ items }) => {

            dispatch(setModules([...items]));
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


export const fetchModules = () => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
        let allModules: Module[] = [];
        let nextToken: string | null = null;

        do {
            const rawResponse = await client.models.Modules.list({ nextToken });
            if (!rawResponse || !rawResponse.data) {
                throw new Error("No se recibió una respuesta válida");
            }

            const response: { data: Module[]; nextToken: string | null } = {
                data: rawResponse.data,
                nextToken: rawResponse.nextToken || null,
            };

            allModules = [...allModules, ...response.data];
            nextToken = response.nextToken;
        } while (nextToken);

        dispatch(setModules(allModules));
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


export const fetchModulesById = (id: string) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
        const { data } = await client.models.Modules.get({ id });
        dispatch(setSelectedModule(data));
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

export const createModule = (data: Omit<Module, "id">) => async (dispatch: AppDispatch) => {

    dispatch(setLoading(true));
    try {
        const newModule = await client.models.Modules.create(data);

        await CheckErrors(newModule);
        dispatch(setLoading(false));
        dispatch(
            setMessage({
                title: "¡Éxito!",
                message: "El módulo se creo correctamente.",
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

export const updateModule = (id: string, data: Partial<Module>) => async (dispatch: AppDispatch) => {

    dispatch(setLoading(true));
    try {
        const updatedModule = await client.models.Modules.update({ id, ...data });

        await CheckErrors(updatedModule);
        dispatch(setLoading(false));

        dispatch(
            setMessage({
                title: "¡Éxito!",
                message: "El módulo se actualizo correctamente.",
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

export const deleteModule = (id: string) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
        const deleteData = await client.models.Modules.delete({ id });
        await CheckErrors(deleteData);
        dispatch(setLoading(false));
        dispatch(
            setMessage({
                title: "¡Éxito!",
                message: "El módulo se elimino correctamente.",
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
