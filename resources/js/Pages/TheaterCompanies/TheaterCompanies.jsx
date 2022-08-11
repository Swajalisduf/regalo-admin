import React from "react";

import Authenticated from "@/Layouts/Authenticated";
import { Header, FormTable, PageContentWrapper } from "@/Components";
import { useFormWithApi } from "@/hooks";
import { Head } from "@inertiajs/inertia-react";

const TheaterCompanies = ({ theaterCompanies, auth, errors }) => {
  const fields = {
    id: "",
    name: "",
  };

  const routes = {
    delete: "theater_companies.delete",
    post: "theater_companies.create",
    put: "theater_companies.update",
  };

  const validations = [
    {
      field: "name",
      message: "Theater company already exists",
      validate: ({ name }) =>
        !theaterCompanies.find(
          (theaterCompany) =>
            theaterCompany.name.toLowerCase() === name.toLowerCase()
        ),
    },
    {
      field: "name",
      message: "Theater company name cannot be empty",
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
        header: <Header headerText="Theater Companies" />,
      }}
    >
      <Head title="Theater Companies" />
      <PageContentWrapper data-testid="theater-companies">
        <FormTable
          {...{ formState, handlers, model: "show", rowData: theaterCompanies }}
        />
      </PageContentWrapper>
    </Authenticated>
  );
};

export default TheaterCompanies;
