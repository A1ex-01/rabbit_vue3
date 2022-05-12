import { createRouter, createWebHistory } from "vue-router";
import { getCookie } from "@/utils/cookie";

const routes = [
  {
    path: "/",
    component: () => import("../views/home/Home.vue"),
    children: [
      {
        path: "/",
        redirect: "home",
      },
      {
        path: "home",
        component: () => import("@/views/home/HomeIndex.vue"),
        beforeEnter(to, from, next) {
          if (getCookie("token")) {
            next();
          } else {
            next("/login");
          }
        },
      },
      {
        path: "category/:id",
        component: () => import("@/views/category/Category.vue"),
      },
      {
        path: "category/sub/:id",
        component: () => import("@/views/category/GoodsChoose.vue"),
      },
      {
        path: "product/:id",
        component: () => import("@/views/product/Product.vue"),
      },
      {
        path: "cart",
        component: () => import("../views/cart/Cart.vue"),
      },
      {
        path: "member",
        component: () => import("../views/myself/Myself.vue"),
        redirect: "/member/personal",
        children: [
          {
            path: "mystatus",
            component: () => import("../views/myself/PersonCentrol.vue"),
          },
          {
            path: "personal",
            component: () => import("../views/myself/Personal.vue"),
          },
          {
            path: "order",
            component: () => import("../views/myself/Order.vue"),
          },
          {
            path: "addr",
            component: () => import("../views/myself/AddrShow.vue"),
          },
          {
            path: "payDetail/:id",
            component: () => import("../views/pay/PayDetail.vue"),
          },
        ],
      },
      {
        path: "checkout",
        component: () => import("../views/pay/CheckoutOrder.vue"),
      },
      {
        path: "pay/:id",
        component: () => import("../views/pay/Pay.vue"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("../views/login/Login.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
