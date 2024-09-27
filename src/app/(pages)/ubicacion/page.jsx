"use client"

import Mapa from '../../(components)/MapGmail.jsx';


const Ubicacion = () => {
  return (
    <div className="  md:flex justify-center items-center h-full  flex-wrap  md:w-full bg-gradient-to-r from-[#00E5B9] from-5% to-[#005B82] to-80% overflow-y-scroll md:gap-x-10 montserrat">

      <div
        className='hidden md:block md:mb-[100px]'
      >
        <h2 className='montserrat items-center text-[30px] leading-tight md:text-[40px] font-normal md:leading-[1.3] mb-7'>¿COMO LLEGAR?</h2>
        <p className='montserrat text-start text-wrap w-[400px] text-[20px] leading-tight md:text-[25px]  text-white md:leading-[1.3] mb-4'><span className="texto-borde"> Haz clic</span> en cómo llegar para ver la ruta según tu medio de transporte.</p>
      </div>

      <div
        className='block md:hidden mx-[10%] top-4 relative '
      >
        <h2 className='montserrat text-[35px] leading-tight md:text-[40px] font-normal md:leading-[1.3] mb-4'>¿COMO LLEGAR?</h2>
        <p className='montserrat text-start text-wrap w-[300px] text-[25px] leading-tight md:text-[25px]  text-white md:leading-[1.3] mb-7'><span className="texto-borde"> Haz clic</span> en ampliar el mapa para ver la ruta según tu medio de transporte.</p>
      </div>

      <div
        className='text-start bg-transparent'>
        <Mapa />
      </div>



    </div>


  );
};

export default Ubicacion
