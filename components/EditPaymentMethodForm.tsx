import { buttonVariants } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const EditPaymentMethodForm = () => {
  return (
    <Dialog>
      <DialogTrigger
        className={cn(
          buttonVariants({ variant: "outline" }),
          "text-sm font-medium w-[80%] self-start z-[1]"
        )}
      >
        Edit
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <div className="flex items-center justify-between gap-2 mt-6">
            <DialogTitle>Edit Payout Metod</DialogTitle>
            <p className="text-red-600 text-sm font-medium cursor-pointer">
              Remove
            </p>
          </div>
          <CardContent className="px-0">
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="Enter your email" type="email" />
              </div>

              <div className="flex justify-between pt-4">
                <DialogClose
                  className={cn(buttonVariants({ variant: "outline" }))}
                >
                  Cancel
                </DialogClose>
                <DialogClose
                  className={cn(buttonVariants({ variant: "default" }))}
                >
                  Save Changes
                </DialogClose>
              </div>
            </form>
          </CardContent>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default EditPaymentMethodForm;
