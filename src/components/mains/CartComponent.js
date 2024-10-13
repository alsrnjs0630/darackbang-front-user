import {TrashIcon } from "@heroicons/react/24/outline";
import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import {
    Card,
    Input,
    Button,
    Checkbox,
    CardHeader,
    IconButton,
    Typography,
} from "@material-tailwind/react";
import {useNavigate} from "react-router-dom";

const CartComponent = () => {
    const navigator = useNavigate();

    const moveToPath = (path) => {
        navigator({pathname: path}, {replace: true})
    }

    const TABLE_HEAD = [
        {
            icon: <Checkbox/>,
            head: "전체선택"
        },
        {
            head: "상품명",
        },
        {
            head: "수량",
        },
        {
            head: "금액",
        },
    ];

    const TABLE_ROWS = [
        {
            number: "#MS-415646",
            amount: "$14,000",
            issued: "31 Jan 2024",
            date: "31 Feb 2024",
        },
        {
            number: "#RV-126749",
            amount: "$3,000",
            issued: "24 Jan 2024",
            date: "24 Feb 2024",
        },
        {
            number: "#QW-103578",
            amount: "$20,000",
            issued: "12 Jan 2024",
            date: "12 Feb 2024",
        },
        {
            number: "#MS-415688",
            amount: "$5,600",
            issued: "10 Jan 2024",
            date: "10 Feb 2024",
        },
        {
            number: "#MS-415688",
            amount: "$5,600",
            issued: "10 Jan 2024",
            date: "10 Feb 2024",
        },
        {
            number: "#MS-415688",
            amount: "$5,600",
            issued: "10 Jan 2024",
            date: "10 Feb 2024",
        },
        {
            number: "#MS-415688",
            amount: "$5,600",
            issued: "10 Jan 2024",
            date: "10 Feb 2024",
        },
        {
            number: "#MS-415688",
            amount: "$5,600",
            issued: "10 Jan 2024",
            date: "10 Feb 2024",
        },
        {
            number: "#MS-415688",
            amount: "$5,600",
            issued: "10 Jan 2024",
            date: "10 Feb 2024",
        },
        {
            number: "#MS-415688",
            amount: "$5,600",
            issued: "10 Jan 2024",
            date: "10 Feb 2024",
        },
        {
            number: "#MS-415688",
            amount: "$5,600",
            issued: "10 Jan 2024",
            date: "10 Feb 2024",
        },
        {
            number: "#MS-415688",
            amount: "$5,600",
            issued: "10 Jan 2024",
            date: "10 Feb 2024",
        },
    ];

    return (
        <div>
            <section class="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
                <div class="mx-auto max-w-screen-xl px-4 2xl:px-0">
                    <h2 class="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">장바구니</h2>

                    <div class="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
                        <Card className="h-full w-full">
                            <CardHeader
                                floated={false}
                                shadow={false}
                                className="mb-2 rounded-none p-2"
                            >
                                <div className={"flex"}>
                                    <div className="w-full md:w-96">
                                        <Input
                                            label="상품 검색"
                                            icon={<MagnifyingGlassIcon className="mt-1 h-5 w-5"/>}
                                        />
                                    </div>
                                    <div className={"ml-28"}>
                                        <Button variant={"outlined"} color={"red"}>
                                            선택 삭제
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <table className="w-full min-w-max table-auto text-left">
                                <thead>
                                <tr>
                                    {TABLE_HEAD.map(({head, icon}) => (
                                        <th key={head} className="border-b border-gray-300 p-4">
                                            <div className="flex items-center gap-1">
                                                {icon}
                                                <Typography
                                                    color="blue-gray"
                                                    variant="small"
                                                    className="!font-bold"
                                                >
                                                    {head}
                                                </Typography>
                                            </div>
                                        </th>
                                    ))}
                                </tr>
                                </thead>
                                <tbody>
                                {TABLE_ROWS.map(
                                    ({number, amount, issued, date}, index) => {
                                        const isLast = index === TABLE_ROWS.length - 1;
                                        const classes = isLast ? "p-4" : "p-4 border-b border-gray-300";

                                        return (
                                            <tr key={number}>
                                                <td className={classes}>
                                                    <div className="flex items-center gap-1">
                                                        <Checkbox/>
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-bold"
                                                        >
                                                            {number}
                                                        </Typography>
                                                    </div>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        className="font-normal text-gray-600"
                                                    >
                                                        {amount}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        className="font-normal text-gray-600"
                                                    >
                                                        {issued}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <Typography
                                                        variant="small"
                                                        className="font-normal text-gray-600"
                                                    >
                                                        {date}
                                                    </Typography>
                                                </td>
                                                <td className={classes}>
                                                    <div className="flex items-center gap-2">
                                                        <IconButton variant="text" size="sm">
                                                            <TrashIcon
                                                                strokeWidth={3}
                                                                className="h-4 w-4 text-gray-900"
                                                            />
                                                        </IconButton>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    },
                                )}
                                </tbody>
                            </table>
                        </Card>

                        <div class="mx-auto mt-6 max-w-5xl flex-1 space-y-6 lg:mt-0 lg:flex lg:flex-col"
                             style={{position: 'sticky', top: '1rem'}}>
                            <div class="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                                <p class="text-xl font-semibold text-gray-900">주문 합계</p>

                                <div class="space-y-4">
                                    <div class="space-y-2">
                                        {/* 이곳엔 어떤 정보가 들어가야 할까요
                                            1. 상품명 : 상품 총 가격 (상품금액 * 수량)
                                        */}

                                        <dl class="mx-auto grid grid-cols-[100px_auto] gap-4">
                                            <dt class="text-base font-normal text-gray-500">Original price</dt>
                                            <dd class="text-base font-medium text-gray-900">$7,592.00</dd>
                                        </dl>

                                        <dl class="mx-auto grid grid-cols-[100px_auto] gap-4">
                                            <dt class="text-base font-normal text-gray-500">Savings</dt>
                                            <dd class="text-base font-medium text-green-600">-$299.00</dd>
                                        </dl>

                                        <dl class="mx-auto grid grid-cols-[100px_auto] gap-4">
                                            <dt class="text-base font-normal text-gray-500">Store Pickup</dt>
                                            <dd class="text-base font-medium text-gray-900 dark:text-white">$99</dd>
                                        </dl>

                                        <dl class="mx-auto grid grid-cols-[100px_auto] gap-4">
                                            <dt class="text-base font-normal text-gray-500 dark:text-gray-400">Tax</dt>
                                            <dd class="text-base font-medium text-gray-900 dark:text-white">$799</dd>
                                        </dl>
                                    </div>

                                    <dl class="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
                                        <dt class="text-base font-bold text-gray-900">총 주문 금액</dt>
                                        <dd class="text-base font-bold text-gray-900">$8,191.00</dd>
                                    </dl>
                                </div>
                            </div>
                            <Button
                                onClick={() => moveToPath("/payment")}
                            >
                                주문하기
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default CartComponent;