import Sweetalert2 from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Swal = withReactContent(Sweetalert2);

export const invalidZipCode = (message) => {
  Swal.fire({
    icon: "error",
    title: message,
    // text: "Oops ...",
    position: "top-end",
    background: "yellow",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });
};

export const consultingZipCode = () => {
  Swal.fire({
    icon: "info",
    title: "Consultando CEP ...",
    position: "top-end",
    background: "#lime",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });
};

export const validateFields = (address) => {
  if (!address.name) {
    validateErrorMessage("Campo Nome é obrigatório !!");
    return false;
  }
  if (!address.document) {
    validateErrorMessage("Campo CPF é obrigatório !!");
    return false;
  }
  if (address.document.length !== 14) {
    validateErrorMessage(`CPF ${address.document} invalido !!`);
    return false;
  }
  if (!address.phoneNumber) {
    validateErrorMessage("Campo Telefone é obrigatório !!");
    return false;
  }
  if (address.phoneNumber.length < 14) {
    validateErrorMessage("Telefone Invalido !!");
    return false;
  }
  if (!address.postalCode) {
    validateErrorMessage("Campo CEP é obrigatório !!");
    return false;
  }
  if (address.postalCode.length < 9) {
    validateErrorMessage("Cep Invalido !!");
    return false;
  }
  if (!address.number) {
    validateErrorMessage("Campo Numero é obrigatório !!");
    return false;
  }

  return true;
};

const validateErrorMessage = (message) => {
  Swal.fire({
    icon: "error",
    title: message,
    // text: "Oops ...",
    position: "top-end",
    background: "yellow",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
  });
};
