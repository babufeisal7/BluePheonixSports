const MedicalUpload = () => {
    return (
      <div>
        <h2 className="text-2xl font-bold mb-4">Upload Medical Reports</h2>
        <form className="bg-white p-4 rounded shadow space-y-4">
          <input
            type="text"
            placeholder="Player Name"
            className="w-full p-2 border rounded"
          />
          <input
            type="file"
            className="w-full p-2 border rounded"
          />
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Upload
          </button>
        </form>
      </div>
    );
  };
  
  export default MedicalUpload;
  