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

export const Dropdown = () => {
  const { field } = useController({ name: "category" });
  const [options, setOptions] = useState<Option[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllCategories = async () => {
      const categories = (await getAllCategories()) as ICategory[];

      if (!categories || categories.length === 0) return setIsLoading(false);

      const formattedCategories = categories.map((category) =>
        createOption(category),
      );

      setOptions(formattedCategories);
      setIsLoading(false);
    };
    fetchAllCategories();
  }, []);

  const handleCreate = async (inputValue: string) => {
    setIsLoading(true);
    const newCategory = (await createCategory({
      categoryName: inputValue,
    })) as ICategory;
    if (!newCategory) return;

    const newOption = createOption(newCategory);

    setIsLoading(false);
    setOptions((prev) => [...prev, newOption]);
    field.onChange(newOption);
  };

  return (
    <CreatableSelect
      {...field}
      isDisabled={isLoading}
      isLoading={isLoading}
      instanceId={field.name}
      onCreateOption={handleCreate}
      options={options}
      placeholder="Category"
      classNames={{
        container: () => cn("!h-10 !flex-center !w-full"),
        control: (state) =>
          cn(
            state.isFocused
              ? "!border-input !ring-2 !ring-ring !ring-offset-2"
              : "!border !border-input ",
            "!rounded-md !w-full",
          ),
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
