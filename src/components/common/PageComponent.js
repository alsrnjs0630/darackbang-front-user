import { useLocation } from "react-router-dom";

const PageComponent = ({ serverData, movePage }) => {
    // 현재 경로 가져오기
    const location = useLocation();

    return (
        <div className="mt-10 mb-0 flex justify-center">
            {serverData.prev ? (
                <div
                    className="grid place-items-center m-2 mx-3 pb-0.5 w-8 font-bold text-center text-base text-indigo-600 cursor-pointer"
                    onClick={() => movePage(serverData.prevPage)}
                >
                    Prev
                </div>
            ) : null}

            {serverData.pageNumbers.map((pageNum) => (
                <div
                    key={pageNum}
                    className={`grid place-items-center m-2 mx-1 pb-0.5 w-8 h-10 text-base rounded-lg cursor-pointer
                     ${serverData.current === pageNum ||
                    (location.pathname === "/" && serverData.current === 0 && pageNum === 1) ||
                    (location.pathname === "/event" && serverData.current === 0 && pageNum === 1)
                        ? 'bg-indigo-200 shadow-md text-white'
                        : 'bg-gray-200 shadow-none text-gray-700'}`}
                    onClick={() => movePage(pageNum)}
                >
                    {pageNum}
                </div>
            ))}

            {serverData.next ? (
                <div
                    className="grid place-items-center m-2 mx-3 pb-0.5 w-8 font-bold text-center text-base text-indigo-600 cursor-pointer"
                    onClick={() => movePage(serverData.nextPage)}
                >
                    Next
                </div>
            ) : null}
        </div>
    );
};

export default PageComponent;
