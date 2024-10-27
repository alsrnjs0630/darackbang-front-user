import {useState} from "react";
import {createSearchParams, useNavigate, useSearchParams} from "react-router-dom";

const getNum = (param, defaultValue) => {
    if (!param) {
        return defaultValue;
    }
    return parseInt(param);
}

const useCustomMove = () => {
    const navigate = useNavigate()
    const [refresh, setRefresh] = useState(false)

    const [queryParams] = useSearchParams()

    const page = getNum(queryParams.get("page"), 0)
    const size = getNum(queryParams.get("size"), 12)

    const eventPage = getNum(queryParams.get("page"), 0)
    const eventSize = getNum(queryParams.get("size"), 5)

    const queryDefault = createSearchParams({page, size}).toString()
    const eventQueryDefault = createSearchParams({eventPage, eventSize}).toString()

    const moveToList = (pageParam) => {
        let queryStr = "";

        if (typeof pageParam === 'number') {
            const pageNum = pageParam;
            // pageParam이 숫자일 때만 page 파라미터를 사용하고, size가 기본값(12)일 때는 제외
            queryStr = size !== 12
                ? createSearchParams({ page: pageNum, size }).toString()
                : createSearchParams({ page: pageNum }).toString();
        } else {
            queryStr = queryDefault;
        }

        navigate({
            pathname: `/`,
            search: queryStr
        });

        setRefresh(!refresh);
    };

    const moveToEventList = (pageParam) => {
        let queryStr = "";

        if (typeof pageParam === 'number') {
            const pageNum = pageParam;
            // pageParam이 숫자일 때만 page 파라미터를 사용하고, size가 기본값(5)일 때는 제외
            queryStr = eventSize !== 5
                ? createSearchParams({ page: pageNum, size }).toString()
                : createSearchParams({ page: pageNum }).toString();
        } else {
            queryStr = eventQueryDefault;
        }

        navigate({
            pathname: '/event',
            search: queryStr
        });

        setRefresh(!refresh);
    };

    const moveToRead = (num) => {
        console.log(queryParams)
        console.log("아이디------------>",num)

        navigate({
            pathname: `../read/${num}`,
        })
    }

    const moveToEventRead = (num) => {
        console.log(queryParams)
        console.log("아이디------------>",num)

        navigate({
            pathname: `../event/read/${num}`,
        })
    }

    return {moveToList, moveToEventList, moveToRead, moveToEventRead, page, size, refresh}
}

export default useCustomMove
