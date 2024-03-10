import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/dataTables";
import RTL from "views/admin/rtl";

// Auth Imports
import SignInCentered from "views/auth/signIn";
import CustomerForm from "views/admin/dataTables/components/CustomerForm";
import TransactionForm from "views/admin/profile/components/TransactionForm";
import TransactionDetail from "views/admin/profile/components/TransactionDetail";

const routes = [
  {
    name: "Dashboard",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdHome} width='20px' height='20px' color='#2F2F2F' />,
    component: MainDashboard,
    display:true
  },
  // {
  //   name: "Customers",
  //   layout: "/admin",
  //   path: "/customers",
  //   icon: (
  //     <Icon
  //       as={MdOutlineShoppingCart}
  //       width='20px'
  //       height='20px'
  //       color='inherit'
  //     />
  //   ),
  //   component: NFTMarketplace,
  //   secondary: true,
  // },
  {
    name: "Customers",
    layout: "/admin",
    icon: <Icon as={MdBarChart} width='20px' height='20px' color='#2F2F2F' />,
    path: "/data-tables",
    component: DataTables,
    display:true,
  exact:true,
    // children: [
    //   {
    //     name: "Profile",
    //     layout: "/admin/data-tables",
    //     path: "/profile",
    //     icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
    //     component: Profile,
    //   },
    // ],
  },

  {
    name: "Profile",
    layout: "/admin",
    path: "/data-tables/profile/:id/Transaction/:tid",
    // icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
    component: TransactionDetail,
    display:false
  },  

  {
    name: "Profile",
    layout: "/admin",
    path: "/data-tables/profile/:id/addTransaction",
    // icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
    component: TransactionForm,
    display:false
  },  
  {
    name: "Profile",
    layout: "/admin",
    path: "/data-tables/profile/:id",
    icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
    component: Profile,
    display:false
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "/data-tables/addCustomer",
    // icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
    component: CustomerForm,
    display:false
  }
];

export default routes;
