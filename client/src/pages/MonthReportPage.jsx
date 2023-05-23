import NavBar from '../components/NavBar';
import backgroundImage from '../assets/bg.png';
import Footer from '../components/Footer';
import MonthReport from '../components/MonthReport';

export default function MonthReportPage() {
  return (
    <>
      <div
        className={`bg-[url(${backgroundImage})] , h-full flex flex-col justify-between`}
        style={{
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
        }}
      >
        <NavBar />
        <MonthReport />

        <Footer />
      </div>
    </>
  );
}
