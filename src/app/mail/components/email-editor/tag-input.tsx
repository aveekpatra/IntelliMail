import React, { useState } from "react";
import CustomAvatar from "@/components/ui/custom-avatar";
import Select from "react-select";

type TagInputProps = {
  suggestions: string[];
  defaultValues?: { label: string; value: string }[];
  placeholder: string;
  label: string;

  onChange: (values: { label: string; value: string }[]) => void;
  value: { label: string; value: string }[];
};

const TagInput: React.FC<TagInputProps> = ({
  suggestions,
  defaultValues = [],
  label,
  onChange,
  value,
}) => {
  const [input, setInput] = useState("");

  const options = suggestions.map((suggestion) => ({
    label: (
      <span className="flex items-center gap-2">
        <CustomAvatar name={suggestion} size="25" round={true} />
        {suggestion}
      </span>
    ),
    value: suggestion,
  }));

  return (
    <div className="flex items-center rounded-md border">
      <span className="ml-3 text-sm text-gray-500">{label}</span>
      <Select
        value={value}
        // @ts-ignore
        onChange={onChange}
        className="w-full flex-1"
        isMulti
        onInputChange={setInput}
        defaultValue={defaultValues}
        placeholder={""}
        options={
          input
            ? options.concat({
                label: (
                  <span className="flex items-center gap-2">
                    <CustomAvatar name={input} size="25" round={true} />
                    {input}
                  </span>
                ),
                value: input,
              })
            : options
        }
        classNames={{
          control: () => {
            return "!border-none !outline-none !ring-0 !shadow-none focus:border-none focus:outline-none focus:ring-0 focus:shadow-none dark:bg-transparent";
          },
          multiValue: () => {
            return "dark:!bg-gray-700";
          },
          multiValueLabel: () => {
            return "dark:text-white dark:bg-gray-700 rounded-md";
          },
        }}
        classNamePrefix="select"
      />
    </div>
  );
};

export default TagInput;
