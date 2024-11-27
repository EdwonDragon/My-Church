import Swal, { SweetAlertIcon, SweetAlertResult } from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

type ShowAlertProps = {
  title?: string;
  message?: string;
  type?: SweetAlertIcon;
  showLoading?: boolean;
  callback?: (result: SweetAlertResult) => void;
};


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
    customClass: {
      popup: 'custom-swal-popup',
    },
    didClose: () => {

    },
  }).then((result) => {
    if (callback) callback(result);
  });
};





