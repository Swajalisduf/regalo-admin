import React, { useEffect, useState } from "react";

import { Input, Label } from "@/Components";

const HeightInput = ({ setData, height }) => {
  const [feet, setFeet] = useState(Math.floor(height / 12));
  const [inches, setInches] = useState(height % 12);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (
      !error &&
      (feet !== Math.floor(height / 12) || inches !== height % 12)
    ) {
      setData("height", feet * 12 + inches);
    }
  }, [height, feet, inches, setData]);

  const handleInchesChange = ({ target: { value } }) => {
    switch (true) {
      case value > 11:
        setFeet((current) => current + 1);
        setInches(0);
        break;
      case value < 0:
        setFeet((current) => current - 1);
        setInches(11);
        break;
      default:
        setInches(Number(value));
    }
  };

  return (
    <div>
      <Label className="mt-4 w-full" forInput="height" value="Height" />
      <div className="flex space-x-2">
        <div className="mt-1 flex w-1/3">
          <Input
            type="number"
            name="heightFeet"
            className="w-5/6"
            value={feet}
            autoComplete="height"
            handleChange={({ target: { value } }) => setFeet(Number(value))}
          />
          <span className="w-1/6">ft</span>
        </div>
        <div className="mt-1 flex w-1/3">
          <Input
            type="number"
            name="heightInches"
            className="w-5/6"
            value={inches}
            error={error}
            autoComplete="height"
            handleChange={handleInchesChange}
          />
          <span className="w-1/6">in</span>
        </div>
      </div>
    </div>
  );
};

export default HeightInput;
