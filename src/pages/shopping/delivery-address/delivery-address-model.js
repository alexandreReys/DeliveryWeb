import * as yup from "yup";
import store from "store";

export const yupValidations = {
  name: yup.string().nullable().required("Obrigatório *"),
  document: yup.string().nullable().required("Obrigatório *"),
  phoneNumber: yup.string().nullable().required("Obrigatório *"),
  addressType: yup.string().nullable().required("Obrigatório *"),
  postalCode: yup
    .string()
    .nullable()
    .max(9, "Tamanho maximo : 9 digitos")
    .required("Obrigatório *"),
  number: yup.string().nullable().required("Obrigatório *"),
  complement: yup.string().nullable(),
  info: yup.string().nullable(),
};

export const formikInitialValues = () => {
  return initialValues(store.getState().deliveryAddressState);
};

export const initialValues = (values) => {
  return {
    name: values.name,
    document: values.document,
    phoneNumber: values.phoneNumber,
    addressType: values.addressType,
    postalCode: values.postalCode,
    number: values.number,
    complement: values.complement,
    info: values.info,
  };
};

export const setAddressValues = (values) => {
  return {
    name: values.name,
    document: values.document,
    phoneNumber: values.phoneNumber,
    addressType: values.addressType,
    postalCode: values.postalCode,
    street: values.street,
    number: values.number,
    complement: values.complement,
    info: values.info,
    neighborhood: values.neighborhood,
    city: values.city,
    state: values.state,
  };
};
