import React, { useEffect, useState } from "react";
import { FaTrashAlt, FaGlobe, FaFacebookF, FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const ManagePortfolio = () => {
  const axiosPublic = useAxiosPublic();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await axiosPublic.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Confirm Delete?",
      text: "This action cannot be undone",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#101827",
      cancelButtonColor: "#f3f4f6",
      confirmButtonText: "<span style='color:white'>Delete</span>",
      cancelButtonText: "<span style='color:#374151'>Cancel</span>",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem("access-token");
          const res = await axiosPublic.delete(`/projects/${id}`, {
            headers: { authorization: `Bearer ${token}` },
          });
          if (res.data.deletedCount > 0) {
            const remaining = projects.filter((p) => p._id !== id);
            setProjects(remaining);
            Swal.fire({ icon: "success", title: "Project Removed", showConfirmButton: false, timer: 1500 });
          }
        } catch (err) {
          Swal.fire("Error", "Could not delete project", "error");
        }
      }
    });
  };

  const handleUpdate = async (project) => {
    const { value: formValues } = await Swal.fire({
      title: "Edit Project Details",
      html: `
        <div style="display: flex; flex-direction: column; gap: 12px; text-align: left;">
          <input id="up-name" class="swal2-input" style="width: 90%; font-size: 14px;" placeholder="Brand Name" value="${project.brandName}">
          <input id="up-fb" class="swal2-input" style="width: 90%; font-size: 14px;" placeholder="Facebook URL" value="${project.facebook || ""}">
          <input id="up-web" class="swal2-input" style="width: 90%; font-size: 14px;" placeholder="Website URL" value="${project.website || ""}">
          <textarea id="up-desc" class="swal2-textarea" style="width: 90%; font-size: 14px; height: 70px;" placeholder="Description">${project.Description}</textarea>
          <div style="font-size: 12px; color: #6b7280; padding-left: 10px;">
            Change Logo: <input type="file" id="up-logo" style="margin-bottom: 8px;"><br>
            Change Thumbnail: <input type="file" id="up-thumb">
          </div>
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Update Now",
      confirmButtonColor: "#2563eb",
      preConfirm: async () => {
        const logoFile = document.getElementById("up-logo").files[0];
        const thumbFile = document.getElementById("up-thumb").files[0];
        
        Swal.showLoading();
        
        let brandLogo = project.brandLogo;
        let thumbnail = project.thumbnail;

        try {
          if (logoFile) {
            const formData = new FormData();
            formData.append("image", logoFile);
            const res = await axiosPublic.post(image_hosting_api, formData);
            brandLogo = res.data.data.display_url;
          }
          if (thumbFile) {
            const formData = new FormData();
            formData.append("image", thumbFile);
            const res = await axiosPublic.post(image_hosting_api, formData);
            thumbnail = res.data.data.display_url;
          }
          return {
            brandName: document.getElementById("up-name").value,
            facebook: document.getElementById("up-fb").value,
            website: document.getElementById("up-web").value,
            Description: document.getElementById("up-desc").value,
            brandLogo,
            thumbnail,
          };
        } catch (err) {
          Swal.showValidationMessage("Upload failed");
        }
      },
    });

    if (formValues) {
      try {
        const token = localStorage.getItem("access-token");
        const res = await axiosPublic.patch(`/projects/${project._id}`, formValues, {
          headers: { authorization: `Bearer ${token}` },
        });
        if (res.data.matchedCount > 0) {
          fetchProjects();
          Swal.fire({ icon: "success", title: "Updated", showConfirmButton: false, timer: 1500 });
        }
      } catch (err) {
        Swal.fire("Error", "Update failed", "error");
      }
    }
  };

  const SkeletonRow = () => (
    <tr className="animate-pulse border-b">
      <td className="p-4"><div className="w-16 h-10 bg-gray-100 rounded"></div></td>
      <td className="p-4"><div className="h-4 bg-gray-100 rounded w-32"></div></td>
      <td className="p-4"><div className="w-6 h-6 bg-gray-100 rounded-full"></div></td>
      <td className="p-4"><div className="w-6 h-6 bg-gray-100 rounded-full"></div></td>
      <td className="p-4 text-center"><div className="flex justify-center gap-3"><div className="w-6 h-6 bg-gray-100 rounded"></div><div className="w-6 h-6 bg-gray-100 rounded"></div></div></td>
    </tr>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-full mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-2xl text-gray-800">Manage Portfolio</h1>
          <p className="text-sm text-gray-500">Edit or remove your project entries</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr className="text-xs text-gray-500 uppercase">
                <th className="p-4 font-medium">Image</th>
                <th className="p-4 font-medium">Project Name</th>
                <th className="p-4 font-medium">FB</th>
                <th className="p-4 font-medium">Web</th>
                <th className="p-4 font-medium text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm text-gray-700 divide-y divide-gray-100">
              {loading ? (
                <>
                  <SkeletonRow />
                  <SkeletonRow />
                  <SkeletonRow />
                </>
              ) : projects.map((project) => (
                <tr key={project._id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <img src={project.thumbnail} className="w-16 h-10 object-cover rounded border border-gray-100" alt="" />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={project.brandLogo} className="w-5 h-5 object-contain" alt="" />
                      <span>{project.brandName}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    {project.facebook ? <a href={project.facebook} target="_blank" className="text-gray-400 hover:text-blue-600"><FaFacebookF /></a> : "-"}
                  </td>
                  <td className="p-4">
                    {project.website ? <a href={project.website} target="_blank" className="text-gray-400 hover:text-gray-800"><FaGlobe /></a> : "-"}
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center gap-4">
                      <button onClick={() => handleUpdate(project)} className="text-gray-400 hover:text-blue-600 transition-colors">
                        <FaEdit size={16} />
                      </button>
                      <button onClick={() => handleDelete(project._id)} className="text-gray-400 hover:text-red-600 transition-colors">
                        <FaTrashAlt size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManagePortfolio;