"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { toast, useToast } from "@/hooks/use-toast";

const memberRoles = [
  "PRESIDENT",
  "VICE_PRESIDENT",
  "TREASURER",
  "ASSISTANT_TREASURER",
  "SECRETARY",
  "MEMBER",
] as const;

const societySchema = z.object({
  name: z.string().min(3, "Society name must be at least 3 characters long"),
  address: z.string().min(5, "Address must be at least 5 characters long"),
  pinCode: z.string().length(6, "Pin Code must be exactly 6 digits"),
  email: z.string().email("Invalid email format"),
  phone: z.string().length(10, "Phone number must be exactly 10 digits"),
  logo: z.string().optional(),
  members: z
    .array(
      z.object({
        name: z.string().min(3, "Member name must be at least 3 characters long"),
        email: z.string().email("Invalid email format"),
        phone: z.string().length(10, "Phone number must be exactly 10 digits"),
        role: z.enum(memberRoles),
        password: z.string().min(6, "Password must be at least 6 characters long"),
      })
    )
    .min(5, "At least 5 committee members are required")
    .max(10, "Maximum 10 committee members allowed"),
});

export default function SocietyRegistration() {
  const {toast} = useToast();
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
      address: "",
      pinCode: "",
      email: "",
      phone: "",
      logo: "",
      members: [
        { name: "", email: "", phone: "", role: "PRESIDENT", password: "" },
        { name: "", email: "", phone: "", role: "VICE_PRESIDENT", password: "" },
        { name: "", email: "", phone: "", role: "TREASURER", password: "" },
        { name: "", email: "", phone: "", role: "ASSISTANT_TREASURER", password: "" },
        { name: "", email: "", phone: "", role: "SECRETARY", password: "" },
      ],
    },
  });

  const members = watch("members");

  const addMember = () => {
    if (members.length < 10) {
      setValue("members", [...members, { name: "", email: "", phone: "", role: "MEMBER", password: "" }]);
    }
  };

  const removeMember = (index: number) => {
    if (members.length > 5) {
      setValue("members", members.filter((_, i) => i !== index));
    }
  };

  const onSubmit = async (data: any) => {
    try {
      const response = await fetch("/api/society", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      if (response.ok) {
        toast({
          title: "Society Registered Successfully!"
        });
      } else {
        alert(result.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title : "Failed to register society"
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-2xl rounded-2xl">
      <h2 className="text-3xl font-bold text-center mb-6">Society Registration</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <input {...register("name")} placeholder="Society Name" className="input-field" />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>

        <div>
          <input {...register("address")} placeholder="Address" className="input-field" />
          {errors.address && <p className="error">{errors.address.message}</p>}
        </div>

        <div>
          <input {...register("pinCode")} placeholder="Pin Code" className="input-field" />
          {errors.pinCode && <p className="error">{errors.pinCode.message}</p>}
        </div>

        <div>
          <input {...register("email")} placeholder="Email" className="input-field" />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>

        <div>
          <input {...register("phone")} placeholder="Phone" className="input-field" />
          {errors.phone && <p className="error">{errors.phone.message}</p>}
        </div>

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
                Committee Member {index + 1} ({member.role.replace("_", " ")})
              </h3>
              <input {...register(`members.${index}.name`)} placeholder="Name" className="input-field" />
              {errors.members?.[index]?.name && <p className="error">{errors.members[index].name?.message}</p>}

              <input {...register(`members.${index}.email`)} placeholder="Email" className="input-field" />
              {errors.members?.[index]?.email && <p className="error">{errors.members[index].email?.message}</p>}

              <input {...register(`members.${index}.phone`)} placeholder="Phone" className="input-field" />
              {errors.members?.[index]?.phone && <p className="error">{errors.members[index].phone?.message}</p>}

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

              <input {...register(`members.${index}.password`)} type="password" placeholder="Password" className="input-field" />
              {errors.members?.[index]?.password && <p className="error">{errors.members[index].password?.message}</p>}

              {index >= 5 && (
                <Button type="button" onClick={() => removeMember(index)} variant="destructive">
                  Remove
                </Button>
              )}
            </motion.div>
          ))}
        </div>

        {members.length < 10 && (
          <Button type="button" onClick={addMember} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Add Member
          </Button>
        )}

        <Button type="submit" className="w-full bg-green-500 hover:bg-green-600">
          Register Society
        </Button>
      </form>
    </div>
  );
}
