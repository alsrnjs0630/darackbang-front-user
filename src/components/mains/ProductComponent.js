import {Link} from "react-router-dom";
import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import {useState} from "react";


export function DefaultPagination() {
    const [active, setActive] = useState(1);

    const getItemProps = (index) =>
        ({
            variant: active === index ? "filled" : "text",
            color: "gray",
            onClick: () => setActive(index),
        });

    const next = () => {
        if (active === 5) return;

        setActive(active + 1);
    };

    const prev = () => {
        if (active === 1) return;

        setActive(active - 1);
    };

    return (
        <div className="flex justify-center items-center gap-4">
            <Button
                variant="text"
                className="flex items-center gap-2"
                onClick={prev}
                disabled={active === 1}
            >
                <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
            </Button>
            <div className="flex items-center gap-2">
                <IconButton {...getItemProps(1)}>1</IconButton>
                <IconButton {...getItemProps(2)}>2</IconButton>
                <IconButton {...getItemProps(3)}>3</IconButton>
                <IconButton {...getItemProps(4)}>4</IconButton>
                <IconButton {...getItemProps(5)}>5</IconButton>
            </div>
            <Button
                variant="text"
                className="flex items-center gap-2"
                onClick={next}
                disabled={active === 5}
            >
                Next
                <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
            </Button>
        </div>
    );
}

