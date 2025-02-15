"use client";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { SocietyDetails } from "./society-details";

type Room = {
  number: string;
};

type Floor = {
  number: string;
  rooms: Room[];
};

type Building = {
  name: string;
  floors: Floor[];
};

type Role =
  | "PRESIDENT"
  | "VICE_PRESIDENT"
  | "TREASURER"
  | "ASSISTANT_TREASURER"
  | "SECRETARY"
  | "MEMBER";

type Member = {
  name: string;
  email: string;
  phone: string;
  role: Role;
};

type Society = {
  name: string;
  societyNumber: string;
  address: string;
  pinCode: string;
  email: string;
  phone: string;
  logo?: string;
  buildings: Building[];
  members: Member[];
};

// Define committee member roles
const memberRoles = [
  "PRESIDENT",
  "VICE_PRESIDENT",
  "TREASURER",
  "ASSISTANT_TREASURER",
  "SECRETARY",
  "MEMBER",
] as const;

// Zod validation schema
const societySchema = z.object({
  id: z.string().optional(),
  name: z.string().min(3, "Society name must be at least 3 characters long"),
  societyNumber: z.string().min(3, "Society number is required"),
  address: z.string().min(5, "Address must be at least 5 characters long"),
  pinCode: z.string().length(6, "Pin Code must be exactly 6 digits"),
  email: z.string().email("Invalid email format"),
  phone: z.string().length(10, "Phone number must be exactly 10 digits"),
  logo: z.string().url("Invalid logo URL").optional(),
  buildings: z.array(
    z.object({
      name: z.string(),
      floors: z.array(
        z.object({
          number: z.string(),
          rooms: z.array(z.object({ number: z.string() })),
        })
      ),
    })
  ),
  members: z
    .array(
      z.object({
        name: z
          .string()
          .min(3, "Member name must be at least 3 characters long"),
        email: z.string().email("Invalid email format"),
        phone: z.string().length(10, "Phone number must be exactly 10 digits"),
        role: z.enum(memberRoles),
      })
    )
    .min(5, "At least 5 committee members are required")
    .max(10, "Maximum 10 committee members allowed"),
});

