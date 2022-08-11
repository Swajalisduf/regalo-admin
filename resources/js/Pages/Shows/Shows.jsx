import React from "react";

import Authenticated from "@/Layouts/Authenticated";
import { Header, FormTable, PageContentWrapper } from "@/Components";
import { useFormWithApi } from "@/hooks";
import { Head } from "@inertiajs/inertia-react";

const Shows = ({ shows, auth, errors }) => {
  const fields = {
    id: "",
    name: "",
  };

  const routes = {
    delete: "shows.delete",
    post: "shows.create",
    put: "shows.update",
  };

  const validations = [
    {
      field: "name",
      message: "Show already exists",
      validate: ({ name }) =>
        !shows.find((show) => show.name.toLowerCase() === name.toLowerCase()),
    },
    {
      field: "name",
      message: "Show name cannot be empty",
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
        header: <Header headerText="Shows" />,
      }}
    >
      <Head title="Shows" />
      <PageContentWrapper data-testid="shows">
        <FormTable
          {...{ formState, handlers, model: "show", rowData: shows }}
        />
      </PageContentWrapper>
    </Authenticated>
  );
};

export default Shows;
