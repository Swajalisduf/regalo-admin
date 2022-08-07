import React, { useEffect } from "react";
import Button from "@/Components/Button";
import Guest from "@/Layouts/Guest";
import Input from "@/Components/Input";
import Label from "@/Components/Label";
import ValidationErrors from "@/Components/ValidationErrors";
import { Head, useForm } from "@inertiajs/inertia-react";
import { useRoute } from "@/hooks";

export default function SetNewUserPassword({ name, email }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email,
    name,
    password: "",
    password_confirmation: "",
    existingUser: true,
  });
  const route = useRoute();

  useEffect(() => {
    return () => {
      reset("password", "password_confirmation");
    };
  }, []);

  const onHandleChange = (event) => {
    setData(event.target.name, event.target.value);
  };

  const submit = (e) => {
    e.preventDefault();

    post(route("register"));
  };

  return (
    <Guest>
      <Head title="Set New User Password" />

      <ValidationErrors errors={errors} />

      <form onSubmit={submit}>
        <div>
          <Label forInput="email" value="Email" />

          <Input
            type="email"
            name="email"
            value={data.email}
            className="mt-1 block w-full"
            autoComplete="username"
            handleChange={onHandleChange}
          />
        </div>

        <div className="mt-4">
          <Label forInput="password" value="Password" />

          <Input
            type="password"
            name="password"
            value={data.password}
            className="mt-1 block w-full"
            autoComplete="new-password"
            isFocused={true}
            handleChange={onHandleChange}
          />
        </div>

        <div className="mt-4">
          <Label forInput="password_confirmation" value="Confirm Password" />

          <Input
            type="password"
            name="password_confirmation"
            value={data.password_confirmation}
            className="mt-1 block w-full"
            autoComplete="new-password"
            handleChange={onHandleChange}
          />
        </div>

        <div className="flex items-center justify-end mt-4">
          <Button className="ml-4" processing={processing}>
            Set Password
          </Button>
        </div>
      </form>
    </Guest>
  );
}
