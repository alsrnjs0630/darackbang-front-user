const PageComponent = ({serverData, movePage}) => {
    const currentPath = window.location.pathname;

    return (
        <div className="m-6 flex justify-center">
            {serverData.prev ?
                <div
                    className="grid place-items-center m-2 mx-3 pb-0.5 w-8 font-bold text-center text-base text-indigo-600 cursor-pointer"
                    onClick={() => movePage({page: serverData.prevPage})}> Prev </div> : <></>}
            {serverData.pageNumbers.map(pageNum =>
                <div key={pageNum}
                     className={`grid place-items-center m-2 mx-1 pb-0.5 w-8 h-10 text-base rounded-lg cursor-pointer
                     ${(serverData.current === pageNum || (currentPath === "/list" && serverData.current === 0 && pageNum === 1)) ? 'bg-indigo-200 shadow-md text-white' : 'bg-gray-200 shadow-none text-gray-700'}`}
                     onClick={() => movePage({page: pageNum})}>
                {pageNum} </div>
            )}
            {serverData.next ? <div
                className="grid place-items-center m-2 mx-3 pb-0.5 w-8 font-bold text-center text-base text-indigo-600 cursor-pointer"
                onClick={() => movePage({page: serverData.nextPage})}> Next
            </div> : <></>}
        </div>
    );
}

export default PageComponent;