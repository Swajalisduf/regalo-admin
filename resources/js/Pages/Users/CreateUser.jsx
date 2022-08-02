import React from "react";

import { Button, Header, Input, PageContentWrapper } from "@/Components";
import { Head, useForm } from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/Authenticated";
import { onHandleFormChange } from "@/utils";

const CreateUser = ({ auth, errors }) => {
  const { data, setData, post } = useForm({
    name: "",
    email: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    post(route("users.create"), data);
  };

  return (
    <Authenticated
      {...{
        auth,
        errors,
        header: <Header headerText="Create New User" />,
      }}
    >
      <Head title="Create New User" />
      <PageContentWrapper>
        <form onSubmit={onSubmit}>
          <Input
            className="mt-1"
            type="text"
            label="Name"
            name="name"
            autoComplete="name"
            handleChange={(e) => onHandleFormChange(e, setData)}
            value={data.name}
          />
          <Input
            className="mt-1"
            type="text"
            label="Email"
            name="email"
            autoComplete="email"
            handleChange={(e) => onHandleFormChange(e, setData)}
            value={data.email}
          />
          <Button className="mt-4" type="submit">
            Create User
          </Button>
        </form>
      </PageContentWrapper>
    </Authenticated>
  );
};

export default CreateUser;
