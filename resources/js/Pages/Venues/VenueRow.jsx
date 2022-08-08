import React, { useEffect, useState } from "react";
import { onHandleFormChange } from "@/utils";
import { Button, Input, Modal } from "@/Components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "@inertiajs/inertia-react";

const VenueRow = ({
  id,
  name,
  editMode,
  error,
  onEditMode,
  onDelete,
  onSubmit,
  submitting,
}) => {
  const { data, processing, reset, setData } = useForm({
    name,
  });

  useEffect(() => {
    reset();
  }, [editMode]);

  useEffect(() => {
    if (editMode && submitting) {
      onSubmit(data.name);
    }
  }, [data.name, editMode, submitting]);

  return (
    <div
      data-testid={id ? `venue-row-${id}` : `venue-row-create`}
      className="h-20 flex items-center justify-between text-left md:divide-x-2 p-2"
    >
      <div className="hidden md:flex w-1/6">ID: {id || "--"}</div>
      <div className="flex w-full md:w-2/3 justify-left md:px-2">
        {editMode ? (
          <Input
            className="w-full"
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
          <span className="px-3 border border-transparent">{name}</span>
        )}
      </div>
      <div
        className={
          `flex md:w-1/6 gap-x-2 justify-center` +
          ` ${editMode ? "hidden md:block" : ""}`
        }
      >
        {!editMode && (
          <>
            <Button
              data-testid={`venue-edit-${id}`}
              className="btn-primary"
              type="button"
              onClick={(e) => onEditMode(e, id)}
            >
              <FontAwesomeIcon icon={faPencil} />
            </Button>
            <Button
              data-testid={`venue-delete-${id}`}
              className="btn-alert"
              type="button"
              onClick={onDelete}
              value={id}
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default VenueRow;
