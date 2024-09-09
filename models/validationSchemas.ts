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
    time_period: z.object({
      from: z.date(),
      to: z.union([z.date(), z.literal("Present").optional()]), // Handle "Present"
    }),
  })
  .refine(
    (data) => {
      const { time_period, currently_working } = data;

      // If currently working, "to" must be "Present"
      if (currently_working && time_period.to !== "Present") {
        return false;
      }

      // If not currently working, "to" must be a valid date
      if (!currently_working && !(time_period.to instanceof Date)) {
        return false;
      }

      return true;
    },
    {
      message:
        'End date must be "Present" (current date) if currently working, or a valid date otherwise',
      path: ["time_period", "to"], // Attach the error to the "to" field
    }
  )
  .refine(
    (data) => {
      const { time_period, currently_working } = data;

      // Skip comparison if currently working
      if (currently_working) return true;

      // If not currently working, validate that "from" is before or equal to "to"
      const fromDate = time_period.from;
      const toDate = time_period.to;

      return fromDate <= toDate;
    },
    {
      message: "Start date must be before or equal to end date",
      path: ["time_period"],
    }
  );
