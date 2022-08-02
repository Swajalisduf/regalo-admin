import React, { useEffect, useReducer, useState } from "react";

import Authenticated from "@/Layouts/Authenticated";
import { Button, Header, PageContentWrapper } from "@/Components";
import { Head, useForm } from "@inertiajs/inertia-react";

import VenueRow from "./VenueRow";

const Venues = ({ venues, auth, errors }) => {
  const {
    data,
    delete: destroy,
    clearErrors,
    isDirty,
    errors: formErrors,
    post,
    processing,
    put,
    reset,
    setData,
    setErrors,
  } = useForm({
    id: "",
    name: "",
  });

  const reducer = (state, { payload = {}, type }) => {
    if (payload.e) {
      payload.e.preventDefault();
    }
    switch (type) {
      case "cancel":
        return { ...state, editMode: false, error: null, createNew: false };
      case "createNew":
        return { ...state, editMode: false, createNew: true };
      case "disabled":
        return { ...state, disabled: true };
      case "edit":
        return { ...state, editMode: payload.id, createNew: false };
      case "error":
        setErrors(payload.field, payload.message);
        return {
          ...state,
          submitting: false,
        };
      case "create":
        post(route("venues.create"));
        return {
          ...state,
          createNew: false,
          editMode: false,
          error: null,
          submitting: false,
        };
      case "update":
        put(route("venues.update", { id: payload.id }));
        return {
          ...state,
          submitting: false,
          editMode: false,
          error: null,
          createNew: false,
        };
      case "initiateSubmit":
        return { ...state, submitting: true };
      case "submit":
        setData("name", payload.submitName);
        return state;
      default:
        throw new Error("Invalid action");
    }
  };

  const initialState = {
    createNew: false,
    editMode: false,
    disabled: false,
    submitting: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const { createNew, disabled, editMode, submitting } = state;

  const onCancel = (e) => dispatch({ payload: { e }, type: "cancel" });
  const onCreateNew = (e) => dispatch({ payload: { e }, type: "createNew" });
  const onEditMode = (e, id) => dispatch({ payload: { e, id }, type: "edit" });
  const onSubmit = (submitName, venueId = null) =>
    dispatch({ payload: { submitName, venueId }, type: "submit" });
  const setDisabled = () => dispatch({ type: "disabled" });

  useEffect(() => {
    if (isDirty && submitting && data.name) {
      if (data.id) {
        dispatch({ type: "update", payload: { id: data.id } });
        return;
      } else if (
        venues.find(
          (venue) => venue.name.toLowerCase() === data.name.toLowerCase()
        )
      ) {
        dispatch({
          payload: { field: "name", message: "Venue already exists" },
          type: "error",
        });
        return;
      }
      dispatch({ type: "create" });
    }
  }, [data.id, data.name, isDirty, submitting, venues]);

  useEffect(() => {
    reset();
  }, [createNew, editMode]);

  useEffect(() => {
    if (editMode) {
      setData("id", editMode);
    }
  }, [editMode]);

  return (
    <Authenticated
      {...{
        auth,
        errors,
        header: <Header headerText="Venues" />,
      }}
    >
      <Head title="Venues" />
      <PageContentWrapper>
        <form
          onSubmit={(e) => dispatch({ payload: { e }, type: "initiateSubmit" })}
          className="flex justify-center"
        >
          <div className="flex flex-col w-1/2 divide-y-2">
            {venues.map(({ id, name }) => (
              <VenueRow
                {...{
                  id,
                  key: id,
                  name,
                  editMode: editMode === id,
                  formErrors,
                  onEditMode,
                  destroy,
                  onSubmit,
                  setDisabled,
                  submitting,
                }}
              />
            ))}
            {createNew && (
              <VenueRow
                {...{
                  id: "",
                  name: "",
                  editMode: true,
                  formErrors,
                  onEditMode,
                  destroy,
                  onSubmit,
                  setDisabled,
                  submitting,
                }}
              />
            )}
            <div className="flex gap-x-4 w-full">
              {(editMode || createNew) && (
                <>
                  <Button
                    className="mt-4 w-full md:w-1/2 justify-center"
                    disabled={disabled && !processing}
                    type="submit"
                  >
                    Submit
                  </Button>
                  <Button
                    className="mt-4 w-full md:w-1/2 justify-center"
                    disabled={disabled && !processing}
                    onClick={onCancel}
                    type="button"
                  >
                    Cancel
                  </Button>
                </>
              )}
              {!editMode && !createNew && (
                <Button
                  className="mt-4 w-full md:w-1/2 justify-center"
                  disabled={disabled && !processing}
                  onClick={onCreateNew}
                  type="button"
                >
                  Create Venue
                </Button>
              )}
            </div>
          </div>
        </form>
      </PageContentWrapper>
    </Authenticated>
  );
};

export default Venues;