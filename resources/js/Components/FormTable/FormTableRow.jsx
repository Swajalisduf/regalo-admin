import React from "react";
import { Button } from "@/Components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";

const defaultFn = () => {};

const FormTableRow = ({
  children,
  modelData,
  editMode,
  id,
  model,
  onEdit = defaultFn,
  onConfirmDelete = defaultFn,
}) => {
  return (
    <div
      data-testid={id ? `${model}-row-${id}` : `${model}-row-create`}
      className="h-20 flex items-center justify-between text-left md:divide-x-2 p-2"
    >
      <div className="hidden md:flex grow-0 pl-2 pr-4">ID: {id || "--"}</div>
      <div className="flex w-full md:w-2/3 justify-left md:px-2">
        {children}
      </div>
      <div className={`flex md:w-1/6 gap-x-2 pl-2 justify-center`}>
        {!editMode && (
          <>
            <Button
              data-testid={`${model}-edit-${id}`}
              className="btn-primary"
              type="button"
              onClick={(e) => {
                e.preventDefault();
                onEdit({
                  e,
                  modelData,
                });
              }}
            >
              <FontAwesomeIcon icon={faPencil} />
            </Button>
            <Button
              data-testid={`${model}-delete-${id}`}
              className="btn-alert"
              type="button"
              onClick={(e) => onConfirmDelete({ e, id })}
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default FormTableRow;
