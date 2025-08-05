import React, { lazy } from 'react';
import { Navigate, createBrowserRouter } from 'react-router';

import Loadable from '../layouts/full/shared/loadable/Loadable';
import CourseList from '../views/admin/CourseList';


/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));

/* ****Pages***** */
const ModernDash = Loadable(lazy(() => import('../views/dashboard/Modern')));
const CategoryList = Loadable(lazy(() => import('../views/admin/CategoryList')));
const CreateCategory = Loadable(lazy(() => import('../views/admin/CreateCategory')));
const FormVertical = Loadable(lazy(() => import('../views/forms/FormVertical')));
const BasicLayout = Loadable(lazy(() => import('../components/forms/form-vertical/BasicLayout')));
const CreateCourse = Loadable(lazy(() => import('../views/admin/CreateCourse')));
const LessionList = Loadable(lazy(() => import('../components/Courses/LessionList')));

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to="admin/dashboard" /> },
      { path: '/admin/dashboard', exact: true, element: <ModernDash /> },

      { path: '/admin/category-list', exact: true, element: <CategoryList /> },
      { path: '/admin/create-category', exact: true, element: <CreateCategory /> },

      { path: '/admin/courses/create', exact: true, element: <CreateCourse /> },
      { path: '/admin/courses', exact: true, element: <CourseList /> },

      { path: '/lessions', exact: true, element: <LessionList /> },


    ],
  },
];

const router = createBrowserRouter(Router);

export default router;
