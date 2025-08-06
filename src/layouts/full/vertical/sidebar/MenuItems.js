import { uniqueId } from 'lodash';

import {
  IconAward,
  IconBoxMultiple,
  IconPoint,
  IconAlertCircle,
  IconNotes,
  IconCalendar,
  IconMail,
  IconTicket,
  IconEdit,
  IconCurrencyDollar,
  IconApps,
  IconFileDescription,
  IconFileDots,
  IconFiles,
  IconBan,
  IconStar,
  IconMoodSmile,
  IconBorderAll,
  IconBorderHorizontal,
  IconBorderInner,
  IconBorderVertical,
  IconBorderTop,
  IconUserCircle,
  IconPackage,
  IconMessage2,
  IconBasket,
  IconChartLine,
  IconChartArcs,
  IconChartCandle,
  IconChartArea,
  IconChartDots,
  IconChartDonut3,
  IconChartRadar,
  IconLogin,
  IconUserPlus,
  IconRotate,
  IconBox,
  IconShoppingCart,
  IconAperture,
  IconLayout,
  IconSettings,
  IconHelp,
  IconZoomCode,
  IconBoxAlignBottom,
  IconBoxAlignLeft,
  IconBorderStyle2,
  IconAppWindow,
  IconNotebook,
  IconFileCheck,
  IconChartHistogram,
  IconChartPie2,
  IconChartScatter,
  IconChartPpf,
  IconChartArcs3,
  IconListTree,
  IconLanguage,
  IconFile,
  IconFileText,
} from '@tabler/icons-react';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Home',
  },

  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconAperture,
    href: '/admin/dashboard',
    chip: 'New',
    chipColor: 'secondary',
  },
  {
    id: uniqueId(),
    title: 'Earning & Revenue',
    icon: IconShoppingCart,
    href: '/admin/earning-revenue',
  },
  {
    id: uniqueId(),
    title: 'Manage Course',
    icon: IconAppWindow,
    children: [
      {
        id: uniqueId(),
        title: 'Create Category',
        icon: IconPoint,
        href: '/admin/create-category',
      },
      {
        id: uniqueId(),
        title: 'Category List',
        icon: IconPoint,
        href: '/admin/category-list',
      },
      {
        id: uniqueId(),
        title: 'Create Course',
        icon: IconPoint,
        href: '/admin/courses/create',
      },
      {
        id: uniqueId(),
        title: 'Course List',
        icon: IconPoint,
        href: '/admin/courses',
      },
      {
        id: uniqueId(),
        title: 'Pending Course',
        icon: IconPoint,
        href: '/admin/courses/pending',
      }
    ]
  },

  {
    id: uniqueId(),
    title: 'Enrollment',
    icon: IconPackage,
    chip: '2',
    chipColor: 'secondary',
    children: [
      {
        id: uniqueId(),
        title: 'Enrollment List',
        icon: IconPoint,
        href: '/admin/enrollment/list',
      },
      {
        id: uniqueId(),
        title: 'Failed Payments',
        icon: IconPoint,
        href: '/admin/failed-payments',
      },
    ]
  },
  {
    id: uniqueId(),
    title: 'Manage Coupen',
    icon: IconUserCircle,
    children: [
      {
        id: uniqueId(),
        title: 'Coupon List',
        icon: IconPoint,
        href: '/admin/coupon-list',
      },
      
    ]

  },
  {
    id: uniqueId(),
    title: 'Manage Widrawal',
    icon: IconUserCircle,
    children: [
      {
        id: uniqueId(),
        title: 'Withdraw List',
        icon: IconPoint,
        href: '/admin/withdraw-list',
      },
    ]

  },
  // {
  //   id: uniqueId(),
  //   title: 'Manage Instructor',
  //   icon: IconUserCircle,
  //   href: '/admin/manage-widrawa',
  //   children: [
  //     {
  //       id: uniqueId(),
  //       title: 'Instructor List',
  //       icon: IconPoint,
  //       href: '/admin/instructor-list',
  //     },
  //     {
  //       id: uniqueId(),
  //       title: 'Join Request',
  //       icon: IconPoint,
  //       href: '/admin/join-request',
  //     },
  //   ]

  // },

  {
    id: uniqueId(),
    title: 'Manage-student',
    icon: IconChartDonut3,
    children: [
      {
        id: uniqueId(),
        title: 'Student List',
        icon: IconPoint,
        href: '/admin/student-list',
      },
    ],
  },
  {
    id: uniqueId(),
    title: 'Contact Message',
    icon: IconBasket,
    href: '/admin/contact-message',

  },
  {
    id: uniqueId(),
    title: 'Announcement',
    icon: IconFileText,
    href: '/admin/announcement',
  },
  {
    id: uniqueId(),
    title: 'Logout',
    icon: IconFileText,
    href: '/admin/logout',
  },
  

];

export default Menuitems;
