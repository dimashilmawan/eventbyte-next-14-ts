"use client";

import { useUploadThing } from "@/lib/uploadthing";
import { useDropzone } from "@uploadthing/react";
import {
  Dispatch,
  SetStateAction,
  forwardRef,
  useCallback,
  useEffect,
  useState,
} from "react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { MonitorUpIcon } from "lucide-react";

const fileTypes = ["image/svg+xml", "image/png", "image/jpeg", "image/webp"];

type FileUploaderProps = {
  onChange: (url: string) => void;
  imageUrl: string;
  setFiles: Dispatch<SetStateAction<File[]>>;
  onImageError: (message: string) => void;
  onClearImageError: () => void;
};

export const FileUploader = forwardRef<HTMLDivElement, FileUploaderProps>(
  ({ imageUrl, onChange, setFiles, onImageError, onClearImageError }, ref) => {
    const [isLoading, setIsLoading] = useState(true);

    // const { permittedFileInfo } = useUploadThing("imageUploader");

    useEffect(() => {
      setIsLoading(false);
    }, []);

    const onDrop = useCallback(
      (acceptedFiles: File[]) => {
        if (acceptedFiles.length === 0) {
          onImageError(
            "Please upload a single image file with a maximum size of 4MB.",
          );
          onChange("");
          setFiles([]);
        }
        onChange(URL.createObjectURL(acceptedFiles[0]));
        onClearImageError();
        setFiles(acceptedFiles);
      },
      [onChange, setFiles, onImageError, onClearImageError],
      // [],
    );

    // const fileTypes = permittedFileInfo?.config
    //   ? Object.keys(permittedFileInfo?.config)
    //   : [];

    const { getRootProps, getInputProps } = useDropzone({
      // accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
      onDrop,
      accept: generateClientDropzoneAccept(fileTypes),
      maxFiles: 1,
      multiple: false,
      maxSize: 4000000, //4mb
      disabled: isLoading,
    });

    return (
      <div
        {...getRootProps()}
        ref={ref}
        className={cn(
          "flex-center h-72 cursor-pointer overflow-hidden rounded-md border border-input transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          isLoading && "cursor-wait bg-gray-200",
        )}
      >
        <input {...getInputProps()} />
        {imageUrl ? (
          <div className="h-full w-full">
            <Image
              src={imageUrl}
              alt="uploaded image"
              width={250}
              height={250}
              className="h-full w-full object-cover object-center"
            />
          </div>
        ) : (
          <div className="flex-center flex-col text-muted-foreground">
            <MonitorUpIcon className="h-20 w-20 " />
            <h3 className="mt-2">Drag an Image here</h3>
            <p className="mt-2 text-sm font-medium">JPG, PNG, SVG, WEBP</p>
            <span className="my-2 ">or</span>
            <Button type="button">Select from computer</Button>
          </div>
        )}
      </div>
    );
  },
);

FileUploader.displayName = "FileUploader";
