import NavBar from '../components/NavBar';
import backgroundImage from '../assets/bg.png';
import Footer from '../components/Footer';
import CalculatorUpdate from '../components/CalculatorUpdate';
import SearchBar from '../components/SearchBar';

export default function CalculatorUpdatePage() {
  return (
    <>
      <div
        className={`bg-[url(${backgroundImage})] h-full flex flex-col`}
        style={{
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
        }}
      >
        <NavBar />
        <SearchBar />

        <div className="flex flex-col items-center">
          <CalculatorUpdate />
        </div>

        <Footer />
      </div>
    </>
  );
}
