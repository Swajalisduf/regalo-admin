import React from "react";
import Header from "@/Components/Header";
import Authenticated from "@/Layouts/Authenticated";
import { Head, Link } from "@inertiajs/inertia-react";
import PageContentWrapper from "@/Components/PageContentWrapper";

export default function Dashboard(props) {
  return (
    <Authenticated
      auth={props.auth}
      errors={props.errors}
      header={<Header headerText="Dashboard" />}
    >
      <Head title="Dashboard" />
      <PageContentWrapper>
        <h3>Quick Links</h3>
        <div className="flex flex-col pl-4">
          <Link className="text-sky-500" href="/venues">
            Venues
          </Link>
          <Link className="text-sky-500" href="/shows">
            Shows
          </Link>
        </div>
      </PageContentWrapper>
    </Authenticated>
  );
}
