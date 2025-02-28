import { Loader2Icon, MoreVertical } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DeleteResumeById } from '../../../services/GlobalApi.jsx';
import { toast } from 'sonner';

function ResumeCardItem({ resume, refreshData }) {
  const navigation = useNavigate();
  const [openAlert, setOpenAlert] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleDropdown = () => setDropdownOpen(prev => !prev);

  const onDelete = () => {
    setLoading(true);
    DeleteResumeById(resume.documentId)
      .then((resp) => {
        console.log(resp);
        toast('Resume Deleted!');
        refreshData();
        setLoading(false);
        setOpenAlert(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  };

  return (
    <div className="relative rounded-lg shadow-lg overflow-visible">
      <Link to={'/app/dashboard/resume/${resume.documentId}/edit?did='+resume.documentId}>
        <div
          className="p-14 bg-gradient-to-b from-pink-100 via-purple-200 to-blue-200 h-[320px] rounded-t-lg border-t-4"
          style={{ borderColor: resume?.themeColor }}
        >
          <div className="flex items-center justify-center h-[200px]">
            <img src="/notebook.jpg" width={80} height={80} alt="Resume Preview" />
          </div>
        </div>
      </Link>
      <div
        className="border p-3 flex justify-between items-center text-white rounded-b-lg shadow-lg"
        style={{ background: resume?.themeColor }}
      >
        <h2 className="text-sm">{resume?.title}</h2>
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="h-8 w-8 flex items-center justify-center bg-white rounded-full text-gray-700 shadow"
          >
            <MoreVertical />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md z-20">
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  navigation('/app/dashboard/resume/${resume.documentId}/edit?did='+resume.documentId);
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  navigation(`/my-resume/${resume.documentId}/view`);
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 transition-colors"
              >
                View
              </button>
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  navigation(`/my-resume/${resume.documentId}/view`);
                }}
                className="w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 transition-colors"
              >
                Download
              </button>
              <button
                onClick={() => {
                  setDropdownOpen(false);
                  setOpenAlert(true);
                }}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {openAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Are you absolutely sure?</h3>
            <p className="mb-4">
              This action cannot be undone. This will permanently delete your resume.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setOpenAlert(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onDelete}
                disabled={loading}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 flex items-center transition-colors"
              >
                {loading ? <Loader2Icon className="animate-spin h-5 w-5" /> : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResumeCardItem;
