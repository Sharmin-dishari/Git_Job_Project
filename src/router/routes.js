const routes = [
  {
    path: "",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Index.vue") }]
  },
  {
    path: "description",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/Description.vue"),
        name: "description",
        props: true
      }
    ]
  },
  {
    path: "/covid",
    component: () => import("pages/Covid.vue"),
    name: "Covid"
  },
  {
    path: "/covidHome",
    component: () => import("pages/CovidHome.vue"),
    name: "CovidHome"
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
