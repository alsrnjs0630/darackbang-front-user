import { ArrowDownTrayIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Avatar,
    Input,
} from "@material-tailwind/react";

const TABLE_HEAD = ["제목", "진행상태", "시작일", "마감일"];

const TABLE_ROWS = [
    {
        img: "https://docs.material-tailwind.com/img/logos/logo-spotify.svg",
        name: "Spotify",
        startDate: "Mon 7:00am",
        endDate: "Wed 3:00pm",
        status: "paid",
    },
    {
        img: "https://docs.material-tailwind.com/img/logos/logo-amazon.svg",
        name: "Amazon",
        startDate: "Tue 9:00am",
        endDate: "Wed 1:00pm",
        status: "paid",
    },
    {
        img: "https://docs.material-tailwind.com/img/logos/logo-pinterest.svg",
        name: "Pinterest",
        startDate: "Mon 5:40pm",
        endDate: "Mon 7:40pm",
        status: "pending",
    },
    {
        img: "https://docs.material-tailwind.com/img/logos/logo-google.svg",
        name: "Google",
        startDate: "Mon 3:00pm",
        endDate: "Wed 5:00pm",
        status: "paid",
    },
    {
        img: "https://docs.material-tailwind.com/img/logos/logo-netflix.svg",
        name: "Netflix",
        startDate: "Mon 1:30am",
        endDate: "Wed 3:30am",
        status: "cancelled",
    },
];

const EventComponents = () => {
    return (
        <Card className="h-full w-full">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            다락방 이벤트
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            다양한 혜택을 드립니다!
                        </Typography>
                    </div>
                    <div className="flex w-full shrink-0 gap-2 md:w-max">
                        <div className="w-full md:w-72">
                            <Input
                                label="Search"
                                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                            />
                        </div>
                        <Button className="flex items-center gap-3" size="sm">
                            <ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4" /> Download
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardBody className="px-0">
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
                                    className="font-normal leading-none opacity-70"
                                >
                                    {head}
                                </Typography>
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {TABLE_ROWS.map(
                        ({ img, name, status, startDate, endDate }, index) => {
                            const isLast = index === TABLE_ROWS.length - 1;
                            const classes = isLast
                                ? "p-4"
                                : "p-4 border-b border-blue-gray-50";

                            return (
                                <tr key={name}>
                                    <td className={classes}>
                                        <div className="flex items-center gap-3">
                                            <Avatar
                                                src={img}
                                                alt={name}
                                                size="md"
                                                className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                                            />
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-bold"
                                            >
                                                {name}
                                            </Typography>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <div className="w-max">
                                            <Chip
                                                size="sm"
                                                variant="ghost"
                                                value={status}
                                                color={
                                                    status === "paid"
                                                        ? "green"
                                                        : status === "pending"
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
                                            className="font-normal"
                                        >
                                            {startDate}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
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
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                <Button variant="outlined" size="sm">
                    Previous
                </Button>
                <div className="flex items-center gap-2">
                    <Button variant="outlined" size="sm">
                        1
                    </Button>
                    <Button variant="text" size="sm">
                        2
                    </Button>
                    <Button variant="text" size="sm">
                        3
                    </Button>
                    <Button variant="text" size="sm">
                        ...
                    </Button>
                    <Button variant="text" size="sm">
                        8
                    </Button>
                    <Button variant="text" size="sm">
                        9
                    </Button>
                    <Button variant="text" size="sm">
                        10
                    </Button>
                </div>
                <Button variant="outlined" size="sm">
                    Next
                </Button>
            </CardFooter>
        </Card>
    );
};

export default EventComponents;
