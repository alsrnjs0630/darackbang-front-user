import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Input,
} from "@material-tailwind/react";
import {useEffect, useState} from "react";
import {getList} from "../../../apis/EventApi";
import {useSearchParams} from "react-router-dom";
import useExeptionHandler from "../../../hooks/useExeptionHandler";
import useCustomMove from "../../hooks/useCustomMove";
import PageComponent from "../../common/PageComponent";

const TABLE_HEAD = ["제목", "진행상태", "시작일", "마감일"];

const getNum = (param, defaultValue) => {
    if (!param) {
        return defaultValue;
    }
    return parseInt(param);
}

const EventListComponent = () => {
    const {exceptionHandle} = useExeptionHandler()
    const {moveToEventRead, moveToEventList} = useCustomMove()
    // 선택된 검색 필드 (제목 또는 내용)를 추적하는 상태
    const [searchValue, setSearchValue] = useState(""); // 입력 필드에 입력된 값
    const [eventState, setEventState] = useState(""); // 이벤트 상태를 위한 새 상태
    const [eventData, setEventData] = useState(
        {
            contents: [],
            pageNumbers: [],
            prev: false,
            next: false,
            totalCount: 0,
            prevPage: 0,
            nextPage: 0,
            totalPage: 0,
            currentPage: 0,
            search: null
        }
    )
    const [queryParams] = useSearchParams()

    const page = getNum(queryParams.get("page"), 0)
    const size = getNum(queryParams.get("size"), 5)

    useEffect(() => {
        const params = {
            page,
            size,
            title: searchValue,
            eventState: eventState// 새로운 eventState 상태 사용
        };

        console.log("파람 정보: ", params)

        getList(params).then(data => {
            console.log("데이터:{}", data);
            // 현재 페이지 정보 추가
            const currentPage = params.page; // 현재 요청한 페이지
            setEventData({
                ...data,
                current: currentPage, // current에 현재 페이지 설정
            });
        }).catch(error => {
            exceptionHandle(error);
        });
    }, [page, size, searchValue, eventState]);

    const handleSearch = () => {
        const params = {
            page,
            size,
            title: searchValue,
            eventState: eventState// 새로운 eventState 상태 사용
        };

        console.log(params)

        getList(params).then(data => {
            console.log("데이터:{}", data);
            setEventData(data);
        }).catch(error => {
            exceptionHandle(error);
        });
    }

    return (
        <Card className="h-full w-[1000px]">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="flex justify-between gap-8 items-center">
                    <div className="mt-5 ml-2">
                        <Typography variant="h4" color="blue-gray">
                            다락방 이벤트
                        </Typography>
                        <Typography color="gray" className="font-normal">
                            다양한 혜택을 드립니다!
                        </Typography>
                    </div>
                    <div className="flex mt-4 w-full shrink-0 gap-2 md:w-max">
                        {/* 이벤트 상태 선택을 위한 새로운 드롭다운 */}
                        <select
                            name={"eventState"}
                            value={eventState}
                            onChange={(e) => {
                                setEventState(e.target.value)
                            }}
                            className="border px-2 py-1 rounded-lg text-sm"
                        >
                            <option value="">전체</option>
                            <option value="02">진행중</option>
                            <option value="01">진행준비</option>
                            <option value="03">마감</option>
                        </select>
                        <div className="w-full md:w-72">
                            <Input
                                name={"title"}
                                type={"text"}
                                label="이벤트 제목"
                                size={"lg"}
                                onChange={(e) => setSearchValue(e.target.value)}
                                icon={<MagnifyingGlassIcon className="h-5 w-5"/>}
                            />
                        </div>
                        <Button className="h-12"
                        onClick={handleSearch}>
                            검색
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardBody className="px-0 pb-0">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                    <tr>
                        {TABLE_HEAD.map((head) => (
                            <th
                                key={head}
                                className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                            >
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70 pl-2"
                                >
                                    {head}
                                </Typography>
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {eventData.contents.map(
                        ({id ,title, eventState, startDate, endDate}, index) => {
                            const isLast = index === eventData.length - 1;
                            const classes = isLast
                                ? "p-4"
                                : "p-4 border-b border-blue-gray-50";

                            return (
                                <tr key={title}>
                                    <td className={classes}>
                                        <div className="flex items-center gap-3">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-bold cursor-pointer pl-2"
                                                onClick={() => {
                                                    console.log("이벤트 ID: ", typeof id, id)
                                                    moveToEventRead(id)
                                                }}
                                            >
                                                {title}
                                            </Typography>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <div className="w-max pl-2">
                                            <Chip
                                                size="sm"
                                                variant="ghost"
                                                value={
                                                    eventState === "01"
                                                    ? "진행준비"
                                                    : eventState === "02"
                                                    ? "진행중"
                                                    : "마감"}
                                                color={
                                                    eventState === "02"
                                                        ? "green"
                                                        : eventState === "01"
                                                            ? "amber"
                                                            : "red"
                                                }
                                            />
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal pl-2"
                                        >
                                            {startDate}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal pl-2"
                                        >
                                            {endDate}
                                        </Typography>
                                    </td>
                                </tr>
                            );
                        }
                    )}
                    </tbody>
                </table>
            </CardBody>
            <CardFooter className="flex items-center justify-center">
                <PageComponent serverData={eventData} movePage={moveToEventList}></PageComponent>
            </CardFooter>
        </Card>
    );
};

export default EventListComponent;