const productComponent = () => {
    return (
        <section className="w-full"> {/* 전체 너비로 설정하고 배경색 추가 */}
            <div className="flex justify-center"> {/* 가로 방향으로 가운데 정렬 */}
                <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        <Link to="javascript:;"
                           className="mx-auto sm:mr-0 group cursor-pointer lg:mx-auto bg-white transition-all duration-500">
                            <div className="">
                                <img src="images/products/상품1.png" alt="face cream image"
                                     className="w-full aspect-square rounded-2xl object-cover"/>
                            </div>
                            <div className="mt-5">
                                <div className="flex items-center justify-between">
                                    <h6
                                        className="font-semibold text-xl leading-8 text-black transition-all duration-500 group-hover:text-indigo-600">
                                        Face cream</h6>
                                    <h6 className="font-semibold text-xl leading-8 text-indigo-600">$100</h6>
                                </div>
                                <p className="mt-2 font-normal text-sm leading-6 text-gray-500">Orange & Aloe Vera</p>
                            </div>
                        </Link>

                        <Link to="javascript:;"
                           className="mx-auto sm:ml-0 group cursor-pointer lg:mx-auto bg-white transition-all duration-500">
                            <div className="">
                                <img src="https://pagedone.io/asset/uploads/1700726174.png" alt="plastic bottle image"
                                     className="w-full aspect-square rounded-2xl object-cover"/>
                            </div>
                            <div className="mt-5">
                                <div className="flex items-center justify-between">
                                    <h6
                                        className="font-semibold text-xl leading-8 text-black transition-all duration-500 group-hover:text-indigo-600">
                                        Plastic bottle</h6>
                                    <h6 className="font-semibold text-xl leading-8 text-indigo-600">$40</h6>
                                </div>
                                <p className="mt-2 font-normal text-sm leading-6 text-gray-500">Black color</p>
                            </div>
                        </Link>

                        <Link to="javascript:;"
                           className="mx-auto sm:mr-0 group cursor-pointer lg:mx-auto bg-white transition-all duration-500">
                            <div className="">
                                <img src="https://pagedone.io/asset/uploads/1700726191.png" alt="cream image"
                                     className="w-full aspect-square rounded-2xl object-cover"/>
                            </div>
                            <div className="mt-5">
                                <div className="flex items-center justify-between">
                                    <h6
                                        className="font-semibold text-xl leading-8 text-black transition-all duration-500 group-hover:text-indigo-600">
                                        Men cream</h6>
                                    <h6 className="font-semibold text-xl leading-8 text-indigo-600">$100</h6>
                                </div>
                                <p className="mt-2 font-normal text-sm leading-6 text-gray-500">Aloe Vera and Neem</p>
                            </div>
                        </Link>

                        <Link to="javascript:;"
                           className="mx-auto sm:ml-0 group cursor-pointer lg:mx-auto bg-white transition-all duration-500">
                            <div className="">
                                <img src="https://pagedone.io/asset/uploads/1700726207.png" alt="perfume bottle image"
                                     className="w-full aspect-square rounded-2xl object-cover"/>
                            </div>
                            <div className="mt-5">
                                <div className="flex items-center justify-between">
                                    <h6
                                        className="font-semibold text-xl leading-8 text-black transition-all duration-500 group-hover:text-indigo-600">
                                        Cold Perfume</h6>
                                    <h6 className="font-semibold text-xl leading-8 text-indigo-600">$100</h6>
                                </div>
                                <p className="mt-2 font-normal text-sm leading-6 text-gray-500">White perfume</p>
                            </div>
                        </Link>

                        <Link to="javascript:;"
                              className="mx-auto sm:mr-0 group cursor-pointer lg:mx-auto bg-white transition-all duration-500">
                            <div className="">
                                <img src="images/products/상품1.png" alt="face cream image"
                                     className="w-full aspect-square rounded-2xl object-cover"/>
                            </div>
                            <div className="mt-5">
                                <div className="flex items-center justify-between">
                                    <h6
                                        className="font-semibold text-xl leading-8 text-black transition-all duration-500 group-hover:text-indigo-600">
                                        Face cream</h6>
                                    <h6 className="font-semibold text-xl leading-8 text-indigo-600">$100</h6>
                                </div>
                                <p className="mt-2 font-normal text-sm leading-6 text-gray-500">Orange & Aloe Vera</p>
                            </div>
                        </Link>

                        <Link to="javascript:;"
                              className="mx-auto sm:ml-0 group cursor-pointer lg:mx-auto bg-white transition-all duration-500">
                            <div className="">
                                <img src="https://pagedone.io/asset/uploads/1700726174.png" alt="plastic bottle image"
                                     className="w-full aspect-square rounded-2xl object-cover"/>
                            </div>
                            <div className="mt-5">
                                <div className="flex items-center justify-between">
                                    <h6
                                        className="font-semibold text-xl leading-8 text-black transition-all duration-500 group-hover:text-indigo-600">
                                        Plastic bottle</h6>
                                    <h6 className="font-semibold text-xl leading-8 text-indigo-600">$40</h6>
                                </div>
                                <p className="mt-2 font-normal text-sm leading-6 text-gray-500">Black color</p>
                            </div>
                        </Link>

                        <Link to="javascript:;"
                              className="mx-auto sm:mr-0 group cursor-pointer lg:mx-auto bg-white transition-all duration-500">
                            <div className="">
                                <img src="https://pagedone.io/asset/uploads/1700726191.png" alt="cream image"
                                     className="w-full aspect-square rounded-2xl object-cover"/>
                            </div>
                            <div className="mt-5">
                                <div className="flex items-center justify-between">
                                    <h6
                                        className="font-semibold text-xl leading-8 text-black transition-all duration-500 group-hover:text-indigo-600">
                                        Men cream</h6>
                                    <h6 className="font-semibold text-xl leading-8 text-indigo-600">$100</h6>
                                </div>
                                <p className="mt-2 font-normal text-sm leading-6 text-gray-500">Aloe Vera and Neem</p>
                            </div>
                        </Link>

                        <Link to="javascript:;"
                              className="mx-auto sm:ml-0 group cursor-pointer lg:mx-auto bg-white transition-all duration-500">
                            <div className="">
                                <img src="https://pagedone.io/asset/uploads/1700726207.png" alt="perfume bottle image"
                                     className="w-full aspect-square rounded-2xl object-cover"/>
                            </div>
                            <div className="mt-5">
                                <div className="flex items-center justify-between">
                                    <h6
                                        className="font-semibold text-xl leading-8 text-black transition-all duration-500 group-hover:text-indigo-600">
                                        Cold Perfume</h6>
                                    <h6 className="font-semibold text-xl leading-8 text-indigo-600">$100</h6>
                                </div>
                                <p className="mt-2 font-normal text-sm leading-6 text-gray-500">White perfume</p>
                            </div>
                        </Link>

                        <Link to="javascript:;"
                              className="mx-auto sm:mr-0 group cursor-pointer lg:mx-auto bg-white transition-all duration-500">
                            <div className="">
                                <img src="images/products/상품1.png" alt="face cream image"
                                     className="w-full aspect-square rounded-2xl object-cover"/>
                            </div>
                            <div className="mt-5">
                                <div className="flex items-center justify-between">
                                    <h6
                                        className="font-semibold text-xl leading-8 text-black transition-all duration-500 group-hover:text-indigo-600">
                                        Face cream</h6>
                                    <h6 className="font-semibold text-xl leading-8 text-indigo-600">$100</h6>
                                </div>
                                <p className="mt-2 font-normal text-sm leading-6 text-gray-500">Orange & Aloe Vera</p>
                            </div>
                        </Link>

                        <Link to="javascript:;"
                              className="mx-auto sm:ml-0 group cursor-pointer lg:mx-auto bg-white transition-all duration-500">
                            <div className="">
                                <img src="https://pagedone.io/asset/uploads/1700726174.png" alt="plastic bottle image"
                                     className="w-full aspect-square rounded-2xl object-cover"/>
                            </div>
                            <div className="mt-5">
                                <div className="flex items-center justify-between">
                                    <h6
                                        className="font-semibold text-xl leading-8 text-black transition-all duration-500 group-hover:text-indigo-600">
                                        Plastic bottle</h6>
                                    <h6 className="font-semibold text-xl leading-8 text-indigo-600">$40</h6>
                                </div>
                                <p className="mt-2 font-normal text-sm leading-6 text-gray-500">Black color</p>
                            </div>
                        </Link>

                        <Link to="javascript:;"
                              className="mx-auto sm:mr-0 group cursor-pointer lg:mx-auto bg-white transition-all duration-500">
                            <div className="">
                                <img src="https://pagedone.io/asset/uploads/1700726191.png" alt="cream image"
                                     className="w-full aspect-square rounded-2xl object-cover"/>
                            </div>
                            <div className="mt-5">
                                <div className="flex items-center justify-between">
                                    <h6
                                        className="font-semibold text-xl leading-8 text-black transition-all duration-500 group-hover:text-indigo-600">
                                        Men cream</h6>
                                    <h6 className="font-semibold text-xl leading-8 text-indigo-600">$100</h6>
                                </div>
                                <p className="mt-2 font-normal text-sm leading-6 text-gray-500">Aloe Vera and Neem</p>
                            </div>
                        </Link>

                        <Link to="javascript:;"
                              className="mx-auto sm:ml-0 group cursor-pointer lg:mx-auto bg-white transition-all duration-500">
                            <div className="">
                                <img src="https://pagedone.io/asset/uploads/1700726207.png" alt="perfume bottle image"
                                     className="w-full aspect-square rounded-2xl object-cover"/>
                            </div>
                            <div className="mt-5">
                                <div className="flex items-center justify-between">
                                    <h6
                                        className="font-semibold text-xl leading-8 text-black transition-all duration-500 group-hover:text-indigo-600">
                                        Cold Perfume</h6>
                                    <h6 className="font-semibold text-xl leading-8 text-indigo-600">$100</h6>
                                </div>
                                <p className="mt-2 font-normal text-sm leading-6 text-gray-500">White perfume</p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <br/>
            <DefaultPagination />
        </section>

    );
}

export default productComponent;
