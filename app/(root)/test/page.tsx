"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  createCategory,
  getAllCategories,
} from "@/lib/actions/category.action";
import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useEffect, useId, useState } from "react";
import { useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import { z } from "zod";

interface Option {
  readonly label: string;
  readonly value: string;
}

const createOption = ({ _id, name }: { _id: string; name: string }) => ({
  label: name,
  value: _id,
});

const formSchema = z.object({
  category: z
    .object({
      label: z.string(),
      value: z.string(),
    })
    .nullable(),
});

export default function Page() {
  const [options, setOptions] = useState<{ label: string; value: string }[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllCategories = async () => {
      const categories = await getAllCategories();
      if (!categories || categories.length === 0) return;
      const newCategories = categories.map((category) =>
        createOption(category),
      );
      setOptions(newCategories);
      setIsLoading(false);
    };
    fetchAllCategories();
  }, []);

  const handleCreate = async (
    inputValue: string,
    onChange: (...event: any[]) => void,
  ) => {
    setIsLoading(true);
    const newCategory = await createCategory({ categoryName: inputValue });
    const newOption = createOption(newCategory);

    setIsLoading(false);
    setOptions((prev) => [...prev, newOption]);
    onChange(newOption);
  };

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: null,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  // if (!isClient) return null;
  return (
    <div className="flex-center h-screen w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <CreatableSelect
                    {...field}
                    isDisabled={isLoading}
                    isLoading={isLoading}
                    instanceId={field.name}
                    onCreateOption={(inputValue: string) => {
                      handleCreate(inputValue, field.onChange);
                    }}
                    options={options}
                    placeholder="Category"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}

// export default function Page() {
//   return <div>Page</div>;
// }
