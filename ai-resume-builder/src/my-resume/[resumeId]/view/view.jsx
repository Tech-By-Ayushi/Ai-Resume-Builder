import Header from '../../../custom/header.jsx';
import Footer from '../../../custom/footer.jsx';
import { ResumeInfoContext } from '../../../context/ResumeInfoContext.jsx';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ResumePreview from '../../../dashboard/resume/component/ResumePreview.jsx';
import { GetResumeById } from '../../../../services/GlobalApi.jsx';
import { RWebShare } from 'react-web-share';

function ViewResume() {
  const [resumeInfo, setResumeInfo] = useState();
  const { resumeId } = useParams();

  useEffect(() => {
    GetResumeInfo();
  }, []);

  const GetResumeInfo = () => {
    GetResumeById(resumeId).then((resp) => {
      console.log(resp.data.data);
      setResumeInfo(resp.data.data);
    });
  };

  const HandleDownload = () => {
    window.print();
  };

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div id="no-print" className="pt-24">
        <Header />

        <div className="my-10 mx-10 md:mx-20 lg:mx-36">
          <h2 className="text-center text-2xl font-medium">
            Congrats! Your Ultimate AI generated Resume is ready!
          </h2>
          <p className="text-center text-gray-400">
            Now you are ready to download your resume and share your unique resume URL with your friends and family.
          </p>
          <div className="flex justify-between px-44 my-10">
            <button
              onClick={HandleDownload}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors"
            >
              Download
            </button>
            <RWebShare
              data={{
                text: "Hello Everyone, This is my resume please open URL to see it",
                url: import.meta.env.VITE_BASE_URL + "/my-resume/" + resumeId + "/view",
                title: resumeInfo?.firstName + " " + resumeInfo?.lastName + " resume",
              }}
              onClick={() => console.log("shared successfully!")}
            >
              <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition-colors">
                Share
              </button>
            </RWebShare>
          </div>
        </div>
      </div>
      <div className="my-10 mx-10 md:mx-20 lg:mx-36">
        <div id="print-area">
          {/* <ResumePreview /> */}
          <ResumePreview/>
        </div>
      </div>
      <Footer />
    </ResumeInfoContext.Provider>
  );
}

export default ViewResume;
