"use client";
import { FileUploader } from "@/components/shared/file-uploader";
import { UploadButton, UploadDropzone } from "@/lib/uploadthing";
import { SubmitHandler, useForm } from "react-hook-form";

enum GenderEnum {
  female = "female",
  male = "male",
  other = "other",
}

interface IFormInput {
  firstName: string;
  gender: GenderEnum;
}

export default function Page() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IFormInput>({
    defaultValues: { firstName: "", gender: GenderEnum.female },
  });
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);
  const handleTitleError = () => {
    setError("firstName", { message: "title error" });
  };

  console.log(errors.firstName);
  return (
    <div className="flex-center h-screen w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>First Name</label>
        <input
          {...register("firstName", {
            required: { message: "required bro", value: true },
          })}
        />
        <label>Gender Selection</label>
        <select {...register("gender")}>
          <option value="female">female</option>
          <option value="male">male</option>
          <option value="other">other</option>
        </select>
        <input type="submit" />
        <button
          className="rounded-md bg-primary-500 px-3 py-1.5 text-white"
          type="button"
          onClick={handleTitleError}
        >
          click
        </button>
      </form>
      {errors.firstName && <p>{errors.firstName.message}</p>}
    </div>
  );
}
