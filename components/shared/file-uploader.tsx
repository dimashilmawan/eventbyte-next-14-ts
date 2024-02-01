"use client";

import { useUploadThing } from "@/lib/uploadthing";
import { useDropzone } from "@uploadthing/react";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { Button } from "../ui/button";

type FileUploaderProps = {
  onChange: (url: string) => void;
  imageUrl: string;
  setFiles: Dispatch<SetStateAction<File[]>>;
};

export const FileUploader = ({
  imageUrl,
  onChange,
  setFiles,
}: FileUploaderProps) => {
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    setisLoading(false);
  }, []);

  const onDrop = useCallback(
    (acceptedFile: File[]) => {
      if (acceptedFile.length === 0) return;
      onChange(URL.createObjectURL(acceptedFile[0]));

      setFiles(acceptedFile);
    },
    [onChange, setFiles],
  );

  const { permittedFileInfo } = useUploadThing("imageUploader");

  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : [];

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
    maxFiles: 1,
    multiple: false,
    maxSize: 4000000, //4mb
  });

  return (
    <div
      {...getRootProps()}
      className="flex-center h-72 overflow-hidden rounded-md border border-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
    >
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <>
          <input {...getInputProps()} />
          {!imageUrl && (
            <div className="flex-center aspect-video w-36 rounded-md ">
              Drop files here!
            </div>
          )}
          <div>
            <div className="flex h-full w-full flex-1 justify-center ">
              {imageUrl.length > 0 && (
                <img
                  src={imageUrl}
                  alt="image"
                  width={250}
                  height={250}
                  className="w-full object-cover object-center"
                />
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
