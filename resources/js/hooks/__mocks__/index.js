import useFormWithApi from "../useFormWithApi";

const useRoute = () => () => ({ current: jest.fn() });

export { useFormWithApi, useRoute };
