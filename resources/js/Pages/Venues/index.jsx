import React from "react";

import Authenticated from "@/Layouts/Authenticated";
import { Button, Header, Modal, PageContentWrapper } from "@/Components";
import { useFormWithApi } from "@/hooks";
import { Head } from "@inertiajs/inertia-react";

import VenueRow from "./VenueRow";

const Venues = ({ venues, auth, errors }) => {
  const fields = {
    id: "",
    name: "",
  };

  const routes = {
    activeId: null,
    delete: "venues.delete",
    post: "venues.create",
    modalOpen: false,
    put: "venues.update",
  };

  const validations = [
    {
      field: "name",
      message: "Venue already exists",
      validate: ({ name }) =>
        !venues.find(
          (venue) => venue.name.toLowerCase() === name.toLowerCase()
        ),
    },
    {
      field: "name",
      message: "Venue name cannot be empty",
      validate: ({ name }) => !!name,
    },
  ];

  const { formState, handlers } = useFormWithApi({
    fields,
    routes,
    validations,
  });

  const {
    activeId,
    createNew,
    data,
    disabled,
    editMode,
    errors: formErrors,
    confirmDelete: modalOpen,
    processing,
  } = formState;

  const {
    onCancel,
    onChange,
    onDelete,
    onConfirmDelete,
    onCreateNew,
    onEdit,
    onSubmit,
  } = handlers;

  return (
    <Authenticated
      {...{
        auth,
        header: <Header headerText="Venues" />,
      }}
    >
      <Head title="Venues" />
      <PageContentWrapper data-testid="venues">
        <form onSubmit={onSubmit} className="flex justify-center">
          <div className="flex flex-col w-full md:w-2/3 lg:1/2 divide-y-2">
            {venues.map(({ id, name }) => (
              <VenueRow
                {...{
                  id,
                  key: id,
                  data,
                  name,
                  editMode: activeId === id,
                  error: formErrors.name,
                  handleChange: onChange,
                  processing,
                  onEdit,
                  onConfirmDelete,
                }}
              />
            ))}
            {createNew && (
              <VenueRow
                {...{
                  id: "",
                  data,
                  name: "",
                  editMode: true,
                  error: formErrors.name,
                  handleChange: onChange,
                  processing,
                }}
              />
            )}
            <div className="flex gap-x-4 w-full">
              {(editMode || createNew) && (
                <>
                  <Button
                    data-testid="venues-submit-button"
                    className="btn-primary mt-4 w-full md:w-auto justify-center"
                    disabled={processing}
                    type="submit"
                  >
                    Submit
                  </Button>
                  <Button
                    data-testid="venues-cancel-button"
                    className="btn-secondary mt-4 w-full md:w-auto justify-center"
                    onClick={(e) => {
                      e.preventDefault();
                      onCancel(e);
                    }}
                    type="button"
                  >
                    Cancel
                  </Button>
                </>
              )}
              {!editMode && !createNew && (
                <Button
                  data-testid="create-venue-button"
                  className="btn-primary w-1/2 md:w-auto mt-4 justify-center"
                  disabled={disabled}
                  onClick={onCreateNew}
                  type="button"
                >
                  Create Venue
                </Button>
              )}
            </div>
          </div>
        </form>
        <Modal isOpen={modalOpen}>
          <div className="flex flex-col gap-y-6">
            <p className="text-lg">
              Are you sure you want to delete this venue?
            </p>
            <div className="flex justify-end gap-x-2">
              <Button
                data-testid="venue-confirm-delete"
                className="btn-primary"
                disabled={disabled && !processing}
                onClick={onDelete}
                value={activeId}
              >
                Delete Venue
              </Button>
              <Button
                data-testid="venue-cancel-delete"
                className="btn-secondary"
                onClick={onCancel}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal>
      </PageContentWrapper>
    </Authenticated>
  );
};

export default Venues;
