import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  LineController,
} from "chart.js";
import { ChartData, ChartOptions } from "chart.js";
import { Line } from "react-chartjs-2";
import styled from "styled-components";
import theme from "../styles/theme";
import dayjs from "dayjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Title,
  Tooltip,
  Legend
);

interface LineChartProps {
  data: ChartData<"line">;
  options: ChartOptions<"line">;
}

interface TooltipContent {
  label: string | undefined;
  name: string | undefined;
  value: number | undefined;
}

export default function LineChart({ data, options }: LineChartProps) {
  const [tooltipContent, setTooltipContent] = useState<TooltipContent[]>([]);

  const modifiedOptions: ChartOptions<"line"> = {
    ...options,
    scales: {
      x: {
        display: false,
      },
      y: {
        display: true,
        position: "right",
        grid: {
          display: true,

          color: (context: any) => {
            if (context.tick.value === 0) {
              return "rgba(0, 0, 0, 0.1)";
            } else {
              return "rgba(0, 0, 0, 0.05)";
            }
          },
          lineWidth: 1,
          drawTicks: false,
          drawOnChartArea: true,
        },
        ticks: {
          padding: 10,
          callback: (tickValue: string | number) => tickValue,
          color: theme.colors.main,
          font: {
            size: 12,
          },
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    maintainAspectRatio: false,
  };

  useEffect(() => {
    if (data.datasets.length > 0) {
      let contents: TooltipContent[] = []; // 문자열 대신 객체 배열을 사용
      data.datasets.forEach((dataset) => {
        const latestIndex = dataset.data.length - 1; // 해당 데이터셋의 마지막 데이터 인덱스
        const label = data.labels?.[latestIndex] ?? "";
        const dataPoint = dataset.data[latestIndex];
        const name = dataset.label;
        const value =
          typeof dataPoint === "object"
            ? (dataPoint as { y: number }).y
            : dataPoint;
        // 객체 형태로 데이터 저장
        contents.push({
          label: label as string,
          name: name as string,
          value: value as number,
        });
      });
      // 객체 배열을 상태로 설정
      setTooltipContent(contents);
    }
  }, [data]);

  return (
    <LineChartContainer>
      <Line options={modifiedOptions} data={data} />
      <TooltipContainer>
        <DayText>
          최근 기록
          <br />
          {dayjs(tooltipContent[0]?.label).isValid()
            ? dayjs(tooltipContent[0]?.label).format("YYYY.MM.DD")
            : "측정 기록이 없습니다."}
        </DayText>
        {tooltipContent?.map((item) => (
          <TooltipTextWrapper>
            <TooltipText>{item.name}</TooltipText>
            <TooltipText>{item.value || 0}</TooltipText>
          </TooltipTextWrapper>
        ))}
      </TooltipContainer>
    </LineChartContainer>
  );
}
const TooltipContainer = styled.div`
  position: absolute;
  bottom: -3.5rem;
  right: 0;
  display: flex;
  align-items: center;
  width: 100%;
  border-radius: 0.5rem;
  z-index: 1001;
`;
const TooltipTextWrapper = styled.div`
  & + & {
    margin-left: 0.5rem;
    padding-left: 0.5rem;
    border-left: 1px solid #dbdbdb;
  }
  display: flex;
  flex-direction: column;
  align-items: center;

  justify-content: center;
  margin-left: auto;
`;
const TooltipText = styled.p`
  font-size: 14px;
  color: ${theme.colors.main};
  font-weight: 600;
  letter-spacing: 0.5px;
  line-height: 1.2;
`;
const DayText = styled.p`
  font-size: 14px;
  color: ${theme.colors.main};
  font-weight: 600;
`;
const LineChartContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;
