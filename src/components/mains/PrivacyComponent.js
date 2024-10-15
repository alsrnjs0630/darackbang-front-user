import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const PrivacyComponent = () => {
    const location = useLocation();

    const sectionTitleClass = "text-lg font-bold";
    const sectionContentClass = "text-base";

    useEffect(() => {
        window.scrollTo(0, 0);  // 페이지가 로드될 때 맨 위로 스크롤
    }, [location.key]);         // key가 바뀔 때마다 실행

    return (
        <div className="w-[1000px]">
            <h5 className="mb-10 font-bold text-indigo-600">다락방(茶樂房) 개인정보처리방침</h5>
            <div className="text-gray-800">
                <div className={sectionContentClass}>
                    다락방(茶樂房)(이하 "회사")는 회원의 개인정보를 매우 중요하게 여기며,
                    '개인정보 보호법' 및 관련 법령에 따라 개인정보를 보호하고 적절히 관리하고자 최선을 다하고 있습니다.
                    본 개인정보처리방침은 회사가 운영하는 다락방 웹사이트(이하 "사이트")에서 제공되는 서비스를 이용하는 회원(이하 "이용자")의 개인정보 수집, 이용, 보관, 파기 등 처리와 관련된
                    내용을 설명합니다.<br/><br/>
                </div>
                <div>
                    <div className={sectionTitleClass}>
                        1. 수집하는 개인정보의 항목
                    </div>
                    <div className={sectionContentClass}>
                        회사는 서비스 제공을 위해 아래와 같은 개인정보를 수집합니다:<br/>
                        •&nbsp;&nbsp;필수 항목: 이름, 이메일, 비밀번호, 성별, 생년월일, 휴대전화번호, 구매 거래 내역, 적립금 내역<br/>
                        •&nbsp;&nbsp;선택 항목: 배송지 정보(주소, 수령인명, 연락처)<br/>
                        •&nbsp;&nbsp;자동 수집 항목: 서비스 이용 기록, 접속 로그, 쿠키, 접속 IP 정보, 결제 기록<br/><br/>
                    </div>
                </div>
                <div>
                    <div className={sectionTitleClass}>
                        2. 개인정보 수집 및 이용 목적
                    </div>
                    <div className={sectionContentClass}>
                        회사는 다음의 목적을 위해 개인정보를 수집하고 이용합니다:<br/>
                        •&nbsp;&nbsp;서비스 제공: 차 구독 서비스 및 기타 상품 제공<br/>
                        •&nbsp;&nbsp;본인 확인: 회원가입 및 서비스 이용을 위한 본인 확인, 가입 연령 확인<br/>
                        •&nbsp;&nbsp;회원 관리: 불량 회원의 부정 이용 방지, 고객 상담 및 민원 처리, 공지사항 전달<br/>
                        •&nbsp;&nbsp;마케팅: 이벤트, 프로모션 정보 제공(선택적)<br/>
                        •&nbsp;&nbsp;결제 처리: 구독 서비스 및 상품 구매에 대한 결제 처리<br/>
                        •&nbsp;&nbsp;통계 및 분석: 서비스 이용 패턴 분석을 통한 맞춤형 서비스 제공 및 품질 개선<br/><br/>
                    </div>
                </div>
                <div>
                    <div className={sectionTitleClass}>
                        3. 개인정보 보유 및 이용 기간
                    </div>
                    <div className={sectionContentClass}>
                        •&nbsp;&nbsp;회원가입 정보: 회원 탈퇴 시까지<br/>
                        •&nbsp;&nbsp;구매 정보: 전자상거래 등에서의 소비자 보호에 관한 법률에 의한 보존기간 동안(5년)<br/>
                        •&nbsp;&nbsp;결제 정보: 전자상거래 등에서의 소비자 보호에 관한 법률에 따른 보존 기간 동안(5년)<br/>
                        •&nbsp;&nbsp;로그 기록: 통신비밀보호법에 따라 3개월 동안 보관<br/><br/>
                    </div>
                </div>
                <div>
                    <div className={sectionTitleClass}>
                        4. 개인정보의 제3자 제공
                    </div>
                    <div className={sectionContentClass}>
                        회사는 이용자의 동의 없이는 원칙적으로 개인정보를 외부에 제공하지 않습니다.
                        다만, 법률에 의해 요구되는 경우 또는 이용자의 동의를 받은 경우에 한하여 제3자에게 제공할 수 있습니다.<br/><br/>
                    </div>
                </div>
                <div>
                    <div className={sectionTitleClass}>
                        5. 개인정보의 처리 위탁
                    </div>
                    <div className={sectionContentClass}>
                        회사는 원활한 서비스 제공을 위해 일부 개인정보를 외부 업체에 위탁할 수 있습니다.
                        위탁받는 업체와 그 업무 내용은 다음과 같습니다:<br/>
                        •&nbsp;&nbsp;결제 처리 업체: 결제 처리 및 정산 서비스<br/>
                        •&nbsp;&nbsp;배송 업체: 상품 배송 서비스 위탁 계약 시 개인정보 보호를 위해 필요한 사항을 규정하고 관리·감독을 철저히 합니다.<br/><br/>
                    </div>
                </div>
                <div>
                    <div className={sectionTitleClass}>
                        6. 개인정보의 파기 절차 및 방법
                    </div>
                    <div className={sectionContentClass}>
                        회사는 개인정보의 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.<br/>
                        •&nbsp;&nbsp;파기 절차: 회원 탈퇴 또는 목적 달성 후 내부 방침 및 관련 법령에 따라 일정 기간 저장된 후 파기됩니다.<br/>
                        •&nbsp;&nbsp;파기 방법: 전자적 파일 형태의 정보는 복구 불가능한 방법으로 삭제하며, 종이 문서에 기록된 개인정보는 분쇄하거나 소각합니다.<br/><br/>
                    </div>
                </div>
                <div>
                    <div className={sectionTitleClass}>
                        7. 이용자의 권리 및 행사 방법
                    </div>
                    <div className={sectionContentClass}>
                        이용자는 언제든지 자신의 개인정보에 대한 열람, 정정, 삭제, 처리 정지 등의 권리를 행사할 수 있습니다.<br/>
                        •&nbsp;&nbsp;권리 행사 방법: 사이트 내 ‘마이 페이지’에서 직접 조회하거나, 고객센터를 통해 요청할 수 있습니다.<br/>
                        •&nbsp;&nbsp;동의 철회: 개인정보 수집 및 이용에 대한 동의를 철회하고자 할 경우 회원 탈퇴를 통해 철회할 수 있습니다.<br/><br/>
                    </div>
                </div>
                <div>
                    <div className={sectionTitleClass}>
                        8. 개인정보 보호를 위한 기술적/관리적 대책
                    </div>
                    <div className={sectionContentClass}>
                        회사는 이용자의 개인정보를 보호하기 위해 다음과 같은 기술적·관리적 조치를 시행하고 있습니다:<br/>
                        •&nbsp;&nbsp;기술적 대책: 개인정보의 암호화, 백신 프로그램 설치, 방화벽 운영 등<br/>
                        •&nbsp;&nbsp;관리적 대책: 개인정보 접근 권한 관리, 개인정보 보호 교육 실시, 내부 보안 체계 점검<br/><br/>
                    </div>
                </div>
                <div>
                    <div className={sectionTitleClass}>
                        9. 쿠키(Cookie)의 운용 및 거부
                    </div>
                    <div className={sectionContentClass}>
                        회사는 사용자 편의 증대를 위해 쿠키를 사용할 수 있습니다.
                        쿠키 설정은 브라우저 옵션에서 거부할 수 있으며, 다만 쿠키 사용을 거부할 경우 서비스 이용에 제한이 있을 수 있습니다.<br/><br/>
                    </div>
                </div>
                <div>
                    <div className={sectionTitleClass}>
                        10. 개인정보 보호책임자 및 문의
                    </div>
                    <div className={sectionContentClass}>
                        회사는 이용자의 개인정보 보호와 관련한 문의사항을 처리하기 위해 아래와 같이 개인정보 보호책임자를 지정하고 있습니다:<br/>
                        •&nbsp;&nbsp;개인정보 보호책임자: 김보안<br/>
                        •&nbsp;&nbsp;연락처: 010-0000-0000<br/>
                        •&nbsp;&nbsp;이메일: support@darackbang.com<br/><br/>
                    </div>
                </div>
                <div>
                    <div className={sectionTitleClass}>
                        11. 정책 변경에 대한 고지
                    </div>
                    <div className={sectionContentClass}>
                        본 개인정보처리방침은 법령 또는 회사 정책에 따라 변경될 수 있으며, 변경 시 사이트를 통해 공지합니다.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyComponent;