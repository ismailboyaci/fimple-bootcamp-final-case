import React, {useEffect, useState} from 'react';
import { useAuth } from '~/context';
import '~/styles/admin-page.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { BiSupport } from "react-icons/bi";
import { RiMenuUnfoldFill } from "react-icons/ri";
import { RiMenuFoldFill } from "react-icons/ri";
import { AdminHeader, AdminReports, ApplicationDetail, TicketsPanel, UserPanel } from '~/components';
import { useTranslation } from 'react-i18next';

const menuItems = [
  {
    title: 'request_supports',
    icon: <BiSupport size={24} />,
    link: '/admin/tickets',
    tab: 'tickets',
  },
  {
    title: 'reports',
    icon: <BiSupport size={24} />,
    link: '/admin/reports',
    tab: 'reports',
  },
  {
    title: 'users',
    icon: <BiSupport size={24} />,
    link: '/admin/users',
    tab: 'users',
  }
];

const AdminPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [openSidebar, setOpenSidebar] = useState(true);
  const {tab} = useParams();
  const isMobile = window.innerWidth <= 768;
  const { t } = useTranslation();

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
              <p className={`tab-title ${!openSidebar ? 'closed' : ''}`}>{t(item.title)}</p>
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
                return <UserPanel />;
              case 'reports':
                return <AdminReports />;
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
