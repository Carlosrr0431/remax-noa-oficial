import React from 'react'

import ClipLoader from "react-spinners/ClipLoader";

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

export const Loading = () => {
    return (
        <div>    <ClipLoader
            color='#000000'
            loading={true}
            cssOverride={override}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
        /></div>
    )
}
