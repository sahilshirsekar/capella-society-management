"use client";

import { useState } from "react";
import {
  useForm,
  useFieldArray,
  type UseFormRegister,
  type Control,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

// Define Zod schemas
const roomSchema = z.object({
  id: z.string().optional(),
  number: z.string().min(1, "Room number is required"),
});

const floorSchema = z.object({
  id: z.string().optional(),
  number: z.string().min(1, "Floor number is required"),
  rooms: z.array(roomSchema).min(1, "At least one room is required"),
});

const buildingSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, "Building name must be at least 3 characters long"),
  floors: z.array(floorSchema).min(1, "At least one floor is required"),
});

const memberSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, "Member name must be at least 3 characters long"),
  email: z.string().email("Invalid email format"),
  phone: z.string().length(10, "Phone number must be exactly 10 digits"),
  role: z.enum([
    "PRESIDENT",
    "VICE_PRESIDENT",
    "TREASURER",
    "ASSISTANT_TREASURER",
    "SECRETARY",
    "MEMBER",
  ]),
});

const societySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, "Society name must be at least 3 characters long"),
  societyNumber: z.string().min(3, "Society number is required"),
  address: z.string().min(5, "Address must be at least 5 characters long"),
  pinCode: z.string().length(6, "Pin Code must be exactly 6 digits"),
  email: z.string().email("Invalid email format"),
  phone: z.string().length(10, "Phone number must be exactly 10 digits"),
  logo: z.string().url("Invalid logo URL").optional(),
  buildings: z
    .array(buildingSchema)
    .min(1, "At least one building is required"),
  members: z
    .array(memberSchema)
    .min(5, "At least 5 committee members are required")
    .max(10, "Maximum 10 committee members allowed"),
});

// Infer types from Zod schemas
type Society = z.infer<typeof societySchema>;

type SocietyDetailsProps = {
  society: Society;
  onUpdate: () => void;
};

export function SocietyDetails({ society, onUpdate }: SocietyDetailsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Society>({
    resolver: zodResolver(societySchema),
    defaultValues: society,
  });

  const onSubmit = async (data: Society) => {
    try {
      const response = await fetch(`/api/society/${society.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to update society");

      toast({
        title: "Society Updated Successfully!",
        className: "bg-green-500",
      });
      setIsEditing(false);
      onUpdate();
    } catch (error) {
      toast({
        title: "Failed to update society",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  return isEditing ? (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <input
        {...register("name")}
        className="input-field"
        placeholder="Society Name"
      />
      {errors.name && <p className="error">{errors.name.message}</p>}
      <div className="space-x-4">
        <Button type="submit">Save Changes</Button>
        <Button
          type="button"
          onClick={() => setIsEditing(false)}
          variant="outline"
        >
          Cancel
        </Button>
      </div>
    </form>
  ) : (
    <div className="space-y-8">
      <p>
        <strong>Name:</strong> {society.name}
      </p>
      <p>
        <strong>Society No. </strong>
        {society.societyNumber}
      </p>
      <Card key={society.id} className="pr-20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{society.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p> Society No. {society.societyNumber}</p>
          <p> Email: {society.email}</p>
          <p>Phone No. : {society.phone}</p>
        </CardContent>
      </Card>
      <Button onClick={() => setIsEditing(true)}>Edit Details</Button>
    </div>
  );
}
