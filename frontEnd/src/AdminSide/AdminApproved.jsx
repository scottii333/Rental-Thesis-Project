export const AdminApproved = () => {
  const data = [
    {
      reference: "02000123456",
      pickUpDate: "11/26/2024",
      returnDate: "12/02/2024",
      status: "Returned/Completed",
      statusColor: "bg-green-200 text-green-800",
    },
    {
      reference: "02000123456",
      pickUpDate: "11/26/2024",
      returnDate: "12/02/2024",
      status: "Waiting for Pickup",
      statusColor: "bg-yellow-200 text-yellow-800",
    },
    {
      reference: "02000123456",
      pickUpDate: "11/26/2024",
      returnDate: "12/02/2024",
      status: "In Progress (Vacation)",
      statusColor: "bg-blue-200 text-blue-800",
    },
    {
      reference: "02000123456",
      pickUpDate: "11/26/2024",
      returnDate: "12/02/2024",
      status: "Overdue/Penalty",
      statusColor: "bg-red-200 text-red-800",
    },
  ];

  return (
    <div className="p-4 overflow-x-auto">
      <h1 className="text-2xl font-semibold mb-4">Approved Reservations</h1>
      <table className="table-auto w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
              Reference no.
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
              Pick up Date
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
              Return Date
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              className={`border-b ${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              }`}
            >
              <td className="px-4 py-2 text-sm text-gray-800">
                {item.reference}
              </td>
              <td className="px-4 py-2 text-sm text-gray-800">
                {item.pickUpDate}
              </td>
              <td className="px-4 py-2 text-sm text-gray-800">
                {item.returnDate}
              </td>
              <td className="px-4 py-2 text-sm">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${item.statusColor}`}
                >
                  {item.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
