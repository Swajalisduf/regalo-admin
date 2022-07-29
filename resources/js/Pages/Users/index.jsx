import React from "react";
import axios from "axios";

import { Button, Header } from "@/Components";
import { useAsync } from "@/hooks";
import { Head } from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/Authenticated";

import User from "./User";
import PageContentWrapper from "@/Components/PageContentWrapper";

const Users = ({ auth, errors, users }) => {
  return (
    <Authenticated
      auth={auth}
      errors={errors}
      header={<Header headerText={"Users"} />}
    >
      <Head title="Users" />
      <PageContentWrapper>
        <div className="flex-column w-full divide-y">
          <div className="w-full flex divide-x-2">
            <span className="w-1/12 p-4 text-center">Id</span>
            <span className="w-5/12 p-4 text-center">Name</span>
            <span className="w-1/2 p-4 text-center">Email</span>
          </div>
          {users && users.map((user) => <User key={user.id} user={user} />)}
        </div>
        <Button
          className="mt-4 w-full md:w-1/4 justify-center"
          type="button"
          href={route("users.create.view")}
        >
          Create User
        </Button>
      </PageContentWrapper>
    </Authenticated>
  );
};

export default Users;
