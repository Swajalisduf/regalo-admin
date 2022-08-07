import React, { useEffect, useState } from "react";
import { onHandleFormChange } from "@/utils";
import { Button, Input } from "@/Components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "@inertiajs/inertia-react";
import { useRoute } from "@/hooks";

const DeleteVenueButton = ({ id, destroy }) => {
  const route = useRoute();
  const onDelete = (e) => {
    e.preventDefault();
    destroy(route("venues.delete", { id }), {
      onBefore: () => confirm("Are you sure you want to delete this venue?"),
    });
  };

  return (
    <Button type="button" onClick={onDelete}>
      <FontAwesomeIcon icon={faTrash} />
    </Button>
  );
};

const VenueRow = ({
  id,
  name,
  editMode,
  error,
  onEditMode,
  destroy,
  onSubmit,
  setDisabled,
  submitting,
}) => {
  const { data, processing, reset, setData } = useForm({
    name,
  });

  useEffect(() => {
    reset();
  }, [editMode]);

  useEffect(() => {
    if (processing || !data.name) {
      setDisabled(true);
    }
  }, [processing, data.name]);

  useEffect(() => {
    if (editMode && submitting) {
      onSubmit(data.name);
    }
  }, [data.name, editMode, submitting]);

  return (
    <div
      data-testid={id ? `venue-row-${id}` : `venue-row-create`}
      className="flex divide-x-2 p- items-center text-left justify-between"
    >
      <div className="w-1/6">ID: {id || "--"}</div>
      <div className="flex w-2/3 justify-left pl-4">
        {editMode ? (
          <Input
            className="my-2 w-full"
            data-testid={
              id ? `venue-edit-name-input` : `venue-create-name-input`
            }
            type="text"
            name="name"
            autoComplete="name"
            handleChange={(e) => onHandleFormChange(e, setData)}
            value={data.name}
            error={error}
          />
        ) : (
          <span className="my-2 px-3 py-2 border border-transparent">
            {name}
          </span>
        )}
      </div>
      <div className="flex w-1/6 gap-x-2 justify-center">
        {!editMode && (
          <>
            <Button
              data-testid={`venue-edit-${id}`}
              type="button"
              onClick={(e) => onEditMode(e, id)}
            >
              <FontAwesomeIcon icon={faPencil} />
            </Button>
            <DeleteVenueButton
              data-testid={`venue-delete-${id}`}
              id={id}
              destroy={destroy}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default VenueRow;
