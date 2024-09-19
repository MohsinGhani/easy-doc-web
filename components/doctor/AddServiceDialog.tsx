"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn, getServiceBySpeciality } from "@/lib/utils";
import { CardContent } from "../ui/card";
import { SPECIALITIES } from "@/constants";
import { CustomFormField } from "../auth";
import { FormFieldType } from "../auth/CustomFormField";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { serviceSchema, serviceSchemaType } from "@/models/validationSchemas";
import { Form } from "../ui/form";
import { authThunks } from "@/lib/features/auth/authThunks";
import { useState } from "react";

const AddServiceDialog = () => {
  const { user, loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);

  const form = useForm<serviceSchemaType>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      speciality: "",
      service: "",
      fee: "0.00",
      description: "",
    },
  });

  const { control, handleSubmit, watch } = form;

  const onSubmit = async (data: serviceSchemaType) => {
    const res = await dispatch(
      authThunks.updateProfile({
        userId: user?.userId || "",
        updateData: { services: { value: [data], replace: false } },
      })
    );

    if (res.meta.requestStatus === "fulfilled") {
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={cn("", buttonVariants({ variant: "default" }))}>
        Add New Service
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] max-w-[90%] border lg:max-w-3xl lg:w-full rounded-xl overflow-y-auto">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Add New Service</DialogTitle>
              <DialogDescription>
                Enter the service details below
              </DialogDescription>
              <CardContent className="px-0 text-start space-y-2">
                {/* Responsive grid for Speciality, Service, and Price */}
                <div className="grid md:gap-6 gap-2 lg:grid-cols-3 md:grid-cols-2 grid-cols-1">
                  <CustomFormField
                    fieldType={FormFieldType.SELECT_WITH_SEARCH}
                    control={control}
                    items={SPECIALITIES.map((s) => ({
                      label: `${s.icon} ${s.name}`,
                      value: s.name,
                    }))}
                    name="speciality"
                    label="Speciality"
                  />

                  <CustomFormField
                    fieldType={FormFieldType.SELECT_WITH_SEARCH}
                    control={control}
                    items={getServiceBySpeciality(watch("speciality"))
                      .filter((s) => {
                        if (user?.services?.length > 0) {
                          return !user.services.some(
                            (us) => us?.service === s?.name
                          );
                        }
                        return true;
                      })
                      .map((s) => ({
                        label: s?.name,
                        value: s?.name,
                      }))}
                    name="service"
                    label="Service"
                  />

                  <CustomFormField
                    fieldType={FormFieldType.NUMBER}
                    control={control}
                    name="fee"
                    placeholder="0.00"
                    label="Fee"
                  />
                </div>

                <CustomFormField
                  fieldType={FormFieldType.TEXTAREA}
                  control={control}
                  name="description"
                  label="Description"
                />
              </CardContent>
            </DialogHeader>

            <DialogFooter>
              <DialogClose
                className={cn(buttonVariants({ variant: "outline" }))}
              >
                Cancel
              </DialogClose>
              <Button
                className={cn(buttonVariants({ variant: "default" }))}
                disabled={loading}
              >
                Add Service
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddServiceDialog;
