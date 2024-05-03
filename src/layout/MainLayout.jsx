import { Outlet} from 'react-router-dom';
import Sidebar from '@/CustomComponets/Sidebar';
import Topbar from '@/CustomComponets/Topbar';

const MainLayout = () => {
  return (
    <>
      <Topbar/>
      <Sidebar/>
      <Outlet/>
    </>
  )
}

export default MainLayout
