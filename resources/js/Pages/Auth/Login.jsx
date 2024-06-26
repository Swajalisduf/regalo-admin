import React, { useEffect, useState } from "react";
import Button from "@/Components/Button";
import Checkbox from "@/Components/Checkbox";
import Guest from "@/Layouts/Guest";
import Input from "@/Components/Input";
import ValidationErrors from "@/Components/ValidationErrors";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import { useRoute } from "@/hooks";

export default function Login({ status, canResetPassword, userEmail = "" }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: userEmail || "",
    password: "",
    remember: "",
  });
  const route = useRoute();

  const [step, setStep] = useState(1);

  useEffect(() => {
    return () => {
      reset("password");
    };
  }, []);

  useEffect(() => {
    if (userEmail) {
      setStep(2);
    }
  }, [userEmail]);

  const onHandleChange = (event) => {
    setData(
      event.target.name,
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value
    );
  };

  const submit = (e) => {
    e.preventDefault();
    if (data.email && !data.password && step === 1) {
      post(route("password.reset.check"), { email: data.email });
    } else if (step === 2) {
      post(route("login"));
    }
  };

  return (
    <Guest>
      <Head title="Log in" />

      {status && (
        <div className="mb-4 font-medium text-sm text-green-600">{status}</div>
      )}

      <ValidationErrors errors={errors} />

      <form onSubmit={submit}>
        <div>
          <Input
            type="text"
            name="email"
            label="Email"
            value={data.email}
            className="mt-1 block w-full"
            autoComplete="username"
            isFocused={true}
            handleChange={onHandleChange}
          />
        </div>

        {step === 2 && (
          <div className="mt-4">
            <Input
              type="password"
              name="password"
              label="Password"
              value={data.password}
              className="mt-1 block w-full"
              autoComplete="current-password"
              handleChange={onHandleChange}
            />
          </div>
        )}

        <div className="block mt-4">
          <label className="flex items-center">
            <Checkbox
              name="remember"
              value={data.remember}
              handleChange={onHandleChange}
            />

            <span className="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
        </div>

        <div className="flex items-center justify-end mt-4">
          {canResetPassword && (
            <Link
              href={route("password.request")}
              className="underline text-sm text-gray-600 hover:text-gray-900"
            >
              Forgot your password?
            </Link>
          )}

          <Button className="ml-4" processing={processing}>
            {step === 1 ? "Next" : "Log in"}
          </Button>
        </div>
      </form>
    </Guest>
  );
}
