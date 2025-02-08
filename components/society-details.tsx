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

  const { fields: buildingFields } = useFieldArray({
    control,
    name: "buildings",
  });

  const { fields: memberFields } = useFieldArray({
    control,
    name: "members",
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
      <div>
        <label>Society Name</label>
        <input {...register("name")} className="input-field" />
        {errors.name && <p className="error">{errors.name.message}</p>}
      </div>

      <div>
        <label>Society Number</label>
        <input {...register("societyNumber")} className="input-field" />
        {errors.societyNumber && (
          <p className="error">{errors.societyNumber.message}</p>
        )}
      </div>

      <div>
        <label>Address</label>
        <input {...register("address")} className="input-field" />
        {errors.address && <p className="error">{errors.address.message}</p>}
      </div>

      <div>
        <label>Pin Code</label>
        <input {...register("pinCode")} className="input-field" />
        {errors.pinCode && <p className="error">{errors.pinCode.message}</p>}
      </div>

      <div>
        <label>Email</label>
        <input {...register("email")} className="input-field" />
        {errors.email && <p className="error">{errors.email.message}</p>}
      </div>

      <div>
        <label>Phone</label>
        <input {...register("phone")} className="input-field" />
        {errors.phone && <p className="error">{errors.phone.message}</p>}
      </div>

      <div>
        <label>Logo URL</label>
        <input {...register("logo")} className="input-field" />
        {errors.logo && <p className="error">{errors.logo.message}</p>}
      </div>

      <div>
        <label>Buildings</label>
        {buildingFields.map((building, index) => (
          <div key={building.id}>
            <input
              {...register(`buildings.${index}.name`)}
              className="input-field"
              placeholder="Building Name"
            />
            {errors.buildings?.[index]?.name && (
              <p className="error">{errors.buildings[index]?.name?.message}</p>
            )}
          </div>
        ))}
      </div>

      <div>
        <label>Members</label>
        {memberFields.map((member, index) => (
          <div key={member.id}>
            <input
              {...register(`members.${index}.name`)}
              className="input-field"
              placeholder="Member Name"
            />
            {errors.members?.[index]?.name && (
              <p className="error">{errors.members[index]?.name?.message}</p>
            )}
          </div>
        ))}
      </div>

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
      <Card key={society.id} className="pr-20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-medium">
            <p>
              <strong>Name:</strong> {society.name}
            </p>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-lg">
          <p>
            <strong>Society No.:</strong> {society.societyNumber}
          </p>
          <p>
            <strong>Email:</strong> {society.email}
          </p>
          <p>
            <strong>Phone No.:</strong> {society.phone}
          </p>
          <p>
            <strong>Address:</strong> {society.address}
          </p>
          <p>
            <strong>Pin Code:</strong> {society.pinCode}
          </p>
          <p>
            <strong>Logo:</strong> {society.logo}
          </p>
          <p>
            <strong>Buildings:</strong>
            {society.buildings?.map((building) => (
              <div key={building.id}>
                <p>{building.name}</p>
              </div>
            ))}
          </p>
          <p>
            <strong>Members:</strong>
            {society.members?.map((member) => (
              <div key={member.id}>
                <p>{member.name}</p>
              </div>
            ))}
          </p>
        </CardContent>
      </Card>
      <Button onClick={() => setIsEditing(true)}>Edit Details</Button>
    </div>
  );
}