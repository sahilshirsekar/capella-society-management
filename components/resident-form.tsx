// 'use client'

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { toast } from "react-hot-toast";
// import * as z from "zod";

// const residentSchema = z.object({
//   name: z.string().min(2, "Name must be at least 2 characters"),
//   email: z.string().email("Invalid email format"),
//   phone: z.string().max(10, "Phone number must be 10 digits"),
//   societyId: z.string().cuid("Invalid Society ID format"),
//   roomId: z.string().cuid("Invalid Room ID format"),
// });

// type ResidentInput = z.infer<typeof residentSchema>;

// export default function ResidentForm() {
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     watch,
//     formState: { errors },
//   } = useForm<ResidentInput>({ resolver: zodResolver(residentSchema) });

//   const [roomNumber, setRoomNumber] = useState("");

//   const fetchRoomNumber = async (roomId: string) => {
//     if (!roomId) return;
//     try {
//       const res = await fetch(`/api/room/${roomId}`);
//       if (!res.ok) throw new Error("Room not found");
//       const data = await res.json();
//       setRoomNumber(data.number);
//     } catch (error) {
//       setRoomNumber("Not Found");
//       toast.error("Invalid Room ID");
//     }
//   };

//   const onSubmit = async (data: ResidentInput) => {
//     try {
//       const response = await fetch("/api/resident", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
//       });
//       const result = await response.json();
//       if (response.ok) {
//         toast.success("Resident created successfully");
//       } else {
//         toast.error(result.message || "Error creating resident");
//       }
//     } catch (error) {
//       toast.error("Something went wrong");
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg ">
//       <h2 className="text-2xl font-semibold mb-4 mx-52">Add Resident</h2>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <div className="mb-4">
//           <label className="block text-lg font-medium text-[#613EEA] ">Name</label>
//           <input {...register("name")} className=" w-full p-2 border rounded" />
//           {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
//         </div>

//         <div className="mb-4">
//           <label className="block text-lg font-medium text-[#613EEA]">Email</label>
//           <input {...register("email")} type="email" className="w-full p-2 border rounded" />
//           {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
//         </div>

//         <div className="mb-4">
//           <label className="block text-lg font-medium text-[#613EEA]">Phone</label>
//           <input {...register("phone")} className="w-full p-2 border rounded" />
//           {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
//         </div>

//         <div className="mb-4">
//           <label className="block text-lg font-medium text-[#613EEA]">Society ID</label>
//           <input {...register("societyId")} className="w-full p-2 border rounded" />
//           {errors.societyId && <p className="text-red-500 text-sm">{errors.societyId.message}</p>}
//         </div>

//         <div className="mb-4">
//           <label className="block text-lg font-medium text-[#613EEA]">Room ID</label>
//           <input
//             {...register("roomId")}
//             className="w-full p-2 border rounded"
//             onBlur={(e) => fetchRoomNumber(e.target.value)}
//           />
//           {errors.roomId && <p className="text-red-500 text-sm">{errors.roomId.message}</p>}
//         </div>

//         {roomNumber && (
//           <div className="mb-4 p-2 bg-gray-100 rounded">
//             <span className="text-sm font-medium text-[#613EEA]">Room Number:</span> {roomNumber}
//           </div>
//         )}

//         <button type="submit" className="w-full bg-customBg text-white p-2 rounded">
//           Submit
//         </button>
//       </form>
//     </div>
//   );
// }


// // 'use client';

// // import { useState } from "react";
// // import { useForm } from "react-hook-form";
// // import { zodResolver } from "@hookform/resolvers/zod";
// // import { toast } from "react-hot-toast";
// // import * as z from "zod";

// // const societySchema = z.object({
// //   societyId: z.string().min(3, "Society ID is required"),
// //   societyName: z.string().min(3, "Society name is required"),
// // });

// // const residentSchema = z.object({
// //   name: z.string().min(2, "Name must be at least 2 characters"),
// //   email: z.string().email("Invalid email format"),
// //   phone: z.string().min(10, "Phone number must be at least 10 digits"),
// //   roomId: z.string().min(3, "Invalid Room ID"),
// // });

// // type SocietyInput = z.infer<typeof societySchema>;
// // type ResidentInput = z.infer<typeof residentSchema>;

// // export default function ResidentForm() {
// //   const [rooms, setRooms] = useState([]);
// //   const [selectedRoom, setSelectedRoom] = useState(null);

// //   const {
// //     register: registerSociety,
// //     handleSubmit: handleSocietySubmit,
// //     formState: { errors: societyErrors },
// //   } = useForm<SocietyInput>({ resolver: zodResolver(societySchema) });

// //   const {
// //     register: registerResident,
// //     handleSubmit: handleResidentSubmit,
// //     reset,
// //     formState: { errors: residentErrors },
// //   } = useForm<ResidentInput>({ resolver: zodResolver(residentSchema) });

// //   const fetchRooms = async (data: SocietyInput) => {
// //     try {
// //       const res = await fetch(`/api/society/${data.societyId}/rooms`);
// //       if (!res.ok) throw new Error("Failed to fetch rooms");
// //       const roomsData = await res.json();
// //       setRooms(roomsData);
// //       toast.success("Rooms loaded successfully");
// //     } catch (error) {
// //       toast.error(error.message);
// //     }
// //   };

// //   const createResident = async (data: ResidentInput) => {
// //     try {
// //       const res = await fetch("/api/resident", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(data),
// //       });
// //       const result = await res.json();
// //       if (res.ok) {
// //         toast.success("Resident added successfully");
// //         reset();
// //       } else {
// //         toast.error(result.message || "Failed to add resident");
// //       }
// //     } catch (error) {
// //       toast.error("Something went wrong");
// //     }
// //   };

