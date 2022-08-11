import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { Button, FormTableRow, Input, Modal } from "@/Components";

const FormTable = ({ formState, handlers, model, rowData }) => {
  const {
    activeId,
    createNew,
    data,
    disabled,
    editMode,
    errors: formErrors,
    formFieldNames,
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

  const [activeRow, setActiveRow] = useState(null);

  useEffect(() => {
    setActiveRow(rowData.find((row) => row.id === activeId));
  }, [activeId, rowData]);

  return (
    <>
      <form onSubmit={onSubmit} className="flex justify-center">
        <div className="flex flex-col w-full lg:1/2 divide-y-2">
          {rowData.map((modelData, i) => {
            const { id } = modelData;
            return (
              <FormTableRow
                {...{
                  key: id,
                  modelData,
                  editMode: activeId === id,
                  id,
                  model,
                  onEdit,
                  onConfirmDelete,
                }}
              >
                {formFieldNames.map((field) =>
                  activeId === id ? (
                    <Input
                      key={`${field}-${id}-input`}
                      className="w-full"
                      data-testid={
                        id
                          ? `${model}-edit-name-input`
                          : `${model}-create-name-input`
                      }
                      type="text"
                      name={field}
                      autoComplete={field}
                      handleChange={onChange}
                      value={data[field]}
                      error={formErrors[field]}
                    />
                  ) : (
                    <span
                      key={`${field}-${id}`}
                      className="px-3 border border-transparent"
                    >
                      {rowData[i][field]}
                    </span>
                  )
                )}
              </FormTableRow>
            );
          })}
          {createNew && (
            <FormTableRow
              {...{
                data,
                editMode: true,
                error: formErrors.name,
                handleChange: onChange,
                id: "",
                model,
                processing,
              }}
            >
              {formFieldNames.map((field) => (
                <Input
                  key={`${field}-create`}
                  className="w-full"
                  data-testid={`${model}-create-name-input`}
                  type="text"
                  name={field}
                  autoComplete={field}
                  handleChange={onChange}
                  value={data[field]}
                  error={formErrors[field]}
                />
              ))}
            </FormTableRow>
          )}
          <div className="flex gap-x-4 w-full">
            {(editMode || createNew) && (
              <>
                <Button
                  data-testid={`${model}-submit-button`}
                  className="btn-primary mt-4 w-full md:w-auto justify-center"
                  disabled={processing}
                  type="submit"
                >
                  Submit
                </Button>
                <Button
                  data-testid={`${model}-cancel-button`}
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
                data-testid={`${model}-create-button`}
                className="btn-primary w-1/2 md:w-auto mt-4 justify-center"
                disabled={disabled}
                onClick={onCreateNew}
                type="button"
              >
                {`Create ${model}`}
              </Button>
            )}
          </div>
        </div>
      </form>
      <Modal isOpen={modalOpen}>
        <div className="flex flex-col gap-y-6">
          <p className="text-lg">{`Are you sure you want to delete this ${model}?`}</p>
          {activeRow?.name && (
            <p className="flex items-center gap-x-2 pl-4">
              <FontAwesomeIcon className="text-sky-500" icon={faCaretRight} />
              {activeRow.name}
            </p>
          )}
          <div className="flex justify-end gap-x-2">
            <Button
              data-testid={`${model}-confirm-delete-button`}
              className="btn-primary"
              disabled={disabled && !processing}
              onClick={onDelete}
              value={activeId}
            >
              {`Delete ${model}`}
            </Button>
            <Button
              data-testid={`${model}-cancel-delete-button`}
              className="btn-secondary"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default FormTable;
