// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { useRouter } from "next/navigation";
// import { useToast } from "@/hooks/use-toast";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function () {
  const response = await fetch("http://localhost:3000/api/society", {
    cache: "no-store",
  });
  const data = await response.json();
  const societies = data.societies;

  return (
    <div>
      <h1 className="text-2xl font-extrabold p-5">Society List</h1>
      {societies.length === 0 ? (
        <p>No societies found.</p>
      ) : (
        <ul className="grid grid-cols-2">
          {societies.map((society: any) => (
            <li>
              <Card key={society.id} className="pr-20">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {society.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Address : {society.address} - {society.pinCode}
                  </p>
                  <p>
                    Email: {society.email}  
                  </p>
                  <p>
                  Phone No. : {society.phone}
                  </p>
                  {society.logo && (
                    <img src={society.logo} alt="Society Logo" width="100" />
                  )}

                  <h3 className="text-s">Committee Members:</h3>
                  <ul>
                    {society.members.map((member: any) => (
                      <li>
                        <Card key={member.id} className="pr-20">
                          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                            {member.role}
                            </CardTitle>
                            {/* <DollarSign className="h-4 w-4 text-muted-foreground" /> */}
                          </CardHeader>
                          <CardContent>

                          {member.name}  
                          <p> Email: {member.email}</p>
                          <p>Phone No. : {member.phone}</p>
                          </CardContent>
                        </Card>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// const { toast } = useToast()
// const router = useRouter();
// const { register, handleSubmit } = useForm();
// const [members, setMembers] = useState([{ name: "", email: "", phone: "", role: "MEMBER" }]);

// const addMember = () => {
//   if (members.length < 10) setMembers([...members, { name: "", email: "", phone: "", role: "MEMBER" }]);
// };

// const onSubmit = async (data : any) => {
//   const response = await fetch("/api/society", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ ...data, members }),
//   });

//   const result = await response.json();
//   if (response.ok) {
//     toast({
//       title: "Success"
//     })
//     router.push("/dashboard");
//   } else {
//     toast({
//       title:"Sign in failed"
//     })
//   }
// };

// return (
//   <div className="max-w-lg mx-auto p-6 bg-white shadow-md">
//     <h2 className="text-xl font-bold mb-4">Society Onboarding</h2>
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <input className="border p-2 w-full mb-2" placeholder="Society Name" {...register("name", { required: true })} />
//       <input className="border p-2 w-full mb-2" placeholder="Address" {...register("address", { required: true })} />
//       <input className="border p-2 w-full mb-2" placeholder="Pin Code" {...register("pinCode", { required: true })} />
//       <input className="border p-2 w-full mb-2" placeholder="Contact Email" {...register("email", { required: true })} />
//       <input className="border p-2 w-full mb-2" placeholder="Phone Number" {...register("phone", { required: true })} />
//       <input className="border p-2 w-full mb-2" type="file" {...register("logo")} />

//       <h3 className="text-lg font-semibold">Committee Members</h3>
//       {members.map((member, index) => (
//         <div key={index} className="border p-2 mb-2">
//           <input className="border p-2 w-full mb-2" placeholder="Name" onChange={(e) => (members[index].name = e.target.value)} required />
//           <input className="border p-2 w-full mb-2" placeholder="Email" onChange={(e) => (members[index].email = e.target.value)} required />
//           <input className="border p-2 w-full mb-2" placeholder="Phone" onChange={(e) => (members[index].phone = e.target.value)} required />
//           <select className="border p-2 w-full" onChange={(e) => (members[index].role = e.target.value)} required>
//             <option value="PRESIDENT">Adhyaksh (President)</option>
//             <option value="VICE_PRESIDENT">Up-Adhyaksh (Vice-President)</option>
//             <option value="TREASURER">Khajindar (Treasurer)</option>
//             <option value="ASSISTANT_TREASURER">Up-Khajindar (Assistant Treasurer)</option>
//             <option value="SECRETARY">Secretary</option>
//             <option value="MEMBER">Member</option>
//           </select>
//         </div>
//       ))}
//       <button type="button" className="bg-gray-200 p-2 rounded" onClick={addMember} disabled={members.length >= 10}>
//         Add Member
//       </button>
//       <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full mt-4">
//         Register Society
//       </button>
//     </form>
//   </div>
// );

// export default SocietyOnboarding;
