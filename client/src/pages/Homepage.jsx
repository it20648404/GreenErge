import NavBar from '../components/NavBar';
import backgroundImage from '../assets/bg.png';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';

export default function Homepage() {
  return (
    <>
      <div
        className={`bg-[url(${backgroundImage})] , h-screen`}
        style={{
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
        }}
      >
        <NavBar />
        <SearchBar />
        <h1>Homepage</h1>
        <Footer />
      </div>
    </>
  );
}
