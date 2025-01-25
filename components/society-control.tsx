import { SocietyDetails } from "./society-details";

export default async function SocietyControl() {
  const societyDetails = {
    name: 'Green View Apartments',
    address: '123 Society Lane, Mumbai, 400001',
    logo: '/placeholder-logo.png',
    subscription: 'Paid',
  };

  const committeeMembers = [
    { id: 1, role: 'Adhyaksh (President)', name: 'Ravi Sharma', email: 'ravi@example.com', phone: '9876543210' },
    { id: 2, role: 'Up-Adhyaksh (Vice-President)', name: 'Neha Gupta', email: 'neha@example.com', phone: '8765432109' },
  ];

  return (
    <div>
      <SocietyDetails details={societyDetails}/>
      {/* <CommitteeMembers members={committeeMembers}/> */}
    </div>
  )
}