// //   return (
// //     <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
// //       <h2 className="text-2xl font-semibold mb-4">Add Residents</h2>
      
// //       {/* Society Form */}
// //       <form onSubmit={handleSocietySubmit(fetchRooms)} className="mb-6">
// //         <div className="mb-4">
// //           <label className="block text-sm font-medium">Society ID</label>
// //           <input {...registerSociety("societyId")} className="w-full p-2 border rounded" />
// //           {societyErrors.societyId && <p className="text-red-500 text-sm">{societyErrors.societyId.message}</p>}
// //         </div>

// //         <div className="mb-4">
// //           <label className="block text-sm font-medium">Society Name</label>
// //           <input {...registerSociety("societyName")} className="w-full p-2 border rounded" />
// //           {societyErrors.societyName && <p className="text-red-500 text-sm">{societyErrors.societyName.message}</p>}
// //         </div>

// //         <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">Fetch Rooms</button>
// //       </form>

// //       {/* Room List */}
// //       {rooms.length > 0 && (
// //         <div className="mb-6">
// //           <h3 className="text-xl font-semibold mb-2">Available Rooms</h3>
// //           <ul className="space-y-2">
// //             {rooms.map((room : any) => (
// //               <li key={room.id} className="p-3 bg-gray-100 rounded cursor-pointer hover:bg-gray-200" onClick={() => setSelectedRoom(room)}>
// //                 <strong>Building:</strong> {room.floor.building}, <strong>Floor:</strong> {room.floor}, <strong>Room:</strong> {room.number}
// //               </li>
// //             ))}
// //           </ul>
// //         </div>
// //       )}

// //       {/* Resident Form */}
// //       {selectedRoom && (
// //         <form onSubmit={handleResidentSubmit(createResident)}>
// //           <h3 className="text-xl font-semibold mb-4">Add Resident for Room {selectedRoom.number}</h3>
// //           <input type="hidden" {...registerResident("roomId")} value={selectedRoom.id} />

// //           <div className="mb-4">
// //             <label className="block text-sm font-medium">Name</label>
// //             <input {...registerResident("name")} className="w-full p-2 border rounded" />
// //             {residentErrors.name && <p className="text-red-500 text-sm">{residentErrors.name.message}</p>}
// //           </div>

// //           <div className="mb-4">
// //             <label className="block text-sm font-medium">Email</label>
// //             <input {...registerResident("email")} className="w-full p-2 border rounded" />
// //             {residentErrors.email && <p className="text-red-500 text-sm">{residentErrors.email.message}</p>}
// //           </div>

// //           <div className="mb-4">
// //             <label className="block text-sm font-medium">Phone</label>
// //             <input {...registerResident("phone")} className="w-full p-2 border rounded" />
// //             {residentErrors.phone && <p className="text-red-500 text-sm">{residentErrors.phone.message}</p>}
// //           </div>

// //           <button type="submit" className="w-full bg-green-600 text-white p-2 rounded">Add Resident</button>
// //         </form>
// //       )}
// //     </div>
// //   );
// // }


'use client'
import { useState, useEffect } from "react";
import axios from "axios";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";

// Define TypeScript interfaces
interface Room {
  id: string;
  number: string;
}

interface Floor {
  number: string;
  rooms: Room[];
}

interface Building {
  id: string;
  floors: Floor[];
}

// Define Zod schema for form validation
const residentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  societyId: z.string().optional(),
  roomId: z.string().min(1, "Room ID is required"),
});

type ResidentFormData = z.infer<typeof residentSchema>;

export default function ResidentForm() {
  const [buildingId, setBuildingId] = useState<string>("");
  const [building, setBuilding] = useState<Building | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!buildingId) {
      setBuilding(null);
      return;
    }

    const fetchBuildingData = async () => {
      try {
        setError(null);
        const response = await axios.get<Building>(`/api/building/${buildingId}`);
        console.log(response)
        setBuilding(response.data);
      } catch (err) {
        setError("Error loading data.");
        setBuilding(null);
      }
    };

    fetchBuildingData();
  }, [buildingId]);

  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<ResidentFormData>({
    resolver: zodResolver(residentSchema),
  });

  const onSubmit = async (data: ResidentFormData) => {
    try {
      await axios.post("/api/resident", data);
      alert("Resident created successfully!");
      setIsModalOpen(false);
      reset();
    } catch (error : any) {
      alert(error.response?.data?.message || "Error creating resident");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Society Resident</h1>
      <Input
        placeholder="Enter Building ID"
        value={buildingId}
        onChange={(e) => setBuildingId(e.target.value)}
      />
      {error && <p className="text-red-500">{error}</p>}
      {building && (
        <div>
          <h2 className="mt-4 text-lg font-semibold">
            Total Rooms: {building.floors.reduce((acc, floor) => acc + floor.rooms.length, 0)}
          </h2>
          {building.floors.map((floor) =>
            floor.rooms.map((room) => (
              <div key={room.id} className="p-2 border mt-2">
                <p>Floor Number: {floor.number}</p>
                <p>Room Number: {room.number}</p>
                <Button
                  onClick={() => {
                    setValue("roomId", room.id);
                    setIsModalOpen(true);
                  }}
                >
                  Create Resident
                </Button>
              </div>
            ))
          )}
        </div>
      )}

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Resident</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
            <Input placeholder="Name" {...register("name")} />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}

            <Input type="email" placeholder="Email" {...register("email")} />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}

            <Input placeholder="Phone" {...register("phone")} />
            {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}

            <Button type="submit" className="mt-2">Submit</Button>
            <DialogClose asChild>
              <Button variant="outline" className="mt-2">Cancel</Button>
            </DialogClose>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
