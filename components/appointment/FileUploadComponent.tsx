import { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import { File, Trash2, UploadCloud } from "lucide-react";
import PreviewDialog from "./PreviewDialog";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import { toast } from "sonner";

export interface FileItem {
  name: string;
  size: number;
  preview?: string;
  type: string;
}

interface FileUploadComponentProps {
  onFilesUploaded: (files: FileItem[]) => void;
}

export default function FileUploadComponent({
  onFilesUploaded,
}: FileUploadComponentProps) {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const filesInputRef = useRef<HTMLInputElement | null>(null);

  const handleFiles = useCallback(
    (newFiles: File[]) => {
      if (newFiles.length === 0) return;

      if (newFiles.length + files.length > 5) {
        return toast.error("You can only upload a maximum of 5 files");
      }

      const updatedFiles = newFiles.map((file) => ({
        name: file.name,
        size: file.size,
        type: file.type,
        preview: file.type.startsWith("image/")
          ? URL.createObjectURL(file)
          : undefined,
      }));

      setFiles((prevFiles) => [...prevFiles, ...updatedFiles]);
    },
    [files.length]
  );

  useEffect(() => {
    onFilesUploaded(files);
  }, [files, onFilesUploaded]);

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      const droppedFiles = Array.from(e.dataTransfer.files);
      handleFiles(droppedFiles);
    },
    [handleFiles]
  );

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const selectedFiles = Array.from(event.target.files);
        handleFiles(selectedFiles);
        event.target.value = ""; // Reset the input to allow re-selection
      }
    },
    [handleFiles]
  );

  const openPreview = (file: FileItem) => {
    setSelectedFile(file);
    setPreviewOpen(true);
  };

  const handleFilesInputClick = useCallback(() => {
    filesInputRef.current?.click();
  }, []);

  const handleFileRemove = useCallback((index: number) => {
    setFiles((prevFiles) => {
      const updatedFiles = prevFiles.filter((_, i) => i !== index);
      return updatedFiles;
    });
  }, []);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Upload medical reports:</h2>
      <div
        className={`border border-dashed rounded-xl p-5 mb-4 transition-colors cursor-pointer ${
          isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={handleFilesInputClick}
      >
        <div className="flex items-center gap-6">
          <UploadCloud className="h-12 w-12 text-gray-400 mb-3 stroke-1" />

          <div className="flex items-center justify-between w-full">
            <div className="space-y-2">
              <p className="text-sm text-gray-600 mb-2">
                {isDragging
                  ? "Drop files here"
                  : "Select a file or drag and drop here"}
              </p>

              <p className="text-xs text-gray-500 mb-3">
                JPG, PNG or PDF, file size no more than 10MB
              </p>
            </div>

            <label
              htmlFor="file-upload"
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              Select file
            </label>
          </div>

          <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handleFileChange}
            multiple
            accept="image/*,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,video/*,audio/*"
            ref={filesInputRef}
          />
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold mb-2">File added</h3>
          <ul className="space-y-2">
            {files.map((file, index) => (
              <li
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex items-center space-x-3">
                  {file.preview ? (
                    <Image
                      src={file.preview}
                      alt={file.name}
                      className="w-6 h-6 object-cover rounded"
                      width={24}
                      height={24}
                    />
                  ) : (
                    <File className="h-6 w-6 text-gray-400" />
                  )}
                  <div className="flex items-center space-x-4">
                    <p className="text-sm font-medium text-gray-900">
                      {file.name}
                    </p>

                    {file.preview && (
                      <button
                        type="button"
                        onClick={() => openPreview(file)}
                        className="text-sm text-blue-500 hover:text-blue-700"
                      >
                        Preview
                      </button>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(1)}MB
                  </span>

                  <button
                    type="button"
                    onClick={() => handleFileRemove(index)}
                    className="text-sm text-blue-500 hover:text-blue-700"
                  >
                    <Trash2 className="h-4 w-4 text-red-500 hover:text-red-700 transition-colors duration-200 ease-in-out" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Preview Dialog */}
      {selectedFile && (
        <PreviewDialog
          open={previewOpen}
          file={selectedFile}
          onClose={() => setPreviewOpen(false)}
        />
      )}
    </div>
  );
}
