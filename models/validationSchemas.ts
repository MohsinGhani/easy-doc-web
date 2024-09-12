import { z } from "zod";

export const experienceSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    employment_type: z.enum(["fulltime", "parttime", "contract"], {
      required_error: "Employment type is required",
    }),
    hospital_name: z.string().min(1, "Hospital name is required"),
    city: z.string().min(1, "City is required"),
    country: z.string().min(1, "Country is required"),
    currently_working: z.boolean(),
    start_date: z.string({
      required_error: "Start date is required",
    }),
    end_date: z.union([z.string(), z.literal("Present")]),
  })
  .refine(
    (data) => {
      if (!data.currently_working && data.end_date === "Present") {
        return false;
      }
      if (
        new Date(data.start_date) > new Date() &&
        data.end_date !== "Present"
      ) {
        return false;
      }
      return true;
    },
    {
      message: "Start date cannot be after end date",
      path: ["start_date"],
    }
  )
  .refine(
    (data) => {
      if (data.currently_working && new Date(data.start_date) >= new Date()) {
        return false;
      }
      return true;
    },
    {
      message: "Start date cannot be of present or future",
      path: ["start_date"],
    }
  );
