import { useReducer, useEffect } from "react";
import { useForm } from "@inertiajs/inertia-react";
import { useRoute } from ".";
import { onHandleFormChange } from "@/utils";

const useFormWithApi = ({ fields, routes, validations = [] }) => {
  const {
    data,
    delete: formDestroy,
    clearErrors,
    isDirty,
    errors,
    post: formPost,
    processing,
    put: formPut,
    reset,
    setData,
    setError,
  } = useForm(fields);
  const route = useRoute();

  const destroy = (id) => formDestroy(route(routes.delete, { id }));
  const post = () => formPost(route(routes.post));
  const put = (id) => formPut(route(routes.put, { id }));

  const initialState = {
    activeId: null,
    createNew: false,
    editMode: false,
    disabled: false,
    confirmDelete: false,
    submitting: false,
  };

  const reducer = (state, { payload = {}, type }) => {
    if (payload.e) {
      payload.e.preventDefault();
    }
    switch (type) {
      case "cancel":
        clearErrors();
        return initialState;
      case "confirmDelete":
        return {
          ...state,
          activeId: payload.id,
          confirmDelete: true,
          createNew: false,
          editMode: false,
        };
      case "createNew":
        return { ...state, editMode: false, createNew: true };
      case "delete":
        destroy(payload.id);
        return { ...state, confirmDelete: false };
      case "disabled":
        return { ...state, disabled: payload.disabled };
      case "edit":
        return {
          ...state,
          editMode: true,
          activeId: payload.id,
          createNew: false,
        };
      case "error":
        setError(payload.field, payload.message);
        return {
          ...state,
          submitting: false,
        };
      case "create":
        post();
        return {
          ...state,
          createNew: false,
          editMode: false,
          error: null,
          submitting: false,
        };
      case "update":
        put(payload.id);
        return {
          ...state,
          activeId: null,
          createNew: false,
          editMode: false,
          error: null,
          submitting: false,
        };
      case "submit":
        return { ...state, submitting: true };
      default:
        throw new Error("Invalid action");
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const { activeId, createNew, editMode, submitting } = state;

  const onCancel = (e) => dispatch({ payload: { e }, type: "cancel" });
  const onChange = (e) => onHandleFormChange(e, setData);
  const onConfirmDelete = ({ e, id }) =>
    dispatch({ payload: { e, id }, type: "confirmDelete" });
  const onCreateNew = (e) => dispatch({ payload: { e }, type: "createNew" });
  const onDelete = (e) =>
    dispatch({ payload: { e, id: e.target.value }, type: "delete" });
  const onEdit = ({ e, modelData }) => {
    setData(modelData);
    dispatch({ payload: { e, id: modelData.id }, type: "edit" });
  };
  const onSubmit = (e) => {
    e.preventDefault(); // For some reason this has to be invoked here instead of the reducer
    dispatch({ type: "submit" });
  };
  const setDisabled = (disabled) =>
    dispatch({ type: "disabled", payload: { disabled } });

  const validateForm = () =>
    validations.find(({ validate }) => !validate(data));

  useEffect(() => {
    if (submitting) {
      const error = validateForm();

      if (error) {
        const { field, message } = error;
        dispatch({ type: "error", payload: { field, message } });
        return;
      }

      if (isDirty) {
        if (data.id) {
          dispatch({ type: "update", payload: { id: data.id } });
          return;
        }

        dispatch({ type: "create" });
      }
    }
  }, [data.id, isDirty, submitting]);

  useEffect(() => {
    if (!activeId) {
      reset();
      clearErrors();
    }
  }, [createNew, editMode]);

  useEffect(() => {
    setDisabled(processing);
  }, [processing]);

  return {
    formState: {
      ...state,
      data,
      isDirty,
      errors,
      formFieldNames: Object.keys(fields).filter(
        (fieldName) => fieldName !== "id"
      ),
      processing,
    },
    handlers: {
      onCancel,
      onChange,
      onDelete,
      onConfirmDelete,
      onCreateNew,
      onEdit,
      onSubmit,
    },
    methods: {
      setDisabled,
      validateForm,
    },
  };
};

export default useFormWithApi;
