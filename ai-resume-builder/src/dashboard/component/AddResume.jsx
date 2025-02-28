import { useState } from 'react';
import { Loader2Icon, PlusSquare } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { CreateNewResume } from '../../../services/GlobalApi.jsx';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

function AddResume() {
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState('');
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();

  const onCreate = async () => {
    if (!resumeTitle.trim()) {
      console.log('Title is required');
      return;
    }

    setLoading(true);

    const uuid = uuidv4();
    const data = {
      data: {
        title: resumeTitle,
        resumeId: uuid,
        userEmail: user?.primaryEmailAddress?.emailAddress || 'default@example.com',
        // Add other required fields here based on your Strapi model
      }
    };

    console.log('Payload being sent:', data);

    try {
      const response = await CreateNewResume(data);
      console.log('Resume created:', response.data);
      setLoading(false);
      console.log(response.data.data.documentId)
      navigation('resume/' + response.data.data.resumeId + '/edit?did='+response.data.data.documentId);
    } catch (error) {
      console.error('Error creating resume:', error.response ? error.response.data : error.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        className="p-14 py-24 border border-dashed rounded-lg flex items-center justify-center bg-secondary hover:scale-105 transition-all hover:shadow-md cursor-pointer h-[280px]"
        onClick={() => setOpenDialog(true)}
      >
        <PlusSquare size={32} />
      </div>

      {openDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-blue-800 p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Create New Resume</h3>
            <p className="mb-2">Add a title for your new resume</p>
            <input
              type="text"
              placeholder="Ex. Full Stack Resume"
              value={resumeTitle}
              onChange={(e) => setResumeTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4 dark:bg-gray-700 dark:text-white"
            />
            <div className="flex justify-end gap-5">
              <button
                onClick={() => setOpenDialog(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                disabled={!resumeTitle.trim() || loading}
                onClick={onCreate}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 flex items-center disabled:bg-indigo-300"
              >
                {loading && <Loader2Icon className="animate-spin mr-2" size={16} />}
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddResume;