import Swal, { SweetAlertIcon, SweetAlertResult } from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

type ShowAlertProps = {
  title?: string; // Título de la alerta, acepta JSX
  message?: string; // Mensaje adicional
  type?: SweetAlertIcon; // Tipo de alerta: success, error, warning, info
  showLoading?: boolean; // Muestra animación de carga
  callback?: (result: SweetAlertResult) => void; // Callback al cerrar la alerta
};

// Función para mostrar una alerta
export const showAlert = ({
  title = "",
  message = "",
  type = "info",
  showLoading = false,
  callback,
}: ShowAlertProps): void => {
  MySwal.fire({
    title,
    html: message,
    icon: type,
    didOpen: () => {
      if (showLoading) {
        MySwal.showLoading();
      }
    },
  }).then((result) => {
    if (callback) callback(result); // Ejecuta callback si se pasa
  });
};
