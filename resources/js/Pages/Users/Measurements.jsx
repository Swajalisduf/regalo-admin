import React, { useState } from "react";
import { camelCase } from "lodash";

import { Inertia } from "@inertiajs/inertia";
import { Head, useForm } from "@inertiajs/inertia-react";
import Authenticated from "@/Layouts/Authenticated";
import {
  Header,
  Input,
  PageContentWrapper,
  HeightInput,
  Button,
} from "@/Components";

const MeasurementsForm = ({ fields, id, values }) => {
  const textFields = ["tshirtSize"];
  const [message, setMessage] = useState(null);
  const { data, setData, put } = useForm(values);

  const onSubmit = (e) => {
    e.preventDefault();
    put(route("users.measurements.update", { id }), data);
    setMessage("submitted woot");
    setTimeout(() => {
      setMessage(null);
    }, 2000);
  };

  const onHandleChange = (event) => {
    setData(
      event.target.name,
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value
    );
  };

  return (
    <>
      {message && <h3>{message}</h3>}
      <form onSubmit={onSubmit}>
        <div className="w-full md:grid md:grid-cols-3 md:gap-x-6">
          <HeightInput setData={setData} height={data.height} />
          {Object.keys(fields)
            .filter((field) => field !== "height")
            .map((field, index) => (
              <div key={field}>
                <Input
                  className="mt-1 w-full"
                  type={textFields.includes(field) ? "text" : "number"}
                  label={fields[field]}
                  name={field}
                  autoComplete={field}
                  handleChange={onHandleChange}
                  value={data[field]}
                />
              </div>
            ))}
        </div>
        <Button className="mt-4 w-full md:w-1/4 justify-center" type="submit">
          Submit
        </Button>
      </form>
    </>
  );
};

const Measurements = ({ user: { id, measurements, name }, auth, errors }) => {
  const fields = {
    height: "Height",
    weight: "Weight",
    tshirtSize: "T-shirt Size",
    shoeSize: "Shoe Size",
    head: "Head",
    neck: "Neck",
    shoulder: "Shoulder",
    armLength: "Arm Length",
    wrist: "Wrist",
    bust: "Bust",
    centerBack: "Center Back",
    waist: "Waist",
    hip: "Hips",
    crotchLength: "Crotch",
    inseam: "Inseam",
    outseam: "Outseam",
    ankle: "Ankle",
  };

  const values = Object.keys(fields).reduce(
    (prevVal, currentVal) => ({
      ...prevVal,
      [currentVal]: measurements ? measurements[currentVal] || "" : "",
    }),
    { userId: id }
  );

  const handleClick = (e) => {
    e.preventDefault();
    Inertia.post(route("users.measurements.create", { id }));
  };

  return (
    <Authenticated
      {...{
        auth,
        errors,
        header: <Header headerText={`${name} > Measurements`} />,
      }}
    >
      <Head title="Measurements" />
      <PageContentWrapper>
        {!measurements && (
          <Button type="button" onClick={handleClick}>
            Add User Measurements
          </Button>
        )}
        {measurements && <MeasurementsForm {...{ fields, id, values }} />}
      </PageContentWrapper>
    </Authenticated>
  );
};

export default Measurements;
