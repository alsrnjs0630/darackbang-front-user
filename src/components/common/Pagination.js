import React, {useState} from "react";
import {Button, ButtonGroup, IconButton} from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

const Pagination = () => {

    const [active, setActive] = useState(1);


    const next = () => {
        if (active === 5) return;

        setActive(active + 1);
    };

    const prev = () => {
        if (active === 1) return;

        setActive(active - 1);
    };

    return (
        <ButtonGroup variant="outlined">
            <IconButton onClick={prev}>
                <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />
            </IconButton>
            <IconButton >1</IconButton>
            <IconButton >2</IconButton>
            <IconButton >3</IconButton>
            <IconButton >4</IconButton>
            <IconButton >5</IconButton>
            <IconButton onClick={next}>
                <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
            </IconButton>
        </ButtonGroup>
    );
}

export default Pagination;