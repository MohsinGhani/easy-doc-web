import { Appointment } from "@/types/appointment";

const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const dummyAppointments: Appointment[] = Array.from({ length: 500 }, (_, i) => {
  const appointmentDate = new Date();
  appointmentDate.setDate(appointmentDate.getDate() + getRandomInt(1, 365)); // Random date within the next year

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const randomMonth = months[appointmentDate.getMonth()];

  return {
    id: i + 1,
    date: appointmentDate.toISOString().split("T")[0],
    age: getRandomInt(20, 70).toString(),
    time: `${getRandomInt(8, 11)}:${getRandomInt(0, 59)
      .toString()
      .padStart(2, "0")} am - ${getRandomInt(12, 5)}:${getRandomInt(0, 59)
      .toString()
      .padStart(2, "0")} pm`,
    patientName: `Patient ${i + 1}`,
    issue: [
      "Headache",
      "Back Pain",
      "Fever",
      "Cough",
      "Flu",
      "Allergies",
      "Diabetes",
    ][getRandomInt(0, 6)],
    location: [
      "New York, USA",
      "Los Angeles, USA",
      "Chicago, USA",
      "Houston, USA",
      "Phoenix, USA",
    ][getRandomInt(0, 4)],
    bloodGroup: ["O+", "A+", "B+", "AB+", "O-", "A-", "B-", "AB-"][
      getRandomInt(0, 7)
    ],
    height: `${getRandomInt(150, 200)}cm`,
    weight: `${getRandomInt(50, 100)}kg`,
    speciality: [
      "Dermatologist",
      "General Physician",
      "Orthopedic",
      "Pulmonologist",
      "Allergist",
    ][getRandomInt(0, 4)],
    consultationType: [
      "Check-up",
      "Acne Treatment",
      "Lung Function Test",
      "Physical Therapy",
      "Allergy Test",
    ][getRandomInt(0, 4)],
    appointmentDate: `${getRandomInt(
      1,
      28
    )}th ${randomMonth} ${appointmentDate.getFullYear()}`,
    appointmentTime: `${getRandomInt(8, 11)}:${getRandomInt(0, 59)
      .toString()
      .padStart(2, "0")} am`,
    allergies: [
      "Aspirin",
      "Penicillin",
      "Dust Mites",
      "Pollen",
      "Peanuts",
      "None",
    ].slice(0, getRandomInt(1, 3)),
  };
});

export default dummyAppointments;
