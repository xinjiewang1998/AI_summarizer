import Header from "./components/Header";
import Search from "./components/Search";

import "./App.css";

const App = () => {
  return (
    <main>
      <div className='main'>
        <div className='gradient' />
      </div>

      <div className="relative z-10 flex justify-center items-center flex-col max-w-7xl mx-auto sm:px-16 px-6">
        <Header />
        <Search />
      </div>
    </main>
  );
};

export default App;
