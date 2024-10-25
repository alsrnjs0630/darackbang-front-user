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

    const queryDefault = createSearchParams({page, size}).toString()

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

    const moveToModify = (num) => {
        console.log(queryDefault)
        navigate({
            pathname: `../modify/${num}`,
            search: queryDefault
        })
    }

    const moveToRead = (num) => {
        console.log(queryParams)
        console.log("아이디------------>",num)

        navigate({
            pathname: `../read/${num}`,
        })
    }

    const moveToCreate = () => {

        navigate({
            pathname: `../create`,
        })
    }

    return {moveToList, moveToModify, moveToRead, moveToCreate, page, size, refresh}
}

export default useCustomMove
