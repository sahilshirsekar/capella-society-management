"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { toast, useToast } from "@/hooks/use-toast";
import { Skeleton } from "./ui/skeleton";

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
  societyId: string;
  floors: Floor[];
}

// Define Zod schema for form validation
const residentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  societyId: z.string().min(1, "Society ID is required"),
  roomId: z.string().min(1, "Room ID is required"),
});

type ResidentFormData = z.infer<typeof residentSchema>;

export default function ResidentForm() {
  const { toast } = useToast();
  const [buildingId, setBuildingId] = useState<string>("");
  const [building, setBuilding] = useState<Building | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [occupiedRooms, setOccupiedRooms] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false); 

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ResidentFormData>({
    resolver: zodResolver(residentSchema),
  });

  useEffect(() => {
    if (!buildingId) {
      setBuilding(null);
      return;
    }

    const fetchBuildingData = async () => {
      try {
        setError(null);
        setLoading(true); // Start loading
        const response = await axios.get<Building>(
          `/api/building/${buildingId}`
        );
        setBuilding(response.data);
        setValue("societyId", response.data.societyId);
      } catch (err) {
        setError("Error loading data.");
        setBuilding(null);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchBuildingData();
  }, [buildingId, setValue]);

  const onSubmit = async (data: ResidentFormData) => {
    try {
      const response = await axios.post("/api/resident", data);
      toast({
        title: response.data.message || "Resident created successfully!",
        className: "bg-green-500 text-white",
      });
      setOccupiedRooms((prev) => [...prev, data.roomId]);
      setIsModalOpen(false);
      reset();
    } catch (error: any) {
      toast({
        title: error.response?.data?.message || "Error creating resident",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Society Resident</h1>
      <Input
        placeholder="Enter Building Id"
        value={buildingId}
        className="w-72 p-5 m-5 justify-center"
        onChange={(e) => setBuildingId(e.target.value)}
      />
      {error && <p className="text-red-500">{error}</p>}

      {/* Show Skeleton while loading */}
      {loading ? (
        <div>
          <Skeleton className="mt-4 w-40 h-8 mb-2" />
          <Skeleton className="h-24 w-80 mb-2" />
          <Skeleton className="h-24 w-80 mb-2" />
          <Skeleton className="h-24 w-80 mb-2" />
          <Skeleton className="h-24 w-80 mb-2" />
          <Skeleton className="h-24 w-80 " />
        </div>
      ) : (
        building && (
          <div>
            <h2 className="mt-4 text-lg font-semibold">
              Total Rooms:{" "}
              {building.floors.reduce(
                (acc, floor) => acc + floor.rooms.length,
                0
              )}
            </h2>
            {building.floors.map((floor) =>
              floor.rooms.map((room) => (
                <div
                  key={room.id}
                  className={`p-2 border mt-2 rounded-xl ${
                    occupiedRooms.includes(room.id) ? "bg-green-400" : ""
                  }`}
                >
                  <p>Floor Number: {floor.number}</p>
                  <p>Room Number: {room.number}</p>
                  <Button
                    onClick={() => {
                      setValue("roomId", room.id);
                      setValue("societyId", building.societyId);
                      setIsModalOpen(true);
                    }}
                    className="bg-customBg hover:bg-hoverBg"
                  >
                    Create Resident
                  </Button>
                </div>
              ))
            )}
          </div>
        )
      )}

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Resident</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
            <div>
              <Input placeholder="Name" {...register("name")} />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div>
              <Input type="email" placeholder="Email" {...register("email")} />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <Input placeholder="Phone" {...register("phone")} />
              {errors.phone && (
                <p className="text-red-500">{errors.phone.message}</p>
              )}
            </div>

            <input type="hidden" {...register("societyId")} />
            <input type="hidden" {...register("roomId")} />

            <div className="flex justify-end space-x-2">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" className="bg-customBg hover:bg-hoverBg">
                Submit
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
