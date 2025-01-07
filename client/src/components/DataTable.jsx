import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoChevronBackOutline } from "react-icons/io5";
import { AiOutlineVerticalRight } from "react-icons/ai";
import { BsChevronBarRight } from "react-icons/bs";

const DataTable = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10); // Default rows per page
  const [totalRecords, setTotalRecords] = useState(0);

  const fetchData = async (page = 1, search = "", perPage = rowsPerPage) => {
    try {
      const response = await axios.get("https://api.razzakfashion.com", {
        params: {
          paginate: perPage,
          search: search,
          page: page,
        },
      });
      const result = response.data;

      setData(result.data);
      setCurrentPage(result.current_page);
      setTotalPages(result.last_page);
      setTotalRecords(result.total); // Total number of records
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [rowsPerPage]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchData(1, searchTerm, rowsPerPage);
  };

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      fetchData(newPage, searchTerm, rowsPerPage);
    }
  };

  const handleRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    fetchData(1, searchTerm, Number(e.target.value));
  };

  return (
    <div className="p-4">
      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-4 flex gap-4 items-center">
        <input
          type="text"
          className="border p-2 w-full md:w-1/3 rounded-lg"
          placeholder="Search area"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Search
        </button>
      </form>

      {/* Data Table */}
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Created At</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{item.name}</td>
              <td className="border border-gray-300 px-4 py-2">{item.email}</td>
              <td className="border border-gray-300 px-4 py-2">
                {new Date(item.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-end gap-10 items-center mt-4">
        <div className="flex items-center gap-4">
          <label htmlFor="rowsPerPage" className="text-gray-600 font-medium">
            Rows per page:
          </label>
          <select
            id="rowsPerPage"
            value={rowsPerPage}
            onChange={handleRowsPerPageChange}
            className="border p-2 rounded-lg"
          >
            <option value={10}>10</option>
            <option value={30}>30</option>
            <option value={70}>70</option>
          </select>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            className={`p-2 font-bold text-[22px] rounded-lg ${
              currentPage === 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-blue-600 hover:bg-gray-200"
            }`}
          >
            <AiOutlineVerticalRight />
          </button>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`p-2 font-bold text-[22px] rounded-lg ${
              currentPage === 1
                ? "text-gray-400 cursor-not-allowed"
                : "text-blue-600 hover:bg-gray-200"
            }`}
          >
            <IoChevronBackOutline />
          </button>
          <span>
            {currentPage}-{rowsPerPage} of {totalRecords}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`p-2 font-bold text-[22px] rounded-lg ${
              currentPage === totalPages
                ? "text-gray-400 cursor-not-allowed"
                : "text-blue-600 hover:bg-gray-200"
            }`}
          >
            {">"}
          </button>
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
            className={`p-2 font-bold text-[22px] rounded-lg ${
              currentPage === totalPages
                ? "text-gray-400 cursor-not-allowed"
                : "text-blue-600 hover:bg-gray-200"
            }`}
          >
            <BsChevronBarRight  />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
