import React, {useEffect, useState} from 'react';
import { useAuth } from '~/context';
import '~/styles/admin-page.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { BiSupport } from "react-icons/bi";
import { RiMenuUnfoldFill } from "react-icons/ri";
import { RiMenuFoldFill } from "react-icons/ri";
import { AdminHeader, ApplicationDetail, TicketsPanel } from '~/components';

const menuItems = [
  {
    title: 'Destek Talepleri',
    icon: <BiSupport size={24} />,
    link: '/admin/tickets',
    tab: 'tickets',
  },
  {
    title: 'Kullanıcılar',
    icon: <BiSupport size={24} />,
    link: '/admin/users',
    tab: 'users',
  },
  {
    title: 'Kategoriler',
    icon: <BiSupport size={24} />,
    link: '/admin/categories',
    tab: 'categories',
  },
  {
    title: 'Raporlar',
    icon: <BiSupport size={24} />,
    link: '/admin/reports',
    tab: 'reports',
  }
];

const AdminPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [openSidebar, setOpenSidebar] = useState(true);
  const {tab} = useParams();
  const isMobile = window.innerWidth <= 768;
  console.log(isMobile);

  const toggleSidebar = () => {
    setOpenSidebar(!openSidebar);
  };

  useEffect(() => {
    if (!tab) {
      navigate('/admin/tickets');
    }
  }, [tab]);

  useEffect(() => {
    if (isMobile) {
      setOpenSidebar(false);
      console.log('mobile')
    }
    console.log('desktop')
  }, [isMobile]);

  return (
    <div className={`admin-page-wrapper ${openSidebar ? 'open' : 'closed'} ${isMobile ? 'mobile' : ''}`}>
      <aside className='admin-page-menu'>
        <div className='menu-title'>
        {openSidebar ? (
            <>
            <RiMenuFoldFill className='menu-icon' size={48} onClick={toggleSidebar} />
            <p className={openSidebar ? 'visible' : ''}>Help Desk</p></>
        ) : (
          <RiMenuUnfoldFill className='menu-icon' size={48} onClick={toggleSidebar} />
        )}
          </div>
        <ul className={`menu-list ${!openSidebar ? 'closed' : ''}`}>
          {menuItems.map((item, index) => (
            <li key={index} onClick={() => navigate(item.link)} className={`tab ${item.tab === tab ? 'active-tab': ''}`}>
              <p className='tab-icon'>{item.icon}</p>
              <p className={`tab-title ${!openSidebar ? 'closed' : ''}`}>{item.title}</p>
            </li>
          ))}
        </ul>
      </aside>
      <main className='main'>
        <AdminHeader user={user}/>
        <div className='content'>
        {(() => {
            switch (tab) {
              case 'tickets':
                return <TicketsPanel />;
              case 'users':
                return <div>Users</div>;
              case 'categories':
                return <div>Categories</div>;
              case 'reports':
                return <div>Reports</div>;
                case 'application-detail':
                return <ApplicationDetail />;
              default:
                return <div>Tickets</div>;
            }
          })()}
        </div>
      </main>
    </div>
  );
};

export default AdminPage;
