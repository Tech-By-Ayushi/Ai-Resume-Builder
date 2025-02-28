import { useContext, useState } from 'react';
import { LayoutGrid } from 'lucide-react';
import { ResumeInfoContext } from '../../../context/ResumeInfoContext.jsx';
import { UpdateResumeDetail } from '../../../../services/GlobalApi.jsx';
import { useSearchParams } from "react-router-dom";
import { toast } from 'sonner';

function ThemeColor() {
  const colors = [
    "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF",
    "#33FFA1", "#FF7133", "#71FF33", "#7133FF", "#FF3371",
    "#33FF71", "#3371FF", "#A1FF33", "#33A1FF", "#FF5733",
    "#5733FF", "#33FF5A", "#5A33FF", "#FF335A", "#335AFF"
  ];

  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [searchParams] = useSearchParams();
  const di = searchParams.get("did");
  const [selectedColor, setSelectedColor] = useState(resumeInfo?.themeColor || '');
  const [popoverOpen, setPopoverOpen] = useState(false);

  const onColorSelect = (themeColor) => {
    setSelectedColor(themeColor);
    setResumeInfo({
      ...resumeInfo,
      themeColor: themeColor
    });

    const data = { data: { themeColor: themeColor } };




    UpdateResumeDetail(di, data)
      .then(resp => {
        console.log(resp);
        toast('Theme Color Updated');
        setPopoverOpen(false);
      })
      .catch(error => {
        console.error("Error updating theme color:", error);
        toast("Failed to update theme color.");
      });
  };

  return (
    <div className="relative inline-block text-left">
      <button 
        onClick={() => setPopoverOpen(!popoverOpen)}
        className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded bg-white hover:bg-gray-50 focus:outline-none"
      >
        <LayoutGrid className="h-4 w-4" />
        <span className="text-sm">Theme</span>
      </button>

      {popoverOpen && (
        <div className="absolute z-10 mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="p-4">
            <h2 className="mb-2 text-sm font-bold">Select Theme Color</h2>
            <div className="grid grid-cols-5 gap-3">
              {colors.map((item, index) => (
                <div 
                  key={index}
                  onClick={() => onColorSelect(item)}
                  className={`h-5 w-5 rounded-full cursor-pointer border hover:border-black ${
                    selectedColor === item ? 'border-black' : 'border-gray-300'
                  }`}
                  style={{ background: item }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ThemeColor;
