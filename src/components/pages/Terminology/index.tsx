import { useEffect, useState } from "react";

import styled from "styled-components";
import Layout from "../../../components/templates/Mainlayout/layout";
import {
  Section,
  Box,
  SubTitle,
} from "../../../components/atoms/BoxModel/BoxModel";
import Select from "../../atoms/Select/Select";

import { Terms } from "../../../types/types";
import termData from "../../../api/term.json";

export default function TerminologyPage() {
  const [data, setData] = useState<Terms[]>([]);
  const filterText = ["ALL", "기본용어", "운동용어", "장비용어"];
  const [filter, setFilter] = useState<string>("ALL");

  useEffect(() => {
    const filteredData = termData.filter((data) => {
      if (filter === "ALL") {
        return true;
      } else {
        return data.type === filter;
      }
    });
    setData(filteredData);
  }, [filter]);

  return (
    <Layout title={"크로스핏 용어"} backBtn>
      <MainSection>
        <Select value={filter} setValue={setFilter} text={filterText} />
        <TermTitle>{filter}</TermTitle>
        <TermList>
          {data
            ?.filter((item) => item.type === filter || filter === "ALL")
            ?.map((data, index) => {
              return (
                <TermItem key={index}>
                  <TermBox>
                    <TermTitle>{data.name}</TermTitle>
                    <TermBox>{data.meaning}</TermBox>
                  </TermBox>
                </TermItem>
              );
            })}
        </TermList>
      </MainSection>
    </Layout>
  );
}

const MainSection = styled(Section)`
  padding: 1rem;
`;

const TermBox = styled(Box)`
  display: grid;
  grid-template-columns: minmax(80px, 150px) minmax(100px, 1fr);
  & > & {
    display: flex;
    line-height: 1.5;
    font-size: ${({ theme }) => theme.fontSize.md};
  }
`;
const TermTitle = styled(SubTitle)`
  font-size: ${({ theme }) => theme.fontSize.lg};
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: 1rem;
`;
const TermItem = styled.li`
  & + & {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid ${({ theme }) => theme.colors.sub};
  }
  ${TermTitle} {
    margin-bottom: 0;
    font-size: ${({ theme }) => theme.fontSize.md};
  }
`;
const TermList = styled.ul`
  margin-top: 1.5rem;
`;
