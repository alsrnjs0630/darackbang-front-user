import { Typography,} from "@material-tailwind/react";


import React from "react";
import Star from "../../utils/Star";
import musa from "../../images/musa.jpeg";
import sharon from "../../images/sharon.jpeg";


const NewsComponent = () => {
    return (
        <div className='w-full  py-16 lg:px-8 px-4 bg-gray-50'>
            <>
                <div className='mb-8'>
                    <Typography className='text-2xl font-extrabold font-poppins mb-3'>
                        뉴스
                    </Typography>
                    <Typography className='font-poppins text-sm'>
                        Meetup has helped me build me healthy relationships with great people
                        all around the world. I wished I had found you earlier...
                    </Typography>
                </div>
            </>
        </div>
    );
};

export default NewsComponent;
