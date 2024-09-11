import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
} from "@material-tailwind/react";

import React from "react";


import {Link, useLocation, useSearchParams} from "react-router-dom";


const SideMenu = () => {

    const location = useLocation(); // Get the current route

    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');

    const isActive = (path) => location.pathname+"?category="+category === path ? 'text-purple-800 underline' : 'text-purple-600'; // Helper to add focus class

    return (
        <>
            <Card className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
                <List>
                    <ListItem>
                        <Typography className={`font-bold text-lg font-poppins ${isActive('/product?category=T01')}`}>
                            <Link to="/product?category=T01">입차</Link>
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography className={`font-bold text-lg font-poppins ${isActive('/product?category=B01')}`}>
                            <Link to="/product?category=B01">티백</Link>
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography className={`font-bold text-lg font-poppins ${isActive('/product?category=F01')}`}>
                            <Link to="/product?category=F01">열매</Link>
                        </Typography>
                    </ListItem>
                </List>
            </Card>
        </>
    );
};

export default SideMenu;
