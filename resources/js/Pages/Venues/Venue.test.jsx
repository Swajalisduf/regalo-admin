import React from "react";

import { fireEvent, render } from "@testing-library/react";
import Venues from "./";

jest.mock("@/hooks");

const venues = [
  { id: 1, name: "Test Venue 1" },
  { id: 2, name: "Test Venue 2" },
];

const auth = {
  user: {
    name: "test user",
  },
};

describe("Venues component", () => {
  let rendered;

  beforeEach(() => {
    rendered = render(<Venues auth={auth} venues={venues} />);
  });

  it("should render with given venue data", () => {
    const { getByTestId } = rendered;

    expect(getByTestId("title")).toBeInTheDocument();
    expect(getByTestId("venues")).toBeInTheDocument();
    expect(getByTestId("venue-row-1")).toBeInTheDocument();
    expect(getByTestId("venue-row-2")).toBeInTheDocument();
  });

  it("should be able to create a new venue", () => {
    const { getByTestId } = rendered;
    const createButton = getByTestId("create-venue-button");
    const newVenueName = "Test Venue 3";

    fireEvent.click(createButton);

    const createVenueRow = getByTestId("venue-row-create");
    const createVenueNameInput = getByTestId("venue-create-name-input");
    const venuesSubmitButton = getByTestId("venues-submit-button");

    expect(createVenueRow).toBeInTheDocument();
    expect(createVenueNameInput).toBeInTheDocument();
    expect(venuesSubmitButton).toBeInTheDocument();

    fireEvent.change(createVenueNameInput, {
      target: { value: newVenueName },
    });

    expect(createVenueNameInput.value).toBe(newVenueName);

    fireEvent.click(venuesSubmitButton);

    expect(mockInertiaPost).toBeCalled();
  });

  it("should be able to update an existing venue", () => {
    const { getByTestId } = rendered;
    const updatedVenueName = "Test Name 1 Updated";
    const venueEdit1 = getByTestId("venue-edit-1");

    fireEvent.click(venueEdit1);

    const venuesSubmitButton = getByTestId("venues-submit-button");
    const venueEditNameInput = getByTestId("venue-edit-name-input");

    expect(venueEditNameInput).toBeInTheDocument();

    fireEvent.change(venueEditNameInput, {
      target: { value: updatedVenueName },
    });

    expect(venueEditNameInput.value).toBe(updatedVenueName);

    fireEvent.click(venuesSubmitButton);

    expect(mockInertiaPut).toBeCalled();
  });

  it("should be able to delete an existing venue", () => {
    const { getByTestId } = rendered;
    const venueDelete1 = getByTestId("venue-delete-1");

    fireEvent.click(venueDelete1);

    const modal = getByTestId("modal");
    const confirmDelete = getByTestId("venue-confirm-delete");

    expect(modal).toBeInTheDocument();
    expect(confirmDelete).toBeInTheDocument();

    fireEvent.click(confirmDelete);

    expect(mockInertiaDelete).toBeCalled();
  });

  it("should show error message if venue already exists on submit", () => {
    const { getByTestId } = rendered;
    const createButton = getByTestId("create-venue-button");
    const existingVenueName = venues[0].name;

    fireEvent.click(createButton);

    const createVenueRow = getByTestId("venue-row-create");
    const createVenueNameInput = getByTestId("venue-create-name-input");
    const venuesSubmitButton = getByTestId("venues-submit-button");

    expect(createVenueRow).toBeInTheDocument();
    expect(createVenueNameInput).toBeInTheDocument();
    expect(venuesSubmitButton).toBeInTheDocument();

    fireEvent.change(createVenueNameInput, {
      target: { value: existingVenueName },
    });

    expect(createVenueNameInput.value).toBe(existingVenueName);

    fireEvent.click(venuesSubmitButton);

    const error = getByTestId("name-error");
    expect(error).toBeInTheDocument();
    expect(error.textContent).toBe("Venue already exists");
  });

  it("should show error message if venue is empty on submit", () => {
    const { getByTestId } = rendered;
    const createButton = getByTestId("create-venue-button");

    fireEvent.click(createButton);

    const createVenueRow = getByTestId("venue-row-create");
    const createVenueNameInput = getByTestId("venue-create-name-input");
    const venuesSubmitButton = getByTestId("venues-submit-button");

    expect(createVenueRow).toBeInTheDocument();
    expect(createVenueNameInput).toBeInTheDocument();
    expect(venuesSubmitButton).toBeInTheDocument();

    fireEvent.change(createVenueNameInput, {
      target: { value: "" },
    });

    expect(createVenueNameInput.value).toBe("");

    fireEvent.click(venuesSubmitButton);

    const error = getByTestId("name-error");
    expect(error).toBeInTheDocument();
    expect(error.textContent).toBe("Venue name cannot be empty");
  });

  it("should show error message if venue is empty on submit", () => {
    const { getByTestId } = rendered;
    const createButton = getByTestId("create-venue-button");

    fireEvent.click(createButton);

    const createVenueRow = getByTestId("venue-row-create");
    const createVenueNameInput = getByTestId("venue-create-name-input");
    const venuesSubmitButton = getByTestId("venues-submit-button");

    expect(createVenueRow).toBeInTheDocument();
    expect(createVenueNameInput).toBeInTheDocument();
    expect(venuesSubmitButton).toBeInTheDocument();

    fireEvent.change(createVenueNameInput, {
      target: { value: "" },
    });

    expect(createVenueNameInput.value).toBe("");

    fireEvent.click(venuesSubmitButton);

    const error = getByTestId("name-error");
    expect(error).toBeInTheDocument();
  });

  it("should clear errors after cancel", () => {
    const { getByTestId } = rendered;
    const createButton = getByTestId("create-venue-button");
    const existingVenueName = venues[0].name;

    fireEvent.click(createButton);

    const createVenueRow = getByTestId("venue-row-create");
    const createVenueNameInput = getByTestId("venue-create-name-input");
    const venuesSubmitButton = getByTestId("venues-submit-button");

    expect(createVenueRow).toBeInTheDocument();
    expect(createVenueNameInput).toBeInTheDocument();
    expect(venuesSubmitButton).toBeInTheDocument();

    fireEvent.change(createVenueNameInput, {
      target: { value: existingVenueName },
    });

    expect(createVenueNameInput.value).toBe(existingVenueName);

    fireEvent.click(venuesSubmitButton);

    const error = getByTestId("name-error");
    expect(error).toBeInTheDocument();

    const cancelButton = getByTestId("venues-cancel-button");
    fireEvent.click(cancelButton);

    fireEvent.click(createVenueRow);
    expect(error).not.toBeInTheDocument();
  });

  it("should clear errors after submit", () => {
    const { getByTestId } = rendered;
    const createButton = getByTestId("create-venue-button");
    const existingVenueName = venues[0].name;
    const newVenueName = "Test Venue 3";

    fireEvent.click(createButton);

    const createVenueRow = getByTestId("venue-row-create");
    const createVenueNameInput = getByTestId("venue-create-name-input");
    const venuesSubmitButton = getByTestId("venues-submit-button");

    expect(createVenueRow).toBeInTheDocument();
    expect(createVenueNameInput).toBeInTheDocument();
    expect(venuesSubmitButton).toBeInTheDocument();

    fireEvent.change(createVenueNameInput, {
      target: { value: existingVenueName },
    });

    expect(createVenueNameInput.value).toBe(existingVenueName);

    fireEvent.click(venuesSubmitButton);

    const error = getByTestId("name-error");
    expect(error).toBeInTheDocument();

    fireEvent.change(createVenueNameInput, {
      target: { value: newVenueName },
    });

    expect(createVenueNameInput.value).toBe(newVenueName);
    fireEvent.click(venuesSubmitButton);

    expect(mockInertiaPost).toBeCalled();

    fireEvent.click(createVenueRow);
    expect(error).not.toBeInTheDocument();
  });
});
