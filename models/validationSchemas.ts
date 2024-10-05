import { parseTime } from "@/lib/utils";
import { z } from "zod";

// Define weekDay Enum
const weekDayEnum = z.enum([
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
]);

// Define Gender Enum
const genderEnum = z.enum(["Male", "Female", "Other", "N/D"]);

// Define EMPLOYMENT_TYPE Enum
const employmentTypeEnum = z.enum(["Full Time", "Part Time", "Contract"]);

// Define AvailableSlot Schema
const availableSlotSchema = z
  .object({
    start_time: z
      .string()
      .refine((time) => /^([01]?\d|2[0-3]):([0-5]\d)$/.test(time), {
        message: "Invalid start time format (expected HH:mm)",
      }),
    end_time: z
      .string()
      .refine((time) => /^([01]?\d|2[0-3]):([0-5]\d)$/.test(time), {
        message: "Invalid end time format (expected HH:mm)",
      }),
  })
  .refine(
    (data) => {
      const start = parseTime(data.start_time);
      const end = parseTime(data.end_time);
      return start < end;
    },
    {
      message: "Start time must be before end time",
      path: ["start_time"],
    }
  );

// Define AvailableDay Schema
const availableDaySchema = z.object({
  day: weekDayEnum,
  slots: z.array(availableSlotSchema),
});

// Define Experience Schema
const experienceSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    description: z.string().optional(),
    employment_type: employmentTypeEnum,
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
      if (new Date(data.start_date) > new Date(data.end_date)) {
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
      message: "Start date cannot be in the present or future",
      path: ["start_date"],
    }
  );

// Define Award Schema
const awardSchema = z.object({
  award_name: z.string().min(1, "Award name is required"),
  description: z.string().optional(),
  institute: z.string().min(1, "Institute name is required"),
  year: z
    .string()
    .refine(
      (year) => new Date(year).getFullYear() <= new Date().getFullYear(),
      {
        message: "Year cannot be in the future",
      }
    ),
});

