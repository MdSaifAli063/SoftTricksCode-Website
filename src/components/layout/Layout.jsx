import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ChatWidget from '../chat/ChatWidget';
import BookingModal from '../booking/BookingModal';
import CustomCursor from '../global/CustomCursor';
import ScrollProgress from '../global/ScrollProgress';
import ScrollToTop from '../global/ScrollToTop';
import { BookingProvider } from '../../context/BookingContext';

export default function Layout() {
  const { pathname } = useLocation();
  const [chatOpen, setChatOpen] = useState(false);
  const isHome = pathname === '/';

  return (
    <BookingProvider>
      <ScrollToTop />
      <CustomCursor />
      <ScrollProgress />
      <Navbar onChatOpen={() => setChatOpen(true)} />
      <main
        className={`min-h-screen overflow-x-clip bg-stc-black ${
          isHome ? '' : 'pt-[calc(4.5rem+env(safe-area-inset-top,0px))] sm:pt-[calc(5rem+env(safe-area-inset-top,0px))]'
        }`}
      >
        <Outlet />
      </main>
      <Footer />
      <ChatWidget open={chatOpen} onOpenChange={setChatOpen} />
      <BookingModal />
    </BookingProvider>
  );
}
