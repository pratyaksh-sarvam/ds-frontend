import { useEffect, useState } from 'react'
import InputForm from './components/InputForm'
import Viewer from './components/Viewer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [formData, setFormData] = useState(null);

  const handleSubmitForm = (val) => {
    console.log(val);
    setFormData(val);
  }

  return (
    <>
      <div className='bg-black w-full min-h-[100vh] text-white flex flex-col gap-y-4 items-center'>
        {/* Heading Section */}
        <div className="w-full text-center py-8 mb-4">
          <h1 className="text-4xl font-bold relative group">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-color-1 to-color-5 
                       hover:from-color-2 hover:to-color-3 transition-all duration-500">
              Dataset Viewer
            </span>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 group-hover:w-full 
                      h-0.5 bg-color-1 transition-all duration-500"></div>
          </h1>
        </div>

        {/* Main Content */}
        <InputForm handleSubmitForm={handleSubmitForm} />
        <Viewer inputData={formData} />

        {/* Toast Container (commented) */}
        {/* <ToastContainer 
          position="bottom-center" 
          autoClose={500}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          theme="colored"
          className='text-[16px] text-center'
          limit={1}
        /> */}
      </div>
    </>
  )
}

export default App