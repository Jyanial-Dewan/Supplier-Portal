import { Outlet} from 'react-router-dom';
//import Sidebar from '@/CustomComponets/Sidebar';
import Topbar from '@/CustomComponets/Topbar';
import ProSidebar from '@/CustomComponets/ProSidebar';

const MainLayout = () => {
  return (
    <>
      <Topbar/>
      <ProSidebar/>
      <Outlet/>
    </>
  )
}

export default MainLayout
