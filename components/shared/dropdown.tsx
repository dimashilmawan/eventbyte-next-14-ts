"use client";

import {
  createCategory,
  getAllCategories,
} from "@/lib/actions/category.action";
import { ICategory } from "@/lib/database/models/category.model";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useController } from "react-hook-form";
import CreatableSelect from "react-select/creatable";

export const selectComponentStyles = {
  container: () => "!h-10 !flex-center !w-full ",
  control: (state: any) =>
    cn(
      state.isFocused
        ? "!border-input !ring-2 !ring-ring !ring-offset-2"
        : "!border !border-input ",
      "!rounded-md !w-full !h-full !text-sm",
    ),
  placeholder: () => "!text-muted-foreground ",
  valueContainer: () => "!text-yellow-400 !px-2.5",
  option: (state: any) =>
    cn(
      state.isFocused && "!bg-primary-500/50 !text-white",
      state.isSelected && "!bg-primary-500 !text-white",
      "!rounded-md ",
    ),
  menu: () => "!rounded-md",
  menuList: () => "!space-y-0.5 !px-1",
};

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
      // classNamePrefix="react-select"
      classNames={selectComponentStyles}
    />
  );
};