export default function SocietyRegistration() {
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(societySchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      societyNumber: "",
      address: "",
      pinCode: "",
      email: "",
      phone: "",
      logo: "",
      buildings: [
        { name: "", floors: [{ number: "", rooms: [{ number: "" }] }] },
      ],
      members: [
        { name: "", email: "", phone: "", role: "PRESIDENT" as Role },
        { name: "", email: "", phone: "", role: "VICE_PRESIDENT" as Role },
        { name: "", email: "", phone: "", role: "TREASURER" as Role },
        { name: "", email: "", phone: "", role: "ASSISTANT_TREASURER" as Role },
        { name: "", email: "", phone: "", role: "SECRETARY" as Role },
      ],
    },
  });

  const buildings = watch("buildings");

  const addBuilding = (): void => {
    if (buildings.length < 10) {
      setValue("buildings", [
        ...buildings,
        { name: "", floors: [{ number: "", rooms: [{ number: "" }] }] },
      ]);
    }
  };

  const removeBuilding = (index: number): void => {
    if (buildings.length > 1) {
      setValue(
        "buildings",
        buildings.filter((_, i) => i !== index)
      );
    }
  };

  const addFloor = (buildingIndex: number): void => {
    setValue(`buildings.${buildingIndex}.floors`, [
      ...buildings[buildingIndex].floors,
      { number: "", rooms: [{ number: "" }] },
    ]);
  };

  const removeFloor = (buildingIndex: number, floorIndex: number): void => {
    if (buildings[buildingIndex].floors.length > 1) {
      setValue(
        `buildings.${buildingIndex}.floors`,
        buildings[buildingIndex].floors.filter((_, i) => i !== floorIndex)
      );
    }
  };

  const addRoom = (buildingIndex: number, floorIndex: number): void => {
    setValue(`buildings.${buildingIndex}.floors.${floorIndex}.rooms`, [
      ...buildings[buildingIndex].floors[floorIndex].rooms,
      { number: "" },
    ]);
  };

  const removeRoom = (
    buildingIndex: number,
    floorIndex: number,
    roomIndex: number
  ): void => {
    if (buildings[buildingIndex].floors[floorIndex].rooms.length > 1) {
      setValue(
        `buildings.${buildingIndex}.floors.${floorIndex}.rooms`,
        buildings[buildingIndex].floors[floorIndex].rooms.filter(
          (_, i) => i !== roomIndex
        )
      );
    }
  };

  const members = watch("members");

  const addMember = (): void => {
    if (members.length < 10) {
      setValue("members", [
        ...members,
        { name: "", email: "", phone: "", role: "MEMBER" },
      ]);
    }
  };

  const removeMember = (index: number): void => {
    if (members.length > 5) {
      setValue(
        "members",
        members.filter((_, i) => i !== index)
      );
    }
  };

  const [registeredSociety, setRegisteredSociety] = useState<Society | null>(
    null
  );

  async function getSociety() {
    try {
      const response = await fetch("/api/society");
      if (!response.ok) {
        throw new Error("Failed to fetch society");
      }
      const data: { societies: Society[] } = await response.json();
      setRegisteredSociety(data.societies[0]); // Assuming we're only dealing with one society
    } catch (error) {
      console.error("Error fetching society:", error);
      toast({
        title: "Failed to fetch society details",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  }

  useEffect(() => {
    getSociety();
  }, []);

  const onSubmit: SubmitHandler<Society> = async (data: Society) => {
    try {
      const formattedMembers = data.members.map((member) => ({
        ...member,
        role: member.role.toUpperCase() as Role,
      }));

      const formattedData = {
        ...data,
        members: formattedMembers,
      };

      const response = await fetch("/api/society", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
      });

      const result = await response.json();
      console.log(result);
      if (response.ok) {
        toast({
          title: "Society Registered Successfully!",
          description: "Login details have been sent to committee members.",
          className: "bg-green-500",
        });
        getSociety(); // Fetch the newly registered society
      } else {
        toast({
          title: "Registration Failed",
          description: result.message || "Something went wrong",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Failed to register society",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="max-w-3xl mx-auto p-8 bg-white shadow-2xl rounded-2xl">
        <h2 className="text-3xl font-bold text-center mb-6">
          {registeredSociety ? "Society Details" : "Society Registration"}
        </h2>

        {registeredSociety ? (
          <SocietyDetails society={registeredSociety} onUpdate={getSociety} />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* <input type="hidden" {...register("id")} className="input-field"/> */}
            <input
              {...register("name")}
              placeholder="Society Name"
              className="input-field"
            />
            {errors.name && <p className="error">{errors.name.message}</p>}
            <input
              {...register("societyNumber")}
              placeholder="Society Number"
              className="input-field"
            />
            {errors.societyNumber && (
              <p className="error">{errors.societyNumber.message}</p>
            )}

            <input
              {...register("address")}
              placeholder="Address"
              className="input-field"
            />
            {errors.address && (
              <p className="error">{errors.address.message}</p>
            )}

            <input
              {...register("pinCode")}
              placeholder="Pin Code"
              className="input-field"
            />
            {errors.pinCode && (
              <p className="error">{errors.pinCode.message}</p>
            )}

            <input
              {...register("email")}
              placeholder="Email"
              className="input-field"
            />
            {errors.email && <p className="error">{errors.email.message}</p>}

            <input
              {...register("phone")}
              placeholder="Phone"
              className="input-field"
            />
            {errors.phone && <p className="error">{errors.phone.message}</p>}
            <input
              {...register("logo")}
              placeholder="Logo URL"
              className="input-field"
            />
            {errors.logo && <p className="error">{errors.logo.message}</p>}

            <div>
              {buildings.map((building, buildingIndex) => (
                <motion.div
                  key={buildingIndex}
                  className="border p-4 rounded-lg bg-gray-100 shadow-md space-y-3 mb-4"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="font-semibold text-lg text-[#613EEA]">
                    Building No. : {buildingIndex + 1}
                  </h3>
                  <input
                    {...register(`buildings.${buildingIndex}.name`)}
                    placeholder="Building Name"
                    className="input-field"
                  />
                  {errors.buildings?.[buildingIndex]?.name && (
                    <p className="error">
                      {errors.buildings[buildingIndex].name?.message}
                    </p>
                  )}

                  {building.floors.map((floor, floorIndex) => (
                    <motion.div
                      key={floorIndex}
                      className="border p-3 rounded-lg bg-white shadow-sm space-y-2 mt-2"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h4 className="font-semibold  text-[#613EEA]">
                        Floor No. : {floorIndex + 1}
                      </h4>
                      <input
                        {...register(
                          `buildings.${buildingIndex}.floors.${floorIndex}.number`
                        )}
                        placeholder="Floor Number"
                        className="input-field"
                      />
                      {errors.buildings?.[buildingIndex]?.floors?.[floorIndex]
                        ?.number && (
                        <p className="error">
                          {
                            errors.buildings[buildingIndex].floors[floorIndex]
                              .number?.message
                          }
                        </p>
                      )}

                      {floor.rooms.map((room, roomIndex) => (
                        <motion.div
                          key={roomIndex}
                          className="flex items-center space-x-2"
                          initial={{ opacity: 0, x: 5 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.1 }}
                        >
                          <input
                            {...register(
                              `buildings.${buildingIndex}.floors.${floorIndex}.rooms.${roomIndex}.number`
                            )}
                            placeholder="Room Number"
                            className="input-field flex-grow"
                          />
                          {floor.rooms.length > 1 && (
                            <Button
                              type="button"
                              onClick={() =>
                                removeRoom(buildingIndex, floorIndex, roomIndex)
                              }
                              variant="destructive"
                              size="sm"
                            >
                              Remove Room
                            </Button>
                          )}
                        </motion.div>
                      ))}
                      <div className="space-x-5">
                        <Button
                          type="button"
                          onClick={() => addRoom(buildingIndex, floorIndex)}
                          size="sm"
                          className="mt-2 bg-customBg "
                        >
                          Add Room
                        </Button>

                        {building.floors.length > 1 && (
                          <Button
                            type="button"
                            onClick={() =>
                              removeFloor(buildingIndex, floorIndex)
                            }
                            variant="destructive"
                            size="sm"
                            className="mt-2"
                          >
                            Remove Floor
                          </Button>
                        )}
                      </div>
                    </motion.div>
                  ))}
                  <div className="space-x-5">
                    <Button
                      type="button"
                      onClick={() => addFloor(buildingIndex)}
                      size="sm"
                      className="mt-2"
                    >
                      Add Floor
                    </Button>

                    {buildingIndex >= 1 && (
                      <Button
                        type="button"
                        onClick={() => removeBuilding(buildingIndex)}
                        variant="destructive"
                        className="mt-2"
                      >
                        Remove Building
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
            {buildings.length < 10 && (
              <Button
                type="button"
                onClick={addBuilding}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Add Building
              </Button>
            )}

            <div>
              {members.map((member, index) => (
                <motion.div
                  key={index}
                  className="border p-4 rounded-lg bg-gray-100 shadow-md space-y-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="font-semibold text-lg text-[#613EEA]">
                    Committee Member {index + 1} (
                    {member.role.replace("_", " ")})
                  </h3>
                  <input
                    {...register(`members.${index}.name`)}
                    placeholder="Name"
                    className="input-field"
                  />
                  {errors.members?.[index]?.name && (
                    <p className="error">
                      {errors.members[index].name?.message}
                    </p>
                  )}

                  <input
                    {...register(`members.${index}.email`)}
                    placeholder="Email"
                    className="input-field"
                  />
                  {errors.members?.[index]?.email && (
                    <p className="error">
                      {errors.members[index].email?.message}
                    </p>
                  )}

                  <input
                    {...register(`members.${index}.phone`)}
                    placeholder="Phone"
                    className="input-field"
                  />
                  {errors.members?.[index]?.phone && (
                    <p className="error">
                      {errors.members[index].phone?.message}
                    </p>
                  )}

                  <Controller
                    name={`members.${index}.role`}
                    control={control}
                    render={({ field }) => (
                      <select {...field} className="input-field">
                        {memberRoles.map((role) => (
                          <option key={role} value={role}>
                            {role.replace("_", " ")}
                          </option>
                        ))}
                      </select>
                    )}
                  />

                  {index >= 5 && (
                    <Button
                      type="button"
                      onClick={() => removeMember(index)}
                      variant="destructive"
                    >
                      Remove
                    </Button>
                  )}
                </motion.div>
              ))}
            </div>

            {members.length < 10 && (
              <Button
                type="button"
                onClick={addMember}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Add Member
              </Button>
            )}

            <Button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600"
            >
              Register Society
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
