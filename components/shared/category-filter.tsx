"use client";
import { getAllCategories } from "@/lib/actions/category.action";
import { ICategory } from "@/lib/database/models/category.model";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Select, { SingleValue } from "react-select";
import { selectComponentStyles } from "./dropdown";

interface Option {
  readonly label: string;
  readonly value: string;
}

const createOption = ({ _id, name }: ICategory): Option => ({
  label: name,
  value: _id,
});

export const CategoryFilter = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [options, setOptions] = useState<Option[]>([]);
  const searchParams = useParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSelectCategory = (category: SingleValue<Option>) => {
    let newUrl = "";

    // if category value is NOT EMPTY
    if (category?.label) {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "category",
        value: category?.label,
        pathname,
      });
      // if category value is EMPTY
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        pathname,
        keysToBeRemoved: ["category"],
      });
    }

    router.push(newUrl, { scroll: false });
  };

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
        setIsLoading(false);
      }
    };
    fetchAllCategories();
  }, []);

  return (
    <Select
      isDisabled={isLoading}
      isLoading={isLoading}
      placeholder="Select Category.."
      options={options}
      isClearable
      onChange={handleSelectCategory}
      instanceId="category-filter"
      classNames={{
        ...selectComponentStyles,
        container: () => "!flex-1",
      }}
    />
  );
};
