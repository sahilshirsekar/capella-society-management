export const ActivityFeed = ({ activities }: any) => {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <ul className="space-y-4">
        {activities.map((activity: any) => (
          <li key={activity.id} className="flex justify-between items-center">
            <div>
              <p className="text-gray-700">
                <strong>{activity.user}</strong>
                <span className="p-2"></span>
                {activity.action}
                <p className="text-gray-500 text-sm">{activity.timestamp}</p>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
