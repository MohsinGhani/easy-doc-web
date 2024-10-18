import { useAppSelector } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import AttachmentCard from "./AttachmentCard";
import { format } from "date-fns";

const MessageCard = ({ message }: { message: Message }) => {
  const { attachments, senderId, text, sentAt } = message;
  const user = useAppSelector((state) => state.auth.user);
  const isMine = user.userId === senderId;

  return (
    <div
      className={cn(
        "max-w-72 p-[6px] rounded-lg flex-col justify-start items-start gap-2.5 inline-flex bg-secondary text-secondary-foreground",
        {
          "bg-primary/80 text-primary-foreground self-end rounded-br-none":
            isMine,
          "rounded-bl-none": !isMine,
        }
      )}
    >
      <div className="space-y-2 relative">
        {attachments && attachments.length > 0
          ? attachments.map((attachment) => (
              <AttachmentCard attachment={attachment} key={attachment.name} />
            ))
          : ""}
        <p className="text-base font-normal px-2">
          {text}{" "}
          <span className="text-zinc-600 text-xs font-normal italic leading-none ml-2">
            {format(sentAt, "hh:mm a")}
          </span>
        </p>
      </div>
    </div>
  );
};

export default MessageCard;
