const EMI = () => {
    return (
      <div>
        <div className="overflow-x-auto shadow-md border border-gray-200 rounded-lg">
          <table className="min-w-full table-auto">
            <thead className="bg-blue-100 text-left">
              <tr>
                <th className="py-2 px-2">Students</th>
                <th className="py-2 px-2">Email ID</th>
                <th className="py-2 px-2">Courses</th>
                <th className="py-2 px-2">Pay date</th>
                <th className="py-2 px-2">Payment</th>
                <th className="py-2 px-2">Payment Duration</th>
                <th className="py-2 px-2">Batch</th>
                <th className="py-2 px-2">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-2">Jane Cooper</td>
                <td className="py-2 px-2">example1@mail.com</td>
                <td className="py-2 px-2">UI/UX</td>
                <td className="py-2 px-2">2024/2/3</td>
                <td className="py-2 px-2">$10</td>
                <td className="py-2 px-2">4 Month</td>
                <td className="py-2 px-2">12</td>
                <td className="py-2 px-2 space-x-2">
                  <button className="text-blue-500">👁️</button>
                  <button className="text-yellow-500">✏️</button>
                  <button className="text-red-500">🗑️</button>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-2">Jane Cooper</td>
                <td className="py-2 px-2">example1@mail.com</td>
                <td className="py-2 px-2">UI/UX</td>
                <td className="py-2 px-2">2024/2/3</td>
                <td className="py-2 px-2">$10</td>
                <td className="py-2 px-2">4 Month</td>
                <td className="py-2 px-2">12</td>
                <td className="py-2 px-2 space-x-2">
                  <button className="text-blue-500">👁️</button>
                  <button className="text-yellow-500">✏️</button>
                  <button className="text-red-500">🗑️</button>
                </td>
              </tr>
              <tr>
                <td className="py-2 px-2">Jane Cooper</td>
                <td className="py-2 px-2">example1@mail.com</td>
                <td className="py-2 px-2">UI/UX</td>
                <td className="py-2 px-2">2024/2/3</td>
                <td className="py-2 px-2">$10</td>
                <td className="py-2 px-2">4 Month</td>
                <td className="py-2 px-2">12</td>
                <td className="py-2 px-2 space-x-2">
                  <button className="text-blue-500">👁️</button>
                  <button className="text-yellow-500">✏️</button>
                  <button className="text-red-500">🗑️</button>
                </td>
              </tr>
              {/* More rows */}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default EMI;
  