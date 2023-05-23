import NavBar from '../components/NavBar';
import backgroundImage from '../assets/bg.png';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import YearReport from '../components/YearReport';

export default function MonthReportPage() {
  return (
    <>
      <div
        className={`bg-[url(${backgroundImage})] , h-full flex flex-col`}
        style={{
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
        }}
      >
        <NavBar />
        <SearchBar />
        <YearReport />

        <Footer />
      </div>
    </>
  );
}
