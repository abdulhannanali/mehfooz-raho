import { Col, Input, Select } from "antd";
import GutterRow from "../../GutterRow";
import { ChangeEvent, useEffect, useState } from "react";

import {
  selectDistricts,
  selectProvinces,
  selectFetchState,
  getFilterDataThunk,
} from "./slice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { FetchState } from "../FetchState";
import { VaccinationCentresFilter } from "../vaccinationCentres/slice/types";

export interface FilterChangeObject {
  district?: string;
  province?: string;
  text?: string;
}

export interface CentresFilterProps {
  onChangeFilter: (filterChangeObject: FilterChangeObject) => void;
  currentFilter: VaccinationCentresFilter;
}

/**
 * Centres Filter are available for better utilization
 */
export default function CentresFilter(props: CentresFilterProps) {
  const dispatch = useAppDispatch();
  const { onChangeFilter, currentFilter } = props;

  const fetchState = useAppSelector(selectFetchState);
  let districts = useAppSelector(selectDistricts);
  let provinces = useAppSelector(selectProvinces);

  if (fetchState === FetchState.idle) {
    dispatch(getFilterDataThunk());
  }

  if (
    districts === undefined ||
    provinces === undefined ||
    fetchState === FetchState.pending ||
    fetchState === FetchState.idle
  ) {
    districts = [];
    provinces = [];
  }

  const [initialFireCompleted, setInitialFire] = useState<boolean>(false);
  const [district, setDistrict] = useState<string | undefined>(
    currentFilter.district
  );
  const [province, setProvince] = useState<string | undefined>(
    currentFilter.province
  );
  const [text, setText] = useState<string | undefined>(
    currentFilter.filterText
  );

  useEffect(() => {
    if (initialFireCompleted) {
      onChangeFilter({
        district,
        province,
        text,
      });
    }

    setInitialFire(true);
  }, [district, province, text]);

  function onSelectDistrict(value: string) {
    setDistrict(value);
  }

  function onClearDistrict () {
    setDistrict(undefined)
  }


  function onSelectProvince(value: string) {
    setProvince(value);
  }

  function onClearProvince () {
    setProvince(undefined)
  }

  function onChangeSearchText(event: ChangeEvent<HTMLInputElement>) {
    setText(event.target.value);
  }


  const filterSelectStyle = {
    width: "100%",
  };

  return (
    <GutterRow gutter={[8, 12]}>
      <Col xs={24}>
        <Input
          size="large"
          placeholder="Search here..."
          value={text}
          allowClear={true}
          onChange={onChangeSearchText}
        />
      </Col>
      <Col xs={24}>
        <Select
          style={filterSelectStyle}
          placeholder="Filter by District"
          size="large"
          dropdownMatchSelectWidth={true}
          value={district}
          allowClear={true}
          onClear={onClearDistrict}
          onSelect={onSelectDistrict}
        >
          {districts?.map((district) => (
            <Select.Option key={district} value={district}>
              {district}
            </Select.Option>
          ))}
        </Select>
      </Col>
      <Col xs={24}>
        <Select
          defaultValue={undefined}
          style={filterSelectStyle}
          placeholder="Filter by Province"
          size="large"
          value={province}
          dropdownMatchSelectWidth={true}
          allowClear={true}
          onClear={onClearProvince}
          onSelect={onSelectProvince}
        >
          {provinces?.map((province) => (
            <Select.Option key={province} value={province}>
              {province}
            </Select.Option>
          ))}
        </Select>
      </Col>
    </GutterRow>
  );
}
