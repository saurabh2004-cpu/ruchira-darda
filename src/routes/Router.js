import React, { lazy } from 'react';
import { Navigate, createBrowserRouter } from 'react-router';

import Loadable from '../layouts/full/shared/loadable/Loadable';
import CourseList from '../views/admin/CourseList';
import { exact } from 'prop-types';


/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));

/* ****Pages***** */
const ModernDash = Loadable(lazy(() => import('../views/dashboard/Modern')));
const CategoryList = Loadable(lazy(() => import('../views/admin/CategoryList')));
const CreateCategory = Loadable(lazy(() => import('../views/admin/CreateCategory')));
const EditCategory = Loadable(lazy(() => import('../views/admin/EditCategory')));
const FormVertical = Loadable(lazy(() => import('../views/forms/FormVertical')));

const BasicLayout = Loadable(lazy(() => import('../components/forms/form-vertical/BasicLayout')));
const CreateCourse = Loadable(lazy(() => import('../views/admin/CreateCourse')));
const LessionList = Loadable(lazy(() => import('../components/Courses/LessionList')));
const PendingCourses = Loadable(lazy(() => import('../views/admin/PendingCourses')));
const EnrollmentList = Loadable(lazy(() => import('../views/admin/EnrollmentList')));
const EnrollmentDetails = Loadable(lazy(() => import('../views/admin/EnrollmentDetails')));
const FailedPayments = Loadable(lazy(() => import('../views/admin/FailedPayments')));
const CouponList = Loadable(lazy(() => import('../views/admin/CouponList')));
const CreateCoupon = Loadable(lazy(() => import('../views/admin/CreateCoupon')));
const CouponDetails = Loadable(lazy(() => import('../views/admin/CouponDetails')));
const WithDrawList = Loadable(lazy(() => import('../views/admin/WithDrawList')));
const WithdrawDetail = Loadable(lazy(() => import('../views/admin/WithdrawDetails')));
const StudentList = Loadable(lazy(() => import('../views/admin/StudentList')));
const StudentDetails = Loadable(lazy(() => import('../views/admin/StudentDetails')));
const StudentProfile = Loadable(lazy(() => import('../views/admin/StudentProfile')));
const ContactMessage = Loadable(lazy(() => import('../views/admin/ContactMessage')));
const Announcements = Loadable(lazy(() => import('../views/admin/Announcements')));

const ModuleList = Loadable(lazy(() => import('../components/Courses/ModuleList')));
const Login = Loadable(lazy(() => import('../views/authentication/auth1/Login')));

// import ModernDash from '../views/dashboard/Modern';
// import CategoryList from '../views/admin/CategoryList';
// import CreateCategory from '../views/admin/CreateCategory';
// import EditCategory from '../views/admin/EditCategory';
// import FormVertical from '../views/forms/FormVertical';

// import BasicLayout from '../components/forms/form-vertical/BasicLayout';
// import CreateCourse from '../views/admin/CreateCourse';
// import LessionList from '../components/Courses/LessionList';
// import PendingCourses from '../views/admin/PendingCourses';
// import EnrollmentList from '../views/admin/EnrollmentList';
// import EnrollmentDetails from '../views/admin/EnrollmentDetails';
// import FailedPayments from '../views/admin/FailedPayments';
// import CouponList from '../views/admin/CouponList';
// import CreateCoupon from '../views/admin/CreateCoupon';
// import CouponDetails from '../views/admin/CouponDetails';
// import WithDrawList from '../views/admin/WithDrawList';
// import WithdrawDetail from '../views/admin/WithdrawDetails';
// import StudentList from '../views/admin/StudentList';
// import StudentDetails from '../views/admin/StudentDetails';
// import StudentProfile from '../views/admin/StudentProfile';
// import ContactMessage from '../views/admin/ContactMessage';
// import Announcements from '../views/admin/Announcements';

const Router = [
  { path: '/auth/login', element: <Login /> },
  {
    path: '/',
    element: <FullLayout />,
    children: [


      { path: '/', element: <Navigate to="admin/dashboard" /> },
      { path: '/admin/dashboard', exact: true, element: <ModernDash /> },

      { path: '/admin/category-list', exact: true, element: <CategoryList /> },
      { path: '/admin/create-category', exact: true, element: <CreateCategory /> },
      { path: '/admin/edit-category', exact: true, element: <EditCategory /> },

      { path: '/admin/courses/create', exact: true, element: <CreateCourse /> },
      { path: '/admin/courses', exact: true, element: <CourseList /> },
      { path: '/admin/courses/pending', exact: true, element: <PendingCourses /> },

      { path: '/admin/courses/modules', exact: true, element: <ModuleList /> },

      { path: '/lessions', exact: true, element: <LessionList /> },

      { path: '/admin/enrollment/list', exact: true, element: <EnrollmentList /> },
      { path: '/admin/enrollment-details', exact: true, element: <EnrollmentDetails /> },
      { path: '/admin/failed-payments', exact: true, element: <FailedPayments /> },

      { path: '/admin/coupon-list', exact: true, element: <CouponList /> },
      { path: '/admin/create-coupon', exact: true, element: <CreateCoupon /> },
      { path: '/admin/coupon-details', exact: true, element: <CouponDetails /> },

      { path: '/admin/withdraw-list', exact: true, element: <WithDrawList /> },
      { path: '/admin/withdraw-details', exact: true, element: <WithdrawDetail /> },

      { path: '/admin/student-list', exact: true, element: <StudentList /> },
      { path: '/admin/student-details', exact: true, element: <StudentDetails /> },
      { path: '/admin/student-profile', exact: true, element: <StudentProfile /> },

      { path: '/admin/contact-message', exact: true, element: <ContactMessage /> },

      { path: '/admin/announcement', exact: true, element: <Announcements /> },
    ],
  },
];

const router = createBrowserRouter(Router);

export default router;
