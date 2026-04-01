import React from 'react'
import { Routes, Route } from "react-router-dom";
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/home/Home';
import About from '../pages/home/about/About';
import Media from '../pages/media/Media';
import Login from '../pages/login/Login';

// ── Student Dashboard ────────────────────────────────────────
import DashboardLayout from '../layouts/DashboardLayout';
import Dashboard from '../pages/dashboard/Dashboard';
import MyClassPage from '../pages/Classes/MyClassPage';
import HomeworkPage from '../pages/Homework/HomeworkPage';
import GradesPage from '../pages/Grades/GradesPage';
import HomeworkDetail from '../pages/Homework/HomeworkDetail';
import Homework from '../pages/Homework/Homework';
import AttendancePage from '../pages/Attendance/AttendancePage';
import MessagesPage from '../pages/Messages/MessagesPage';
import ProfilePage from '../pages/Profile/ProfilePage';

// ── Teacher Dashboard ────────────────────────────────────────
import TeacherLayout from '../layouts/TeacherLayout';
import TeacherDashboardPage    from '../pages/TeacherDashboard/TeacherDashboardPage';
import TeacherMyClassesPage    from '../pages/TeacherMyClasses/TeacherMyClassesPage';
import TeacherStudentsPage     from '../pages/TeacherStudents/TeacherStudentsPage';
import TeacherAssignmentsPage  from '../pages/TeacherAssignments/TeacherAssignmentsPage';
import TeacherGradebookPage    from '../pages/TeacherGradebook/TeacherGradebookPage';
import TeacherAttendancePage   from '../pages/TeacherAttendance/TeacherAttendancePage';
import TeacherMessagesPage     from '../pages/TeacherMessages/TeacherMessagesPage';
import TeacherCalendarPage     from '../pages/TeacherCalendar/TeacherCalendarPage';
import TeacherResourcesPage    from '../pages/TeacherResources/TeacherResourcesPage';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<MainLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/media' element={<Media />} />
      </Route>

      {/* Auth */}
      <Route path='/login' element={<Login />} />

      {/* Student dashboard */}
      <Route path='/dashboard' element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path='my-classes' element={<MyClassPage />} />
        <Route path='grade' element={<GradesPage />} />
        <Route path='homework' element={<HomeworkPage />}>
          <Route index element={<Homework />} />
          <Route path='detail' element={<HomeworkDetail />} />
        </Route>
        <Route path='attendance' element={<AttendancePage />} />
        <Route path='message' element={<MessagesPage />} />
        <Route path='profile' element={<ProfilePage />} />
      </Route>

      {/* Teacher dashboard */}
      <Route path='/teacher-dashboard' element={<TeacherLayout />}>
        <Route index element={<TeacherDashboardPage />} />
        <Route path='my-classes'   element={<TeacherMyClassesPage />} />
        <Route path='students'     element={<TeacherStudentsPage />} />
        <Route path='assignments'  element={<TeacherAssignmentsPage />} />
        <Route path='gradebook'    element={<TeacherGradebookPage />} />
        <Route path='attendance'   element={<TeacherAttendancePage />} />
        <Route path='messages'     element={<TeacherMessagesPage />} />
        <Route path='calendar'     element={<TeacherCalendarPage />} />
        <Route path='resources'    element={<TeacherResourcesPage />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes