import { useState, useEffect } from "react";
import styled from "styled-components";
import theme from "../../styles/theme";
import { ChartData, ChartOptions } from "chart.js";
import LineChart from "../../components/lineChart";
import { Btn } from "../../components/button";
import { InputCustom } from "../../components/input";
import dayjs from "dayjs";

export default function RecordPage() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const [storedData, setStoredData] = useState(() =>
    JSON.parse(localStorage.getItem("recordData") || "[]")
  );

  const data: ChartData<"line"> = {
    labels: storedData.map((item: { date: string }) => item.date),
    datasets: [
      {
        label: "DL(LB)",
        borderColor: "#ff1346",
        data: storedData.map((item: { dl: number }) => item.dl),
      },
      {
        label: "SQ(LB)",
        borderColor: "#12ff12",
        data: storedData.map((item: { sq: number }) => item.sq),
      },
      {
        label: "BP(LB)",
        borderColor: "#1d25ff",
        data: storedData.map((item: { bp: number }) => item.bp),
      },
    ],
  };
  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const [exercisePercentages, setExercisePercentages] = useState<{
    DL: any[];
    SQ: any[];
    BP: any[];
  }>({ DL: [], SQ: [], BP: [] });

  function calculateExercisePercentages(data: ChartData<"line">) {
    const calculatePercentage = (value: number) => {
      const percentages = [];
      for (let i = 100; i >= 10; i -= 10) {
        percentages.push({ percent: i, value: (value * i) / 100 });
      }
      return percentages;
    };
    return data.datasets.map((dataset) =>
      calculatePercentage(Math.max(...(dataset.data as number[])))
    );
  }

  function handleCalculateExercisePercentages() {
    const percentages = calculateExercisePercentages(data);
    setExercisePercentages({
      DL: percentages[0],
      SQ: percentages[1],
      BP: percentages[2],
    });
  }

  function convertLBtoKG(lbs: number[]): number {
    if (!lbs.length) return 0;
    const maxLb = Math.max(...lbs);
    return Math.floor(maxLb * 0.453592);
  }

  useEffect(() => {
    const handleStorageChange = () => {
      // 로컬 스토리지에서 데이터를 다시 읽어와 상태를 업데이트
      setStoredData(JSON.parse(localStorage.getItem("recordData") || "[]"));
    };

    // storage 이벤트 리스너 추가
    window.addEventListener("storage", handleStorageChange);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <>
      <RecordPageWrapper>
        <RecordTitle>기록 요약</RecordTitle>
        <AlertList>
          <li>해당 데이터는 서버에 저장되지 않습니다.</li>
          <li>삭제를 원한다면 브라우저 캐시 삭제를 진행하시면 됩니다.</li>
        </AlertList>
        <AddBtn type="button" onClick={() => setIsOpen(true)}>
          1RM 등록하기
        </AddBtn>
        {isOpen && (
          <AddRecordPop setIsOpen={setIsOpen} setStoredData={setStoredData} />
        )}
        <RecordList>
          <RecordItem>
            <ItemTitle>DL(kg)</ItemTitle>
            <ItemCont>
              {convertLBtoKG(
                data.datasets[0].data.map((item) => item as number)
              ) || 0}
            </ItemCont>
          </RecordItem>
          <RecordItem>
            <ItemTitle>SQ(kg)</ItemTitle>
            <ItemCont>
              {convertLBtoKG(
                data.datasets[1].data.map((item) => item as number)
              ) || 0}
            </ItemCont>
          </RecordItem>
          <RecordItem>
            <ItemTitle>BP(kg)</ItemTitle>
            <ItemCont>
              {convertLBtoKG(
                data.datasets[2].data.map((item) => item as number)
              ) || 0}
            </ItemCont>
          </RecordItem>
        </RecordList>

        <RecordChart>
          <LineChart data={data} options={options} />
        </RecordChart>
        <RecordPercentBtn
          onClick={handleCalculateExercisePercentages}
          disabled={storedData.length === 0}
        >
          <RecordPercentBtnText>
            {exercisePercentages.DL.length === 0
              ? "운동 무게 계산하기"
              : "다시 계산하기"}
          </RecordPercentBtnText>
        </RecordPercentBtn>
        <RecordPercentTable>
          <colgroup>
            <col style={{ width: "33%" }} />
            <col style={{ width: "33%" }} />
            <col style={{ width: "33%" }} />
          </colgroup>
          <thead>
            <tr>
              <th>DL</th>
              <th>SQ</th>
              <th>BP</th>
            </tr>
          </thead>
          <tbody>
            {exercisePercentages.DL.length > 0 ? (
              exercisePercentages.DL.map((dl, index) => (
                <tr key={index}>
                  <td>
                    <p>{`${dl.percent}%`}</p>
                    <p>{`(${Math.floor(dl.value)}LB)`}</p>
                  </td>
                  <td>
                    <p>{`${exercisePercentages.SQ[index].percent}%`}</p>
                    <p>
                      {`(${Math.floor(exercisePercentages.SQ[index].value)}LB)`}
                    </p>
                  </td>
                  <td>
                    <p>{`${exercisePercentages.BP[index].percent}%`}</p>
                    <p>
                      {`(${Math.floor(exercisePercentages.BP[index].value)}LB)`}
                    </p>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3}>
                  <p>정보가 없습니다.</p>
                </td>
              </tr>
            )}
          </tbody>
        </RecordPercentTable>
      </RecordPageWrapper>
    </>
  );
}

const AddRecordPop = ({
  setIsOpen,
  setStoredData,
}: {
  setIsOpen: (value: boolean) => void;
  setStoredData: React.Dispatch<React.SetStateAction<any[]>>;
}) => {
  const [dl, setDl] = useState<string>("");
  const [sq, setSq] = useState<string>("");
  const [bp, setBp] = useState<string>("");

  const handleLocalStorage = () => {
    const today = dayjs().format("YYYY-MM-DD");
    const newRecord = { dl, sq, bp, date: today };

    const existingRecords = JSON.parse(
      localStorage.getItem("recordData") || "[]"
    );
    existingRecords.push(newRecord);
    localStorage.setItem("recordData", JSON.stringify(existingRecords));

    // 로컬 스토리지 업데이트 후 상태도 업데이트하여 실시간 반영
    setStoredData(existingRecords);
  };
  return (
    <AddWrapper>
      <AddTitle>PR 등록</AddTitle>
      <AddInput
        placeholder="DeadLift(LB) 입력해주세요"
        type="number"
        value={dl}
        onChange={(e) => setDl(e.target.value)}
      />
      <AddInput
        placeholder="Squats(LB) 입력해주세요"
        type="number"
        value={sq}
        onChange={(e) => setSq(e.target.value)}
      />
      <AddInput
        placeholder="BenchPress(LB) 입력해주세요"
        type="number"
        value={bp}
        onChange={(e) => setBp(e.target.value)}
      />
      <ButtonBox>
        <ConfirmBtn
          type="button"
          $success={true}
          onClick={() => {
            handleLocalStorage();
            setIsOpen(false);
          }}
        >
          등록
        </ConfirmBtn>
        <ConfirmBtn type="button" onClick={() => setIsOpen(false)}>
          취소
        </ConfirmBtn>
      </ButtonBox>
    </AddWrapper>
  );
};
const AlertList = styled.ul`
  margin-top: 10px;
  & > li {
    position: relative;
    padding-left: 10px;
    font-size: 13px;
    color: ${theme.colors.sub2};
    &::before {
      content: "";
      position: absolute;
      top: 7px;
      left: 0;
      display: block;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: ${theme.colors.sub2};
    }
  }
`;
const ConfirmBtn = styled(Btn)<{ $success: boolean }>`
  width: 100%;
  margin-top: 20px;
  padding: 1rem;
  border-radius: 10px;
  background: ${({ $success }) => ($success ? theme.colors.sub2 : " #f54848")};
  color: ${theme.colors.white};
  font-weight: bold;
`;

const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;
const AddInput = styled(InputCustom)`
  width: 100%;
  padding: 1rem;
  border-radius: 10px;
  background: ${theme.colors.white};
`;

const AddTitle = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: ${theme.colors.main};
`;

const AddWrapper = styled.div`
  margin-top: 20px;
  padding: 20px;
  border-radius: 10px;
  background: ${theme.colors.white};
  z-index: 10001;
`;

const AddBtn = styled(Btn)`
  width: 100%;
  margin-top: 20px;
  padding: 1rem;
  border-radius: 10px;
  background: ${theme.colors.sub2};
  color: ${theme.colors.white};
  font-weight: bold;
`;

const RecordPercentTable = styled.table`
  width: 100%;
  margin-top: 20px;
  border-radius: 10px;
  background: ${theme.colors.white};
  border-collapse: collapse;
  & > thead > tr > th {
    & + th {
      border-left: 1px solid #bbbbbb;
    }
    padding: 0.5rem;
    font-size: 13px;
    font-weight: 700;
    color: ${theme.colors.main};
  }
  & > tbody > tr > td {
    & + td {
      border-left: 1px solid #bbbbbb;
    }
    padding: 0.5rem;
    border-top: 1px solid #bbbbbb;
    font-weight: 700;
    text-align: center;
    & > p {
      color: ${theme.colors.sub};
      font-size: 13px;
    }
  }
`;

const RecordPercentBtn = styled.button`
  width: 100%;
  margin-top: 20px;
  padding: 1rem;
  border-radius: 10px;
  background: ${theme.colors.sub2};
  &:disabled {
    background: ${theme.colors.sub};
  }
`;

const RecordPercentBtnText = styled.span`
  color: ${theme.colors.white};
  font-size: 16px;
  font-weight: 700;
`;

const RecordChart = styled.div`
  width: 100%;
  margin-top: 20px;
  padding: 1rem 1rem 5rem;
  border-radius: 10px;
  background: ${theme.colors.white};
`;

const ItemCont = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: ${theme.colors.main};
  font-weight: 700;
  letter-spacing: -0.1rem;
`;
const ItemTitle = styled.h3`
  color: ${theme.colors.sub};
  font-size: 13px;
  text-align: center;
`;

const RecordTitle = styled.h2`
  font-size: 26px;
  font-weight: 700;

  span {
    font-size: 13px;
    font-weight: 400;
    color: ${theme.colors.white};
  }
`;

const RecordList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-top: 20px;
`;
const RecordItem = styled.li`
  background: ${theme.colors.white};
  border-radius: 10px;
  padding: 0.5rem;
`;
const RecordPageWrapper = styled.div``;
