import React, { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";

const BackToTopButton = () => {
    const [backToTopButton, setBackToTopButton] = useState(false);

    useEffect(() => {

        window.addEventListener("scroll", () => {

            let scroll = document.documentElement.scrollTop
            console.log(scroll);
        })


    }, [])



    return (



        <button className="fixed bottom-[50px] right-[50px] height-[50px] width-[50px] ">
            Subir
        </button>



    );
};



export default BackToTopButton;