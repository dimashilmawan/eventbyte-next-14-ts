"use client";

import {
  createCategory,
  getAllCategories,
} from "@/lib/actions/category.action";
import { ICategory } from "@/lib/database/models/category.model";
import { cn } from "@/lib/utils";
import { forwardRef, useEffect, useState } from "react";
import { useController } from "react-hook-form";
import CreatableSelect from "react-select/creatable";

interface Option {
  readonly label: string;
  readonly value: string;
}

const createOption = ({ _id, name }: ICategory): Option => ({
  label: name,
  value: _id,
});

type DropdownProps = {
  onDropdownError: (message: string) => void;
};

export const Dropdown = ({ onDropdownError }: DropdownProps) => {
  const { field } = useController({ name: "category" });
  const [options, setOptions] = useState<Option[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const categories = await getAllCategories();

        const formattedCategories = categories.map((category) =>
          createOption(category),
        );

        setOptions(formattedCategories);
        setIsLoading(false);
      } catch (error) {
        onDropdownError("failed to fetch all Categories");
        setIsLoading(false);
      }
    };
    fetchAllCategories();
  }, [onDropdownError]);

  const handleCreate = async (inputValue: string) => {
    try {
      setIsLoading(true);

      const newCategory = await createCategory({
        categoryName: inputValue.trim(),
      });

      const newOption = createOption(newCategory);

      setIsLoading(false);

      setOptions((prev) => [...prev, newOption]);
      field.onChange(newOption);
    } catch (error) {
      // Handle the error, display an error message, or log it;
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <CreatableSelect
      {...field}
      isDisabled={isLoading}
      isLoading={isLoading}
      instanceId={field.name}
      onCreateOption={handleCreate}
      options={options}
      // unstyled
      placeholder="Category"
      classNamePrefix="react-select"
      classNames={{
        container: () => "!h-10 !flex-center !w-full !text-sm ",
        control: (state) =>
          cn(
            state.isFocused
              ? "!border-input !ring-2 !ring-ring !ring-offset-2"
              : "!border !border-input ",
            "!rounded-md !w-full ",
          ),
        placeholder: (state) => "!text-muted-foreground ",
        valueContainer: (state) => "!text-yellow-400 !px-2.5",
        option: (state) =>
          cn(
            state.isFocused && "!bg-primary-500/50 !text-white",
            state.isSelected && "!bg-primary-500 !text-white",
            "!rounded-md ",
          ),
        menu: () => "!rounded-md",
        menuList: (state) => "!space-y-0.5 !px-1",
      }}
    />
  );
};