// Define Education Schema
const educationSchema = z
  .object({
    degree_name: z.string().min(1, "Degree name is required"),
    field: z.string().min(1, "Field of study is required"),
    description: z.string().optional(),
    institute: z.string().min(1, "Institute is required"),
    start_date: z.string({
      required_error: "Start date is required",
    }),
    end_date: z.union([z.string(), z.literal("Present")]),
    currently_studying: z.boolean(),
    grade: z.string().optional(),
  })
  .refine(
    (data) => {
      if (!data.currently_studying && data.end_date === "Present") {
        return false;
      }
      if (new Date(data.start_date) >= new Date(data.end_date)) {
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
      if (data.currently_studying && new Date(data.start_date) >= new Date()) {
        return false;
      }
      return true;
    },
    {
      message: "Start date cannot be in the present or future",
      path: ["start_date"],
    }
  )
  .refine(
    (data) => {
      if (data.currently_studying && data.grade && data.grade !== "NO GRADE") {
        return false;
      }
      return true;
    },
    {
      message: "Grade cannot be provided for currently studying individuals",
      path: ["grade"],
    }
  );

// Define Review Schema
const reviewSchema = z.object({
  first_name: z.string().min(1, "Reviewer first name is required"),
  last_name: z.string().min(1, "Reviewer last name is required"),
  rating: z.number().min(1).max(5),
  comment: z.string().optional(),
});

// Define Doctor Schema
const doctorSchema = z.object({
  email: z.string().email("Invalid email address").optional(),
  given_name: z.string().min(1, "Given name is required").optional(),
  family_name: z.string().min(1, "Family name is required").optional(),
  display_name: z.string().min(1, "Display name is required").optional(),
  phone_number: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number")
    .optional(),
  picture: z.string().url("Invalid URL").optional(),
  designation: z.string().min(1, "Designation is required").optional(),
  bio: z
    .string()
    .max(500, "Bio cannot be longer than 500 characters")
    .optional()
    .optional(),
  years_of_experience: z.string().refine(
    (val) => {
      return parseFloat(val) > 0 && parseFloat(val) <= 50;
    },
    {
      message: "Years of experience must be greater than or equal to 1",
    }
  ),
  city: z.string().min(1, "City is required").optional(),
  country: z.string().min(1, "Country is required").optional(),
  dob: z
    .string()
    .refine((val) => new Date(val) <= new Date(), {
      message: "Date of birth cannot be in the future",
    })
    .refine((val) => new Date(val) >= new Date("1900-01-01"), {
      message: "Date of birth cannot be before 1900",
    })
    .refine(
      (val) => new Date().getFullYear() - new Date(val).getFullYear() >= 18,
      {
        message: "User must be at least 18 years old",
      }
    )
    .optional(),
  gender: genderEnum.optional(),
  available: z.boolean().optional(),
  languages: z.array(z.string().min(1, "Languages are required")).optional(),
  experiences: z.array(experienceSchema).optional(),
  awards: z.array(awardSchema).optional(),
  education: z.array(educationSchema).optional(),
  reviews: z.array(reviewSchema).optional(),
  available_days: z.array(availableDaySchema).optional(),
});

// Define User's services Schema
const serviceSchema = z.object({
  speciality: z.string().min(1, "Speciality name is required"),
  service: z.string().min(1, "Service name is required"),
  fee: z.string().refine(
    (val) => {
      return parseFloat(val) > 0;
    },
    {
      message: "Fee must be greater than 0",
    }
  ),
  description: z.string(),
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Define Patient Schema
const patientSchema = z.object({
  email: z.string().email("Invalid email address").optional(),
  given_name: z.string().min(1, "Given name is required").optional(),
  family_name: z.string().min(1, "Family name is required").optional(),
  display_name: z.string().min(1, "Display name is required").optional(),

  phone_number: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number")
    .optional(),
  picture: z.string().url("Invalid URL").optional(),
  bio: z
    .string()
    .max(500, "Bio cannot be longer than 500 characters")
    .optional(),
  city: z.string().min(1, "City is required").optional(),
  country: z.string().min(1, "Country is required").optional(),
  dob: z
    .string()
    .refine((val) => new Date(val) <= new Date(), {
      message: "Date of birth cannot be in the future",
    })
    .refine((val) => new Date(val) >= new Date("1900-01-01"), {
      message: "Date of birth cannot be before 1900",
    })
    .refine(
      (val) => new Date().getFullYear() - new Date(val).getFullYear() >= 18,
      {
        message: "User must be at least 18 years old",
      }
    )
    .optional(),
  blood_group: z.string({
    required_error: "Blood group is required",
  }),
  gender: genderEnum.optional(),
});

export type experienceSchemaType = z.infer<typeof experienceSchema>;
export type awardSchemaType = z.infer<typeof awardSchema>;
export type educationSchemaType = z.infer<typeof educationSchema>;
export type reviewSchemaType = z.infer<typeof reviewSchema>;
export type availableDaySchemaType = z.infer<typeof availableDaySchema>;
export type employmentTypeEnum = "Full-time" | "Part-time" | "Contract";
export type genderEnum = "Male" | "Female" | "Other";
export type weekDayEnum =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";
export type availableSlotSchemaType = z.infer<typeof availableSlotSchema>;
export type doctorSchemaType = z.infer<typeof doctorSchema>;
export type patientSchemaType = z.infer<typeof patientSchema>;
export type serviceSchemaType = z.infer<typeof serviceSchema>;

export {
  doctorSchema,
  genderEnum,
  weekDayEnum,
  availableSlotSchema,
  experienceSchema,
  awardSchema,
  educationSchema,
  reviewSchema,
  availableDaySchema,
  employmentTypeEnum,
  patientSchema,
  serviceSchema,
};
