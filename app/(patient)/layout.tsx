// /**
//  * v0 by Vercel.
//  * @see https://v0.dev/t/jjqobBeCwuJ
//  * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
//  */
// import { Input } from "@/components/ui/input";
// import Link from "next/link";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { Switch } from "@/components/ui/switch";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import {
//   Card,
//   CardHeader,
//   CardTitle,
//   CardDescription,
//   CardContent,
//   CardFooter,
// } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import {
//   Popover,
//   PopoverTrigger,
//   PopoverContent,
// } from "@/components/ui/popover";
// import { Calendar } from "@/components/ui/calendar";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";

// export default function Component() {
//   return (
//     <div className="flex min-h-screen">
//       <aside className="w-64 p-4 border-r">
//         <div className="flex items-center mb-6">
//           <LogInIcon className="w-8 h-8 mr-2" />
//           <h1 className="text-2xl font-bold">EasyDoc</h1>
//         </div>
//         <div className="mb-6">
//           <Input placeholder="Search" />
//         </div>
//         <nav className="space-y-2">
//           <Link
//             href="#"
//             className="block py-2 text-lg font-semibold"
//             prefetch={false}
//           >
//             Overview
//           </Link>
//           <Link
//             href="#"
//             className="block py-2 text-muted-foreground"
//             prefetch={false}
//           >
//             Patient's Requests
//           </Link>
//           <Link
//             href="#"
//             className="block py-2 text-muted-foreground"
//             prefetch={false}
//           >
//             Appointment
//           </Link>
//           <Link
//             href="#"
//             className="block py-2 text-muted-foreground"
//             prefetch={false}
//           >
//             Available Timings
//           </Link>
//           <Link
//             href="#"
//             className="block py-2 text-muted-foreground"
//             prefetch={false}
//           >
//             My Patients
//           </Link>
//           <Link
//             href="#"
//             className="block py-2 text-muted-foreground"
//             prefetch={false}
//           >
//             Specialities & Services
//           </Link>
//           <Link
//             href="#"
//             className="block py-2 text-muted-foreground"
//             prefetch={false}
//           >
//             Patient's Reviews
//           </Link>
//           <Link
//             href="#"
//             className="block py-2 text-muted-foreground"
//             prefetch={false}
//           >
//             Messages
//           </Link>
//           <Link
//             href="#"
//             className="block py-2 text-muted-foreground"
//             prefetch={false}
//           >
//             Report Settings
//           </Link>
//           <Link
//             href="#"
//             className="block py-2 text-muted-foreground"
//             prefetch={false}
//           >
//             Blogs
//           </Link>
//         </nav>
//         <div className="mt-auto">
//           <Link
//             href="#"
//             className="block py-2 text-muted-foreground"
//             prefetch={false}
//           >
//             FAQ & Support
//           </Link>
//           <Link
//             href="#"
//             className="block py-2 text-muted-foreground"
//             prefetch={false}
//           >
//             Profile Settings
//           </Link>
//           <div className="flex items-center mt-6">
//             <Avatar>
//               <AvatarImage src="/placeholder-user.jpg" alt="User" />
//               <AvatarFallback>OR</AvatarFallback>
//             </Avatar>
//             <div className="ml-2">
//               <p className="text-sm font-medium">Olivia Rhye</p>
//               <p className="text-xs text-muted-foreground">
//                 olivia@untitledui.com
//               </p>
//             </div>
//           </div>
//         </div>
//       </aside>
//       <main className="flex-1 p-6">
//         <header className="flex items-center justify-between mb-6">
//           <h2 className="text-3xl font-bold">Dashboard</h2>
//           <div className="flex items-center space-x-4">
//             <Button variant="ghost" size="icon">
//               <BellIcon className="w-6 h-6" />
//             </Button>
//             <Button variant="ghost" size="icon">
//               <UserIcon className="w-6 h-6" />
//             </Button>
//           </div>
//         </header>
//         <section>
//           <div className="flex items-center justify-between mb-6">
//             <h3 className="text-2xl font-semibold">Profile Settings</h3>
//             <div className="flex items-center space-x-2">
//               <span className="text-sm">Online</span>
//               <Switch id="online" />
//             </div>
//           </div>
//           <Tabs defaultValue="basic-details">
//             <TabsList className="mb-6">
//               <TabsTrigger value="basic-details">Basic Details</TabsTrigger>
//               <TabsTrigger value="experience">Experience</TabsTrigger>
//               <TabsTrigger value="education">Education</TabsTrigger>
//               <TabsTrigger value="awards">Awards</TabsTrigger>
//             </TabsList>
//             <TabsContent value="basic-details">
//               <Card>
//                 <CardHeader>
//                   <CardTitle>Profile Picture</CardTitle>
//                   <CardDescription>
//                     This will be shared to our platform
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="flex items-center space-x-4">
//                     <div className="w-24 h-24 border rounded-md bg-muted" />
//                     <Button>Upload Image</Button>
//                   </div>
//                 </CardContent>
//               </Card>
//               <Card className="mt-6">
//                 <CardHeader>
//                   <CardTitle>Personal Details</CardTitle>
//                   <CardDescription>
//                     This will be shared to our platform
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="grid grid-cols-2 gap-4">
//                     <div className="space-y-2">
//                       <Label htmlFor="first-name">First name</Label>
//                       <Input
//                         id="first-name"
//                         placeholder="Enter your first name"
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor="last-name">Last name</Label>
//                       <Input
//                         id="last-name"
//                         placeholder="Enter your last name"
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor="display-name">Display name</Label>
//                       <Input
//                         id="display-name"
//                         placeholder="Enter your display name"
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor="dob">Date of Birth</Label>
//                       <Popover>
//                         <PopoverTrigger asChild>
//                           <Button
//                             variant="outline"
//                             className="pl-3 text-left font-normal text-muted-foreground"
//                           >
//                             Pick a date
//                             <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
//                           </Button>
//                         </PopoverTrigger>
//                         <PopoverContent className="w-auto p-0" align="start">
//                           <Calendar mode="single" />
//                         </PopoverContent>
//                       </Popover>
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor="gender">Gender</Label>
//                       <Select>
//                         <SelectTrigger id="gender">
//                           <SelectValue placeholder="Select" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="male">Male</SelectItem>
//                           <SelectItem value="female">Female</SelectItem>
//                           <SelectItem value="other">Other</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor="designation">Designation</Label>
//                       <Input
//                         id="designation"
//                         placeholder="Enter your designation"
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor="email">Email Address</Label>
//                       <Input
//                         id="email"
//                         placeholder="Enter your email"
//                         type="email"
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor="contact">Contact no</Label>
//                       <Input id="contact" placeholder="Enter your contact no" />
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor="country">Country</Label>
//                       <Input id="country" placeholder="Search country" />
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor="city">City</Label>
//                       <Input id="city" placeholder="Search city" />
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor="languages">Known Languages</Label>
//                       <Select>
//                         <SelectTrigger id="languages">
//                           <SelectValue placeholder="Select" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           <SelectItem value="english">English</SelectItem>
//                           <SelectItem value="spanish">Spanish</SelectItem>
//                           <SelectItem value="french">French</SelectItem>
//                           <SelectItem value="german">German</SelectItem>
//                         </SelectContent>
//                       </Select>
//                     </div>
//                     <div className="col-span-2 space-y-2">
//                       <Label htmlFor="bio">Bio</Label>
//                       <Textarea
//                         id="bio"
//                         placeholder="Enter Bio"
//                         className="min-h-[100px]"
//                       />
//                     </div>
//                   </div>
//                 </CardContent>
//                 <CardFooter className="flex justify-end space-x-2">
//                   <Button variant="ghost">Cancel</Button>
//                   <Button>Save Changes</Button>
//                 </CardFooter>
//               </Card>
//             </TabsContent>
//           </Tabs>
//         </section>
//       </main>
//     </div>
//   );
// }

// function BellIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
//       <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
//     </svg>
//   );
// }

// function CalendarIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M8 2v4" />
//       <path d="M16 2v4" />
//       <rect width="18" height="18" x="3" y="4" rx="2" />
//       <path d="M3 10h18" />
//     </svg>
//   );
// }

// function LogInIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
//       <polyline points="10 17 15 12 10 7" />
//       <line x1="15" x2="3" y1="12" y2="12" />
//     </svg>
//   );
// }

// function UserIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
//       <circle cx="12" cy="7" r="4" />
//     </svg>
//   );
// }
