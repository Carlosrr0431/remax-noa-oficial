"use client";
import React from 'react';


const Mapa = () => {


  // style={{ height: "50vh", width: "50vw" }}

  return (

    //   <MapContainer style={{ height: "50vh", width: "50vw" }} center={center} zoom={13} scrollWheelZoom={false}>
    //   <TileLayer
    //     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    //     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    //   />
    //   <LayersControl position="topright">
    //     <LayersControl.Overlay name="Marker with popup">
    //       <Marker position={center}>
    //         <Popup>
    //           A pretty CSS3 popup. <br /> Easily customizable.
    //         </Popup>
    //       </Marker>
    //     </LayersControl.Overlay>
    //     <LayersControl.Overlay checked name="Layer group with circles">
    //       <LayerGroup>
    //         <Circle
    //           center={center}
    //           pathOptions={{ fillColor: 'blue' }}
    //           radius={200}
    //         />
    //         <Circle
    //           center={center}
    //           pathOptions={{ fillColor: 'red' }}
    //           radius={100}
    //           stroke={false}
    //         />
    //         <LayerGroup>
    //           <Circle
    //             center={[51.51, -0.08]}
    //             pathOptions={{ color: 'green', fillColor: 'green' }}
    //             radius={100}
    //           />
    //         </LayerGroup>
    //       </LayerGroup>
    //     </LayersControl.Overlay>
    //     <LayersControl.Overlay name="Feature group">
    //       <FeatureGroup pathOptions={{ color: 'purple' }}>
    //         <Popup>Popup in FeatureGroup</Popup>
    //         <Circle center={[51.51, -0.06]} radius={200} />
    //         <Rectangle bounds={rectangle} />
    //       </FeatureGroup>
    //     </LayersControl.Overlay>
    //   </LayersControl>
    // </MapContainer>
    // <iframe  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3621.916266010462!2d-65.40195892588464!3d-24.7983206081962!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x941bc39e1ae3949b%3A0xee7382ed15e6a106!2sJ.%20A.%20Fern%C3%A1ndez%20630%2C%20Salta!5e0!3m2!1ses-419!2sar!4v1708797876215!5m2!1ses-419!2sar" width="600" height="450" className="border-0 rounded-[25px]" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade" frameborder="0" ></iframe>

    <div className='mb-[100px]'>
      {/* <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3621.916266010462!2d-65.40195892588464!3d-24.7983206081962!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x941bc39e1ae3949b%3A0xee7382ed15e6a106!2sJ.%20A.%20Fern%C3%A1ndez%20630%2C%20Salta!5e0!3m2!1ses-419!2sar!4v1708797876215!5m2!1ses-419!2sar" width="600" height="450" className="border-0 h-[50vh] w-[50vw] rounded-[15px] shadow-2xl shadow-black/60 " frameborder="0" aria-hidden="true" tabindex="-1" ></iframe> */}



      <iframe src="https://www.google.com/maps/embed?pb=!1m23!1m12!1m3!1d115939.53276460843!2d-65.47701404794573!3d-24.757403666442457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x941bc34b1c9f8bc9%3A0x5c5234a8c7766027!2sLos%20Raulies%20238%2C%20A4400%20Salta!3m2!1d-24.757426199999998!2d-65.3946125!5e0!3m2!1ses-419!2sar!4v1722876198582!5m2!1ses-419!2sar" width="600" height="450" className="border-0 h-[50vh] w-[80vw] items-center mx-auto md:h-[50vh] md:w-[50vw] rounded-[15px]  " frameborder="0"  aria-hidden="true" tabindex="-1"></iframe>


    </div>
  )
};

export default Mapa;