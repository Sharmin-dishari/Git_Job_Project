const routes = [
  {
    path: "/gitjobs",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Index.vue") },
      {
        path: "description",
        component: () => import("pages/Description.vue"),
        name: "description"
      }
    ]
  },
  // {
  //   path: "/covidHome",
  //   component: () => import("pages/CovidHome.vue"),
  //   name: "CovidHome"
  // },

  {
    path: "/",
    component: () => import("layouts/CovidLayout"),
    children: [
      {
        path: "",
        component: () => import("pages/Covid.vue"),
        name: "Covid",
        props: true
      },
      {
        path: "report",
        component: () => import("pages/ReportTable.vue"),
        name: "report",
        props: true
      },
      {
        path: "graph",
        component: () => import("pages/StatisticsCovid.vue"),
        name: "graph",
        props: true
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
