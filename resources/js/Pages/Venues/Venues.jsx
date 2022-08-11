import React from "react";

import Authenticated from "@/Layouts/Authenticated";
import {
  Button,
  FormTable,
  FormTableRow,
  Header,
  Input,
  Modal,
  PageContentWrapper,
} from "@/Components";
import { useFormWithApi } from "@/hooks";
import { Head } from "@inertiajs/inertia-react";

const Venues = ({ venues, auth, errors }) => {
  const fields = {
    id: "",
    name: "",
  };

  const routes = {
    delete: "venues.delete",
    post: "venues.create",
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

  return (
    <Authenticated
      {...{
        auth,
        header: <Header headerText="Venues" />,
      }}
    >
      <Head title="Venues" />
      <PageContentWrapper data-testid="venues">
        <FormTable
          {...{ formState, handlers, model: "venue", rowData: venues }}
        />
      </PageContentWrapper>
    </Authenticated>
  );
};

export default Venues;
