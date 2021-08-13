export interface ProvinceFilter {
  province: string;
}

export interface DistrictFilter {
  province: string;
  district: string;
}

export type Filter = ProvinceFilter | DistrictFilter;

export function isDistrictFilter(filter: Filter): filter is DistrictFilter {
  return "province" in filter && "district" in filter;
}

export function isProvinceFilter(filter: Filter): filter is ProvinceFilter {
  return "province" in filter;
}
