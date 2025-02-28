import { useEffect, useState } from 'react';
import AddResume from './component/AddResume.jsx';
import { useUser } from '@clerk/clerk-react';
import { GetUserResumes } from '../../services/GlobalApi.jsx';
import ResumeCardItem from './component/ResumeCardItem.jsx';

function Dashboard() {
  const { user } = useUser();
  const [resumeList, setResumeList] = useState([]);

  useEffect(() => {
    if (user) {
      GetResumesList();
    }
  }, [user]);

  /**
   * Used to Get Users Resume List
   */
  const GetResumesList = () => {
    GetUserResumes(user?.primaryEmailAddress?.emailAddress)
      .then((resp) => {
        console.log(resp.data.data);
        setResumeList(resp.data?.data || []); // Make sure it's always an array
      })
      .catch((error) => {
        console.error('Error fetching resumes:', error);
        setResumeList([]); // Fallback to empty array in case of error
      });
  };

  return (
    <div className="p-10 md:px-20 lg:px-32">
      <h2 className="font-bold text-3xl">My Resume</h2>
      <p>Start Creating AI resume to your next Job role</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-10">
        <AddResume />
        {resumeList && resumeList.length > 0 ? (
          resumeList.map((resume, index) => (
            <ResumeCardItem resume={resume} key={index} refreshData={GetResumesList} />
          ))
        ) : (
          [1, 2, 3, 4].map((item, index) => (
            <div className="h-[280px] rounded-lg bg-slate-200 animate-pulse" key={index}></div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;
