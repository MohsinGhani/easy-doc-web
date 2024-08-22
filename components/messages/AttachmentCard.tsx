import { cn } from "@/lib/utils";
import { Attachment } from "@/types/chat";
import Image from "next/image";

const AttachmentCard = ({ attachment }: { attachment: Attachment }) => {
  const { name, mimeType, size, url } = attachment;

  return (
    <div
      className={cn(
        "max-w-72 p-1 bg-white rounded-lg flex-col justify-start items-start gap-2.5 inline-flex"
      )}
    >
      <div className="h-28 flex-col justify-start items-start gap-1 flex">
        <Image
          className="h-16 rounded-lg object-cover"
          src={url}
          alt="avatar"
          width={1000}
          height={1000}
        />

        <div className="px-2 justify-center items-center gap-2.5 inline-flex">
          <div className="text-black text-base font-normal">{name}</div>
        </div>
        <div className="px-2 justify-center items-center gap-2.5 inline-flex">
          <div className="text-stone-400 text-xs font-normal">
            {size} | {mimeType.toUpperCase()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttachmentCard;
