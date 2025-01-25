import { EditableField } from "./ui/editable-field";

export const SocietyDetails = ({ details } : any) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Society Details</h2>

      <EditableField label="Society Name" value={details.name}/>
      <EditableField label="Address" value={details.address}/>


      <EditableField label="Subscription Plan" value={details.subscription} options={['Free', 'Paid']} />

    </div>
  );
};
