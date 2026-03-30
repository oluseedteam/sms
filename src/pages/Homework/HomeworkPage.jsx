import { Outlet } from 'react-router-dom';

const HomeworkPage = () => {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-5 duration-700">
      <Outlet />
    </div>
  );
};

export default HomeworkPage;
