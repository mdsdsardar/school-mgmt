import { useDispatch } from "react-redux";

// config/sidebarConfig.js
export const sidebarMenuItems = [
  {
    type: "link",
    label: "Dashboard",
    path: "/",
    icon: "tachometer",
    roles: ["admin", "teacher", "student"], // Available for all
  },
  {
    type: "dropdown",
    title: "Teachers",
    icon: "person-chalkboard",
    roles: ["admin"], // Only admin can see
    items: [
      { label: "All Teachers", path: "/admin/all/teachers", icon: "list" },
      {
        label: "Create Teacher ID",
        path: "/register/teacher",
        icon: "user-plus",
      },
    ],
  },
  {
    type: "dropdown",
    title: "Students",
    icon: "users",
    roles: ["admin"], // Only admin
    items: [
      { label: "All Students", path: "/admin/all/students", icon: "list" },
      {
        label: "Create Student ID",
        path: "/register/student",
        icon: "user-plus",
      },
    ],
  },
  {
    type: "dropdown",
    title: "Subjects",
    icon: "book",
    roles: ["admin"], // Only admin
    items: [
      { label: "All Subjects", path: "/admin/all/subjects", icon: "list" },
      { label: "Add Subject", path: "/admin/create/subjects", icon: "plus" },
    ],
  },
  {
    type: "dropdown",
    title: "AcademicTerm",
    icon: "school",
    roles: ["admin"], // Only admin
    items: [
      {
        label: "All AcademicTerms",
        path: "/admin/all/academic-term",
        icon: "list",
      },
      {
        label: "Add AcademicTerm",
        path: "/admin/create/academic-term",
        icon: "plus",
      },
    ],
  },
  {
    type: "dropdown",
    title: "YearGroup",
    icon: "calendar",
    roles: ["admin"], // Only admin
    items: [
      { label: "All YearGroups", path: "/admin/all/year-group", icon: "list" },
      {
        label: "Add YearGroup",
        path: "/admin/create/year-group",
        icon: "plus",
      },
    ],
  },
  {
    type: "dropdown",
    title: "ClassLevel",
    icon: "building-columns",
    roles: ["admin"], // Only admin
    items: [
      { label: "All ClassLevels", path: "/admin/all/classLevel", icon: "list" },
      {
        label: "Add ClassLevel",
        path: "/admin/create/classLevel",
        icon: "plus",
      },
    ],
  },
  {
    type: "dropdown",
    title: "Program",
    icon: "graduation-cap",
    roles: ["admin"], // Only admin
    items: [
      { label: "All Programs", path: "/admin/all/program", icon: "list" },
      { label: "Add Program", path: "/admin/create/program", icon: "plus" },
    ],
  },
  {
    type: "dropdown",
    title: "AcedemicYear",
    icon: "calendar",
    roles: ["admin"], // Only admin
    items: [
      {
        label: "All AcedemicYears",
        path: "/admin/all/academic-year",
        icon: "list",
      },
      {
        label: "Add AcedemicYear",
        path: "/admin/create/academic-year",
        icon: "plus",
      },
    ],
  },
  {
    type: "dropdown",
    title: "Exams",
    icon: "microchip",
    roles: ["teacher"], // Only teacher
    items: [
      { label: "All Exams", path: "/admin/all/exam", icon: "list" },
      { label: "Create Exam", path: "/admin/create/exam", icon: "plus" },
    ],
  },
  {
    type: "dropdown",
    title: "Exams",
    icon: "microchip",
    roles: ["student"], // Only teacher
    items: [
      { label: "Write Exam", path: "/student/list/exam", icon: "list" },
      {
        label: "View Exam Result",
        path: "/student/list/exam-result",
        icon: "list",
      },
    ],
  },
  {
    type: "dropdown",
    title: "Exams",
    icon: "microchip",
    roles: ["admin"], // Only teacher
    items: [
      {
        label: "Exam Result",
        path: "/admin/list/exam-result",
        icon: "list",
      },
    ],
  },
  {
    type: "dropdown",
    title: "Questions",
    icon: "microchip",
    roles: ["teacher"], // Only teacher
    items: [
      { label: "All Questions", path: "/teacher/all/question", icon: "list" },
      {
        label: "Create Question",
        path: "/teacher/create/question",
        icon: "plus",
      },
    ],
  },
  {
    type: "dropdown",
    title: "My Courses",
    icon: "graduation-cap",
    roles: ["student"], // Only student
    items: [
      { label: "Enrolled", path: "/student/courses", icon: "list" },
      { label: "Grades", path: "/student/grades", icon: "star" },
    ],
  },
];

export const getProfileItems = (handleLogout) => ({
  title: "Profile",
  icon: "user-circle",
  roles: ["admin", "teacher", "student"],
  items: [
    {
      label: "My Profile",
      path: "/profile",
      icon: "user",
      roles: ["admin", "teacher", "student"],
    },
    {
      label: "Sign-up",
      path: "/register/admin",
      icon: "user-plus",
      roles: ["admin"],
    },
    {
      label: "Logout",
      onClick: handleLogout,
      icon: "sign-out",
      roles: ["admin", "teacher", "student"],
    },
  ],
});
