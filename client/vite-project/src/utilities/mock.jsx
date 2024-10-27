

import { MainLayout } from "../layouts";
import AddList from "../pages/main/AddList";
import Home from "../pages/main/Home";

export const routesData = [
  {
    path: "/",
    exact: true,
    component: AddList,
    layout: MainLayout,
  },
  {
    path: "/update-book/:bookId",
    exact: true,
    component: AddList,
    layout: MainLayout,
  },
  {
    path: "/book-list",
    exact: true,
    component: Home,
    layout: MainLayout,
  },
];
