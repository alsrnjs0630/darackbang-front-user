import {
    Typography,
    Checkbox, Input,
} from "@material-tailwind/react";
import React from "react";


const PaymentComponent = () => {
    return (
        <div>
            <div className="w-[1200px] overflow-x-auto">
                <Typography className={"text-4xl ml-4 mb-2"}>
                    결제 정보
                </Typography>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                    <tr>
                        <th scope="col" className="px-6 py-3 text-2xl text-center rounded-s-lg">
                            상품 정보
                        </th>
                        <th scope="col" className="py-3 text-2xl text-right">
                            수량
                        </th>
                        <th scope="col" className="py-3 text-2xl text-right">
                            금액
                        </th>
                        <th scope="col" className="pr-6 py-3 text-2xl text-right rounded-e-lg">
                            총 금액
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr className="bg-white dark:bg-gray-800">
                        <th scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            Apple MacBook Pro 17"
                        </th>
                        <td className="py-4 text-right">
                            1
                        </td>
                        <td className="py-4 text-right">
                            $2999
                        </td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-800">
                        <th scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            Microsoft Surface Pro
                        </th>
                        <td className="py-4 text-right">
                            1
                        </td>
                        <td className="y-4 text-right">
                            $1999
                        </td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-800">
                        <th scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                            Magic Mouse 2
                        </th>
                        <td className="py-4 text-right">
                            1
                        </td>
                        <td className="py-4 text-right">
                            $99
                        </td>
                    </tr>
                    </tbody>
                    <tfoot>
                    <tr className="font-semibold text-gray-900">
                        <th scope="row" className="px-6 py-3 text-base">Total</th>
                        <td className="py-3 text-right">3</td>
                        <td className="py-3 text-right">21,000</td>
                    </tr>
                    </tfoot>
                </table>
            </div>
            <div>
                <div className={"mt-10 grid grid-cols-4 gap-4"}>
                    <Typography variant="small" color="blue-gray" className="text-center mt-2 pr-4">
                        보유 적립금
                    </Typography>
                    <Input
                        size="md"
                        value={"20000"}
                        className="w-full !border-gray-300 focus:!border-gray-900"
                        readOnly={true}/>
                    <Typography variant="small" color="blue-gray" className="text-center mt-2 pr-4">
                        사용 할 적립금
                    </Typography>
                    <Input
                        size="md"
                        placeholder="1000원 이상부터 사용가능"
                        className="w-full !border-gray-300 focus:!border-gray-900"/>
                </div>
            </div>
            <div className={"mt-5"}>
                <Typography variant="h4" color="blue-gray" className="text-center mt-2 pr-4">
                    배송지 입력
                </Typography>
                <div className={"mt-3 grid grid-cols-4 gap-4"}>
                    <Typography variant="small" color="blue-gray" className="text-center mt-2 pr-4">
                        보유 적립금
                    </Typography>
                    <Input
                        size="md"
                        value={"20000"}
                        className="w-full !border-gray-300 focus:!border-gray-900"
                        readOnly={true}/>
                    <Typography variant="small" color="blue-gray" className="text-center mt-2 pr-4">
                        사용 할 적립금
                    </Typography>
                    <Input
                        size="md"
                        placeholder="1000원 이상부터 사용가능"
                        className="w-full !border-gray-300 focus:!border-gray-900"/>
                </div>
            </div>
            <div className={"rounded-2xl shadow-md shadow-gray-200 pt-2 pb-5 mt-10"}>
                <table className="w-full text-sm text-left rtl:text-right">
                    <thead className="text-xs text-gray-700 uppercase">
                    <tr>
                        <td scope="col" className="px-3 py-3 text-base text-center">
                            주문 금액
                        </td>
                        <td/>
                        <td scope="col" className="px-3 py-3 text-base text-center">
                            배송비
                        </td>
                        <td/>
                        <td scope="col" className="px-3 py-3 text-base text-center">
                            적립금
                        </td>
                        <td/>
                        <td scope="col" className="px-3 py-3 text-base text-center">
                            결제 금액
                        </td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr className="bg-white dark:bg-gray-800">
                        <th className="px-3 py-3 text-2xl text-center">
                            주문 금액
                        </th>
                        <td className={"text-3xl text-center text-green-300 font-bold"}>
                            +
                        </td>
                        <th className="px-3 py-3 text-2xl text-center">
                            배송비
                        </th>
                        <td className={"text-3xl text-center text-green-300 font-bold"}>
                            -
                        </td>
                        <th className="px-3 py-3 text-2xl text-center">
                            적립금
                        </th>
                        <td className={"text-3xl text-center text-green-300 font-bold"}>
                            =
                        </td>
                        <th className="px-3 py-3 text-2xl text-center ">
                            결제 금액
                        </th>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PaymentComponent;