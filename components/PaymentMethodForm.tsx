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
import ConnectStripeButton from "./doctor/ConnectStripeButton";

export default function PaymentMethodForm() {
  return (
    <Dialog>
      <DialogTrigger className={cn(buttonVariants({ variant: "default" }))}>
        Add Payout Method
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Payout Method</DialogTitle>
          <CardContent className="px-0">
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="Enter your email" type="email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Name on card</Label>
                <Input id="name" placeholder="Enter name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="card">Card No</Label>
                <Input id="card" placeholder="Enter card number" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry</Label>
                  <Input id="expiry" placeholder="MM/YY" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="000" />
                </div>
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
                  Add
                </DialogClose>
              </div>
            </form>
            <p className="text-center text-muted-foreground my-4">OR</p>
            <div className="flex justify-center">
              <ConnectStripeButton />
            </div>
          </CardContent>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
