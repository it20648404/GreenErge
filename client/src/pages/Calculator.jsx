import NavBar from '../components/NavBar';
import backgroundImage from '../assets/bg.png';
import Footer from '../components/Footer';
import CalculatorAdd from '../components/CalculatorAdd';
import SearchBar from '../components/SearchBar';

export default function Calculator() {
  return (
    <>
      <div
        className={`bg-[url(${backgroundImage})] , h-full`}
        style={{
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
        }}
      >
        <NavBar />
        <SearchBar />
        <CalculatorAdd />
        <Footer />
      </div>
    </>
  );
}
