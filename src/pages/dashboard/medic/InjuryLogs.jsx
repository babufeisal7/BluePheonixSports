const InjuryLogs = () => {
    const injuries = [
      { name: "John Doe", injury: "Knee sprain", date: "2025-06-25" },
      { name: "Sarah Lee", injury: "Ankle twist", date: "2025-06-20" },
    ];
  
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4">Injury Logs</h2>
        <div className="bg-white rounded shadow p-4">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2">Player</th>
                <th className="p-2">Injury</th>
                <th className="p-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {injuries.map((log, i) => (
                <tr key={i}>
                  <td className="p-2">{log.name}</td>
                  <td className="p-2">{log.injury}</td>
                  <td className="p-2">{log.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
  
  export default InjuryLogs;
  