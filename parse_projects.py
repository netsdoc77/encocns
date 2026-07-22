import re
import json

html_content = """
			    <tr>
			        <td>2019.05 ~ 현재</td>
			        <td>IFRS 시스템 구축</td>
			        <td>LINE Financial Plus</td>
			        <td>IFRS 대손충당금, 금융상품평가(CF엔진),<br>ENCO FrameWork 도입</td>
			    </tr>
			    <tr>
			        <td>2018.01 ~ 현재</td>
			        <td>IFRS 시스템 유지보수</td>
			        <td>한국증권금융</td>
			        <td>IFRS 시스템 유지보수</td>
			    </tr>
			    <tr>
			        <td>2013.02 ~ 현재</td>
			        <td>CMBS 유지보수</td>
			        <td>KB국민은행</td>
			        <td>유가증권 유지보수 사업 참여</td>
			    </tr>
			    <tr>
			        <td>2018.08 ~ 2019.04</td>
			        <td>내부회계시스템 고도화</td>
			        <td>카카오뱅크</td>
			        <td>내부회계시스템 고도화 개발,<br>ENCO FrameWork 도입</td>
			    </tr>
			    <tr>
			        <td>2018.07 ~ 2019.10</td>
			        <td>농협카드 차세대</td>
			        <td>NH농협카드</td>
			        <td>계정계/승인계 개발 참여</td>
			    </tr>
			    <tr>
			        <td>2018.05 ~ 2019.03</td>
			        <td>업적평가용 ECL 시스템 구축</td>
			        <td>NH농협은행</td>
			        <td>업적평가용 ECL 시스템 구축 사업 참여</td>
			    </tr>
			    <tr>
			        <td>2018.03 ~ 2018.09</td>
			        <td>IFRS JAVA6 코드 컨버젼</td>
			        <td>씨티은행</td>
			        <td>IFRS JAVA6 코드 컨버젼 프로젝트 참여</td>
			    </tr>
			    <tr>
			        <td>2018.02 ~ 2018.04</td>
			        <td>IFRS 담보배분 프로젝트</td>
			        <td>한국증권금융</td>
			        <td>IFRS 담보배분 고도화 개발</td>
			    </tr>
			    <tr>
			        <td>2017.11 ~ 2018.02</td>
			        <td>Super Platform구축</td>
			        <td>신한은행</td>
			        <td>Super Platform구축 참여</td>
			    </tr>
			    <tr>
			        <td>2017.10 ~ 2018.02</td>
			        <td>Only Mobile 전자금융고도화</td>
			        <td>웰컴저축은행</td>
			        <td>Only Mobile 전자금융고도화 구축 참여</td>
			    </tr>
			    <tr>
			        <td>2017.08 ~ 2018.07</td>
			        <td>IFRS 시스템 유지보수</td>
			        <td>카카오뱅크</td>
			        <td>IFRS 시스템 유지보수, ENCO FrameWork 유지보수</td>
			    </tr>
			    <tr>
			        <td>2017.06 ~ 2018.03</td>
			        <td>종합수익관리시스템 재구축</td>
			        <td>NH농협은행</td>
			        <td>종합수익관리시스템 재구축 참여</td>
			    </tr>
			    <tr>
			        <td>2017.06 ~ 2018.01</td>
			        <td>IFRS9 시스템 구축</td>
			        <td>한국증권금융</td>
			        <td>IFRS 9 기대신용손실충당금 개발</td>
			    </tr>
			    <tr>
			        <td>2017.06 ~ 2017.11</td>
			        <td>ALM 시스템 재구축</td>
			        <td>우리은행</td>
			        <td>ALM 시스템 재구축 참여</td>
			    </tr>
			    <tr>
			        <td>2017.05 ~ 2017.10</td>
			        <td>모바일오피스 고도화</td>
			        <td>NH농협은행</td>
			        <td>모바일오피스 고도화(태블릿브랜치 통합플랫폼)<br>구축 참여</td>
			    </tr>
			    <tr>
			        <td>2017.05 ~ 2017.10</td>
			        <td>기업여신/심사 시스템 구축</td>
			        <td>KEB하나은행</td>
			        <td>기업여신/심사 시스템 구축 참여</td>
			    </tr>
			    <tr>
			        <td>2016.08 ~ 2017.05</td>
			        <td>농협은행 IFRS 9 구축</td>
			        <td>NH농협은행</td>
			        <td>IFRS 9 기대신용손실충당금 개발 참여</td>
			    </tr>
			    <tr>
			        <td>2016.07 ~ 2017.07</td>
			        <td>카카오뱅크 IFRS 시스템 구축</td>
			        <td>카카오뱅크</td>
			        <td>금융상품평가/대손충당금/주석공시 개발,<br>ENCO FrameWork 도입</td>
			    </tr>
			    <tr>
			        <td>2016.02 ~ 2017.02</td>
			        <td>채권종합관리시스템 고도화 개발</td>
			        <td>NH농협은행</td>
			        <td>데이터전환/일반사후관리 참여</td>
			    </tr>
			    <tr>
			        <td>2015.09 ~ 2015.12</td>
			        <td>관제시스템 개발</td>
			        <td>KB국민은행</td>
			        <td>관제시스템 개발 프로젝트 참여</td>
			    </tr>
			    <tr>
			        <td>2015.07 ~ 2016.03</td>
			        <td>여신종합 및 IFRS 시스템 구축</td>
			        <td>NH저축은행</td>
			        <td>IFRS 시스템 구축 개발</td>
			    </tr>
			    <tr>
			        <td>2015.04 ~ 2015.08</td>
			        <td>FDS 시스템 구축</td>
			        <td>LG유플러스</td>
			        <td>FDS 시스템 구축 개발</td>
			    </tr>
			    <tr>
			        <td>2014.01 ~ 2015.03</td>
			        <td>IFRS 시스템 구축</td>
			        <td>삼성카드</td>
			        <td>금융상품평가(CF엔진) 개발</td>
			    </tr>
			    <tr>
			        <td>2014.01 ~ 2014.12</td>
			        <td>송변전분야 유지보수</td>
			        <td>한전KND</td>
			        <td>송전분야 설계관리 등 유지운영 인력 지원</td>
			    </tr>
			    <tr>
			        <td>2014.01 ~ 2014.12</td>
			        <td>인사노부(HR) 유지보수</td>
			        <td>한전KND</td>
			        <td>인사노부(HR) 유지보수 참여</td>
			    </tr>
			    <tr>
			        <td>2014.01 ~ 2014.10</td>
			        <td>IFRS 시스템 유지보수</td>
			        <td>NH농협생명보험</td>
			        <td>IFRS 시스템 유지보수</td>
			    </tr>
			    <tr>
			        <td>2013.11 ~ 2014.04</td>
			        <td>백오피스 주식/수익증권 유지보수</td>
			        <td>NH농협손해보험</td>
			        <td>백오피스 주식/수익증권 유지보수 참여</td>
			    </tr>
			    <tr>
			        <td>2013.11 ~ 2013.12</td>
			        <td>유가증권 Seg별 계정관리 및 듀레이션 산출 개발</td>
			        <td>삼성화재</td>
			        <td>유가증권 Seg별 계정관리 및 듀레이션 산출 개발 참여</td>
			    </tr>
			    <tr>
			        <td>2013.10 ~ 2013.12</td>
			        <td>인사노부(HR) 유지보수</td>
			        <td>한전KND</td>
			        <td>인사노부(HR) 유지보수 참여</td>
			    </tr>
			    <tr>
			        <td>2013.09 ~ 2014.05</td>
			        <td>IFRS 시스템 구축</td>
			        <td>NH농협손해보험</td>
			        <td>대손충당금 개발</td>
			    </tr>
			    <tr>
			        <td>2013.05 ~ 2013.11</td>
			        <td>자산운용 대외보고시스템 구축</td>
			        <td>교보생명</td>
			        <td>자산운용 대외보고시스템 구축 프로젝트 참여</td>
			    </tr>
			    <tr>
			        <td>2013.05 ~ 2013.11</td>
			        <td>신자산운용시스템 구축</td>
			        <td>NH농협생명보험</td>
			        <td>신자산운용시스템 구축 프로젝트 참여</td>
			    </tr>
			    <tr>
			        <td>2013.03 ~ 2013.09</td>
			        <td>투자전략 고도화 시스템 구축</td>
			        <td>한화생명</td>
			        <td>투자전략 고도화 시스템 구축 참여</td>
			    </tr>
			    <tr>
			        <td>2013.03 ~ 2013.09</td>
			        <td>차세대 대출 시스템 구축</td>
			        <td>삼성화재</td>
			        <td>차세대 대출 시스템 구축 참여</td>
			    </tr>
			    <tr>
			        <td>2013.02 ~ 2014.01</td>
			        <td>IFRS 시스템 구축</td>
			        <td>NH농협생명보험</td>
			        <td>금융상품평가(CF엔진)/대손충당금 개발</td>
			    </tr>
			    <tr>
			        <td>2013.01 ~ 2013.12</td>
			        <td>송변전 ERP분야 설계관리 S/W운영 및 유지보수</td>
			        <td>한전KND</td>
			        <td>송변전 ERP분야 설계관리 S/W운영 및 유지보수 참여</td>
			    </tr>
			    <tr>
			        <td>2013.01 ~ 2013.04</td>
			        <td>차새대 시스템 구축</td>
			        <td>현대카드</td>
			        <td>차세대 시스템 구축 참여</td>
			    </tr>
			    <tr>
			        <td>2012.12 ~ 2013.12</td>
			        <td>전산시스템 운영 유지보수</td>
			        <td>한화투자증권</td>
			        <td>전산시스템 운영 유지보수 참여</td>
			    </tr>
			    <tr>
			        <td>2012.11 ~ 2013.01</td>
			        <td>차세대 외화시스템 구축</td>
			        <td>한국은행</td>
			        <td>차세대 외화시스템 구축 참여</td>
			    </tr>
			    <tr>
			        <td>2012.11 ~ 2013.01</td>
			        <td>인사노부(HR) 유지보수</td>
			        <td>한전KND</td>
			        <td>인사노부(HR) 유지보수</td>
			    </tr>
			    <tr>
			        <td>2012.08 ~ 2013.07</td>
			        <td>ERP(KINNOS) 시스템 개발 및 유지보수</td>
			        <td>한전KPS</td>
			        <td>ERP(KINNOS) 시스템 개발 및 유지보수 참여</td>
			    </tr>
			    <tr>
			        <td>2012.08 ~ 2013.01</td>
			        <td>차세대 Pilot 구축</td>
			        <td>현대카드</td>
			        <td>차세대 Pilot 구축 사업 참여</td>
			    </tr>
			    <tr>
			        <td>2012.07 ~ 2013.03</td>
			        <td>인터넷뱅킹 재구축</td>
			        <td>우정사업국</td>
			        <td>인터넷뱅킹 재구축 참여</td>
			    </tr>
			    <tr>
			        <td>2012.07 ~ 2012.12</td>
			        <td>송변전 ERP분야 설계관리 S/W운영 및 유지보수</td>
			        <td>한전KND</td>
			        <td>송변전 ERP분야 설계관리 S/W운영 및 유지보수 참여</td>
			    </tr>
			    <tr>
			        <td>2012.06 ~ 2012.11</td>
			        <td>재무회계 구축</td>
			        <td>한국장학재단</td>
			        <td>재무회계, 장학금지원 구축 참여</td>
			    </tr>
			    <tr>
			        <td>2012.05 ~ 2013.05</td>
			        <td>IT 유지보수</td>
			        <td>한국증권금융</td>
			        <td>IT 유지보수 참여</td>
			    </tr>
			    <tr>
			        <td>2012.01 ~ 2012.07</td>
			        <td>IFRS 대응시스템 구축</td>
			        <td>한국수출입은행</td>
			        <td>IFRS 대응시스템 구축 사업 참여</td>
			    </tr>
			    <tr>
			        <td>2012.01 ~ 2012.04</td>
			        <td>IFRS 구축 전산업무</td>
			        <td>농협공제</td>
			        <td>IFRS 구축 전산업무 사업 참여</td>
			    </tr>
			    <tr>
			        <td>2011.10 ~ 2011.12</td>
			        <td>IFRS 시스템 구축</td>
			        <td>NH농협은행</td>
			        <td>IFRS 시스템 구축 금융상품평가(CF엔진) 참여</td>
			    </tr>
"""

rows = re.findall(r'<tr>(.*?)</tr>', html_content, re.DOTALL)

projects = []
for idx, row in enumerate(rows):
    cols = re.findall(r'<td>(.*?)</td>', row, re.DOTALL)
    if len(cols) == 4:
        period = cols[0].strip().replace('\n', ' ')
        name = cols[1].strip().replace('\n', ' ')
        client = cols[2].strip().replace('\n', ' ')
        desc = cols[3].strip().replace('<br>', '\\n').replace('\n', '')
        projects.append({
            'id': idx + 1,
            'period': period,
            'title': name,
            'client': client,
            'description': desc
        })

print("const projectData = [")
for p in projects:
    desc = p['description'].replace('"', '\\"')
    print(f"  {{ id: {p['id']}, period: \"{p['period']}\", title: \"{p['title']}\", client: \"{p['client']}\", description: \"{desc}\" }},")
print("];")
