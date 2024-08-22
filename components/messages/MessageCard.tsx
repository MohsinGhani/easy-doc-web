import { useAppSelector } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import AttachmentCard from "./AttachmentCard";
import { Message } from "@/types/chat";

const MessageCard = ({ message }: { message: Message }) => {
  const {
    attachments,
    author: { userId },
    text,
    replies,
  } = message;
  const user = useAppSelector((state) => state.auth.user);
  const isMine = user.userId === userId;

  return (
    <div
      className={cn(
        "max-w-72 p-1 rounded-lg flex-col justify-start items-start gap-2.5 inline-flex bg-secondary text-secondary-foreground",
        {
          "bg-primary/80 text-primary-foreground self-end": isMine,
        }
      )}
    >
      <div className="space-y-2 relative">
        {attachments.map((attachment) => (
          <AttachmentCard attachment={attachment} key={attachment.name} />
        ))}
        <p className="text-base font-normal px-2">{text}</p>
      </div>
    </div>
  );
};

export default MessageCard;
