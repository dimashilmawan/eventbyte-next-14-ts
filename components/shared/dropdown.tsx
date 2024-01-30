"use client";

import { startTransition, useState } from "react";
import { FormControl } from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

type DropdownProps = {
  value: string;
  onChange: () => void;
};

// CHANGE with REACT SELECT with CREATABLE
export const Dropdown = ({ onChange, value }: DropdownProps) => {
  const [categories, setcategories] = useState([
    { _id: "1", name: "dimas" },
    { _id: "2", name: "hilmawan" },
  ]);
  const [newCategory, setNewCategory] = useState("");

  return (
    <Select onValueChange={onChange} defaultValue={value}>
      <FormControl>
        <SelectTrigger>
          <SelectValue placeholder="Category" />
        </SelectTrigger>
      </FormControl>
      <SelectContent>
        {categories.map((category) => (
          <SelectItem key={category._id} value={category._id}>
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
