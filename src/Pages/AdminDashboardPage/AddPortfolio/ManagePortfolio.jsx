import React, { useEffect, useState } from "react";
import { FaTrashAlt, FaGlobe, FaFacebookF } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const ManagePortfolio = () => {
  const axiosPublic = useAxiosPublic();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axiosPublic.get("/projects");
        setProjects(res.data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [axiosPublic]);

  // Delete handler
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This project will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosPublic.delete(`/projects/${id}`);
          if (res.data.success) {
            setProjects(projects.filter((p) => p._id !== id));
            Swal.fire("Deleted!", "Project has been removed.", "success");
          }
        } catch (err) {
          console.error("Delete error:", err);
          Swal.fire("Error!", "Failed to delete project.", "error");
        }
      }
    });
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <header className="w-full px-6 py-4 shadow-sm border-b flex items-center justify-between bg-white">
        <div className="flex items-center gap-2">
          <img
            src="https://i.ibb.co/HDPgsNx3/download-13.png"
            alt="Logo"
            className="h-10 w-10"
          />
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
            STechNest | Manage Portfolio
          </h1>
        </div>
      </header>

      <section className="px-6 py-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Project List
        </h2>

        {loading ? (
          <div className="text-center text-gray-600 py-10">Loading...</div>
        ) : projects.length === 0 ? (
          <div className="text-center text-gray-600 py-10">
            No projects found.
          </div>
        ) : (
          <div className="overflow-x-auto bg-white shadow-lg border border-gray-100 rounded-2xl">
            <table className="min-w-full text-sm text-left text-gray-700">
              <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-6 py-3">Thumbnail</th>
                  <th className="px-6 py-3">Brand Name</th>
                  <th className="px-6 py-3">Facebook</th>
                  <th className="px-6 py-3">Website</th>
                  <th className="px-6 py-3">Created</th>
                  <th className="px-6 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {projects.map((project) => (
                  <tr
                    key={project._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-3">
                      <img
                        src={project.thumbnail}
                        alt={project.brandName}
                        className="w-16 h-16 rounded-md object-cover border"
                      />
                    </td>
                    <td className="px-6 py-3 font-medium text-gray-900">
                      {project.brandName}
                    </td>
                    <td className="px-6 py-3">
                      {project.facebook ? (
                        <a
                          href={project.facebook}
                          target="_blank"
                          rel="noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <FaFacebookF />
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="px-6 py-3">
                      {project.website ? (
                        <a
                          href={project.website}
                          target="_blank"
                          rel="noreferrer"
                          className="text-gray-700 hover:text-gray-900"
                        >
                          <FaGlobe />
                        </a>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="px-6 py-3 text-gray-500">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-3 text-center">
                      <button
                        onClick={() => handleDelete(project._id)}
                        className="text-red-600 hover:text-red-800 transition"
                      >
                        <FaTrashAlt size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default ManagePortfolio;
