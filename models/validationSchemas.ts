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
const genderEnum = z.enum(["male", "female", "other", "N/D"]);

// Define EMPLOYMENT_TYPE Enum
const employmentTypeEnum = z.enum(["fulltime", "parttime", "contract"]);

// Define AvailableSlot Schema
const availableSlotSchema = z
  .object({
    startTime: z
      .string()
      .refine((time) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(time), {
        message: "Invalid start time format (expected HH:mm)",
      }),
    endTime: z
      .string()
      .refine((time) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(time), {
        message: "Invalid end time format (expected HH:mm)",
      }),
  })
  .refine(
    (data) =>
      new Date(`1970-01-01T${data.startTime}:00`) <
      new Date(`1970-01-01T${data.endTime}:00`),
    {
      message: "Start time must be before end time",
      path: ["startTime"],
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
  name: z.string().min(1, "Reviewer name is required"),
  date: z.string(),
  rating: z.number().min(1).max(5),
  comment: z.string().optional(),
});

// Define User Schema
const userSchema = z.object({
  userId: z.string().min(1, "User ID is required").optional(),
  role: z.string().min(1, "Role is required").optional(),
  email: z.string().email("Invalid email address").optional(),
  given_name: z.string().min(1, "Given name is required").optional(),
  family_name: z.string().min(1, "Family name is required").optional(),
  display_name: z.string().min(1, "Display name is required").optional(),
  phone_number: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number").optional(),
  picture: z.string().url("Invalid URL").optional(),
  designation: z.string().min(1, "Designation is required").optional(),
  bio: z
    .string()
    .max(500, "Bio cannot be longer than 500 characters")
    .optional().optional(),
  years_of_experience: z
    .string()
    .refine((val) => !isNaN(parseInt(val)) && parseInt(val) >= 0, {
      message: "Years of experience must be a non-negative number",
    }).optional(),
  city: z.string().min(1, "City is required").optional(),
  country: z.string().min(1, "Country is required").optional(),
  dob: z.string().refine((val) => new Date(val) <= new Date(), {
    message: "Date of birth cannot be in the future",
  }).optional(),
  gender: genderEnum.optional(),
  specialty: z.string().min(1, "Specialty is required").optional(),
  location: z.string().min(1, "Location is required").optional(),
  rating: z.number().min(0).max(5, "Rating must be between 0 and 5").optional(),
  available: z.boolean().optional(),
  verified: z.number().min(0, "Verified must be a non-negative number").optional(),
  fee: z.number().min(0, "Fee must be a non-negative number").optional(),
  languages: z.array(z.string().min(1, "Languages are required")).optional(),
  experiences: z.array(experienceSchema).optional(),
  awards: z.array(awardSchema).optional(),
  education: z.array(educationSchema).optional(),
  availableDays: z.array(availableDaySchema).optional(),
  reviews: z.array(reviewSchema).optional(),
});

export type experienceSchemaType = z.infer<typeof experienceSchema>;
export type awardSchemaType = z.infer<typeof awardSchema>;
export type educationSchemaType = z.infer<typeof educationSchema>;
export type reviewSchemaType = z.infer<typeof reviewSchema>;
export type availableDaySchemaType = z.infer<typeof availableDaySchema>;
export type employmentTypeEnum = "Full-time" | "Part-time" | "Contract";
export type genderEnum = "Male" | "Female" | "Other";
export type weekDayEnum = "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday";
export type availableSlotSchemaType = z.infer<typeof availableSlotSchema>;
export type userSchemaType = z.infer<typeof userSchema>;


export {
  userSchema,
  genderEnum,
  weekDayEnum,
  availableSlotSchema,
  experienceSchema,
  awardSchema,
  educationSchema,
  reviewSchema,
  availableDaySchema,
  employmentTypeEnum,
};
