import { Card, Input, Button, Checkbox, CardHeader, IconButton, Typography } from "@material-tailwind/react";
import { TrashIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {deleteCartItem, getCartList} from "../../apis/CartApi";
import {API_SERVER_HOST} from "../../apis/host";

const CartComponent = () => {

    const initState = [{
        id: '',
        productName: '',
        quantity: '',
        productPrice: '',
        productImages: [],
    }]

    const [cartItems, setCartItems] = useState(initState);
    const [checkedItems, setCheckedItems] = useState({}); // 체크된 아이템 관리
    const [allChecked, setAllChecked] = useState(false); // 전체 선택 여부 관리

    // 장바구니 아이템 가져오기: 장바구니 리스트를 서버로부터 가져옴
    useEffect(() => {
        getCartList().then(data => {
            console.log(data); // 가져온 데이터 확인
            setCartItems(data); // 모든 장바구니 아이템 상태 업데이트
        }).catch(err => {
            console.error("장바구니 아이템 리스트 정보를 가져오는 중 오류 발생:", err);
        });
    }, []);

    // 장바구니 아이템 삭제: 특정 아이템을 삭제하고, 상태를 업데이트
    const handleDeleteItem = async (id) => {
        try {
            await deleteCartItem(id); // 삭제 요청
            setCartItems(prevItems => prevItems.filter(item => item.id !== id)); // 상태 업데이트
        } catch (error) {
            console.error("장바구니 아이템 삭제 중 오류 발생:", error);
        }
    };

    // 특정 상품 체크박스 상태 변경
    const handleCheckboxChange = (id) => {
        setCheckedItems(prev => ({
            ...prev,
            [id]: !prev[id] // 체크 상태 토글
        }));
        console.log(checkedItems)
    };

    // 전체 선택 체크박스 상태 변경
    const handleAllCheckboxChange = () => {
        const newAllChecked = !allChecked; // 전체 선택 상태 토글
        setAllChecked(newAllChecked);

        // 모든 아이템의 체크박스 상태를 전체 선택/해제로 업데이트
        const newCheckedItems = {};
        cartItems.forEach(item => {
            newCheckedItems[item.id] = newAllChecked; // 모든 아이템을 선택하거나 선택 해제
        });
        setCheckedItems(newCheckedItems);
    };

    // 체크된 아이템만 필터링하여 반환
    const getCheckedItemsDetails = () => {
        return cartItems.filter(item => checkedItems[item.id]);
    };

    // 체크된 아이템의 총 가격 계산
    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => {
            if (checkedItems[item.id]) {
                return total + (item.productPrice); // 체크된 아이템 가격 합산
            }
            return total;
        }, 0);
    };

    const totalPrice = calculateTotalPrice();
    const shippingCost = totalPrice >= 30000 ? 0 : 3000; // 배송비 계산

    // 주문하기 버튼 클릭 시 결제 페이지로 이동
    const navigate = useNavigate();

    const moveToPath = (path) => {
        console.log(checkedItems, totalPrice);
        navigate({pathname: path}, {state: checkedItems, totalPrice})
    }

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

                            <table className="w-full min-w-max table-auto">
                                <thead>
                                <tr>
                                    <th className="border-b border-gray-300 p-4 text-left">
                                        <div className="flex items-center gap-1">
                                            <Checkbox checked={allChecked} onChange={handleAllCheckboxChange} />
                                            <div className="font-bold text-sm">전체선택</div>
                                        </div>
                                    </th>
                                    <th className="border-b border-gray-300 p-4 text-center">
                                        <div className="font-bold text-sm">상품명</div>
                                    </th>
                                    <th className="border-b border-gray-300 p-4 text-center">
                                        <div className="font-bold text-sm">수량</div>
                                    </th>
                                    <th className="border-b border-gray-300 p-4 text-center">
                                        <div className="font-bold text-sm">금액</div>
                                    </th>
                                    <th className="border-b border-gray-300 p-4 text-center"></th>
                                </tr>
                                </thead>

                                <tbody>
                                {cartItems.map((item, index) => {
                                    const isLast = index === cartItems.length - 1;
                                    const classes = isLast ? "p-4" : "p-4 border-b border-gray-300";

                                    return (
                                        <tr key={item.id}> {/* id나 고유한 값을 키로 사용 */}
                                            <td className={classes}>
                                                <div className="flex">
                                                    <Checkbox checked={!!checkedItems[item.id]} onChange={() => handleCheckboxChange(item.id)} />
                                                    <div>
                                                        {item.productImages.length > 0 && (
                                                            <img
                                                                src={`${API_SERVER_HOST}/api/products/view/thumbnail_${
                                                                    item.productImages
                                                                        .filter(image => image.productType === "INFO")
                                                                        .map(image => image.productFileName)[0]
                                                                }`}
                                                                alt={item.productName}
                                                                className={`w-[60px] items-center aspect-square rounded-lg object-cover`}
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <div className="flex items-center gap-1">
                                                    <Typography variant="small" color="blue-gray" className="font-bold">
                                                        {item.productName} {/* 상품명 출력 */}
                                                    </Typography>
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <Typography variant="small" className="font-normal text-gray-600 text-center">
                                                    {item.quantity} {/* 수량 출력 */}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography variant="small" className="mr-2 font-normal text-gray-600 text-right">
                                                    {item.productPrice.toLocaleString()}원 {/* 가격 출력 */}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <div className="flex items-center gap-2">
                                                    <IconButton variant="text" size="sm" onClick={() => handleDeleteItem(item.id)}>
                                                        <TrashIcon strokeWidth={3} className="h-4 w-4 text-gray-900"/>
                                                    </IconButton>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                                </tbody>
                            </table>
                        </Card>

                        <div class="mx-auto mt-6 max-w-5xl flex-1 space-y-6 lg:mt-0 lg:flex lg:flex-col"
                             style={{position: 'sticky', top: '1rem'}}>
                            <div class="w-[230px] space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
                                <p class="text-xl font-semibold text-gray-900">주문 합계</p>

                                <div class="space-y-6">
                                    <div class="space-y-2">
                                        {/* 체크된 상품의 이름과 가격을 출력 */}
                                        {getCheckedItemsDetails().map((item) => (
                                            <dl key={item.id} className="mx-auto grid grid-cols-[100px_auto] gap-4">
                                                <dt className="w-[130px] text-xs font-normal text-gray-500 dark:text-gray-400">{item.productName}</dt>
                                                <dd className="text-sm font-medium text-gray-900 dark:text-white text-right">
                                                    {item.productPrice.toLocaleString()}원
                                                </dd>
                                            </dl>
                                        ))}

                                        {totalPrice > 0 && ( // totalPrice가 0보다 클 때만 배송비 출력
                                            <dl className="mx-auto grid grid-cols-[100px_auto] gap-4 !mt-8">
                                                <dt className="text-base font-normal text-gray-500 dark:text-gray-400">배송비</dt>
                                                <dd className="text-base font-medium text-gray-900 dark:text-white text-right">
                                                    {shippingCost === 0 ? "무료" : `${shippingCost.toLocaleString()}원`}
                                                </dd>
                                            </dl>
                                        )}

                                        <div className="text-xs font-normal text-gray-500 dark:text-gray-400">
                                            30,000원 이상 구매시 무료 배송
                                        </div>
                                    </div>

                                    <dl class="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
                                        <dt class="text-base font-bold text-gray-900">총 주문 금액</dt>
                                        <dd class="text-base font-bold text-gray-900 text-right">
                                        {totalPrice > 0
                                            ? (totalPrice + shippingCost).toLocaleString()
                                            : totalPrice.toLocaleString()}원</dd>
                                        {/* 체크된 상품 가격 합산 + 배송비 */}
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