import React from "react";
import "@testing-library/jest-dom";

// Allows us to test if route is posted to without having to manually add
// the @inertiajs/inertia-react module mock to every test file
global.mockInertiaGet = jest.fn();
global.mockInertiaPost = jest.fn();
global.mockInertiaPut = jest.fn();
global.mockInertiaDelete = jest.fn();

jest.mock("@inertiajs/inertia-react", () => {
  const originalModule = jest.requireActual("@inertiajs/inertia-react");
  const mockUseForm = (fields) => {
    const useFormMethods = originalModule.useForm(fields);
    return {
      ...useFormMethods,
      get: global.mockInertiaGet,
      post: global.mockInertiaPost,
      put: global.mockInertiaPut,
      delete: global.mockInertiaDelete,
    };
  };

  return {
    __esModule: true,
    ...originalModule,
    Head: ({ title }) => <div data-testid="title">{title}</div>,
    useForm: mockUseForm,
  };
});
