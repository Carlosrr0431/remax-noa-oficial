
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { PiCaretDoubleDownLight } from "react-icons/pi";
import { PiCaretDoubleUpLight } from "react-icons/pi";
import { ModalUser } from "./ModalUser";
import ModalPlan from "./ModalPlan";

const Accordion = () => {

  const [accordionOpen, setAccordionOpen] = useState(false);
  const [showModal, setShowModal] = useState(false)
  const [showModal2, setShowModal2] = useState(false)
  const [info, setInfo] = useState({})

  return (
    <div className="py-2  w-[300px] bg-white mt-4 rounded-md px-2">
      <button
        onClick={() => setAccordionOpen(!accordionOpen)}
        className="flex justify-between w-full  text-black "
      >
        <div class="flex items-center gap-3 text-white">
          {/* <Image width={0} height={0} src="https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg"
            alt="John Michael" class="relative inline-block h-9 w-9 !rounded-full object-cover object-center" /> */}
          <div class="flex flex-col">
            <p class="block font-sans text-[18px] px-4 antialiased  font-normal text-start leading-normal text-black">
              Cual es tu consulta?
            </p>
            {/* <p
              class="block font-sans text-[12px] antialiased font-normal text-start leading-normal text-white opacity-70 text-wrap break-words w-[120px]">
              {session?.user?.email}
            </p> */}



          </div>


        </div>

        <div className="flex">
          <div class="w-max -mt-1">



          </div>

        </div>
        {accordionOpen ? <PiCaretDoubleUpLight className="transform origin-center transition-all duration-400 ease-out w-7 h-7" color="#000000" /> : <PiCaretDoubleDownLight className="transform origin-center transition-all duration-400 ease-out w-7 h-7" color="#000000" />}
      </button>
      <div
        className={`grid mt-4 overflow-hidden transition-all duration-300 ease-in-out text-slate-600 text-sm ${accordionOpen
          ? "grid-rows-[1fr] opacity-100"
          : "grid-rows-[0fr] opacity-0"
          }`}
      >
        <div className="overflow-hidden flex flex-col sm:flex sm:flex-row md:justify-between items-start w-[100%] justify-center gap-y-4">

          <div className="items-center md:ml-12 ml-0">
            {/* <p class="block font-sans text-[15px] antialiased  text-start leading-normal text-gray-900 font-semibold">
              Vencimiento:<span className="text-gray-800 font-normal"> {usuario?.fechaVencimiento.split('-').reverse().join('/')}</span>
            </p> */}
            <p class="block font-sans text-[15px] antialiased  text-start leading-normal text-gray-900 font-semibold">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Et quos porro beatae voluptates fugit voluptate.<span className="text-gray-800 font-normal"></span>
            </p>





          </div>




          {
            <div>

            </div>


          }

          <div class="w-max  -mt-1 px-4">

            {/* usuario?.ingresoApp ==  "Sin solicitar" */}
            {/* usuario?.ingresoApp == "Solicitar ingreso" */}

          </div>




        </div>


      </div>

      {
        showModal && <ModalUser info={info} setShowModal={setShowModal} />
      }

      {
        showModal2 && <ModalPlan setShowModal2={setShowModal2} />
      }
    </div>
  );
};

export default Accordion;