
import qs from 'query-string';

export interface SysOrgReq {
  org_name: string;
  org_file_nums: number;
  org_assets_nums: number;
  org_desc: string;
  create_time: string;
  update_time: string;
}

export interface SysOrgRes extends SysOrgReq {
  id: number;
}

export interface SysOrgParams {
  org_name?: string;
  page: number;
  size: number;
}

export interface SysOrgListRes {
  items: SysOrgRes[];
  total: number;
}

export interface SysOrgPickParams {
  pk: number[];
}

export function querySysOrgListTest(params: SysOrgParams): SysOrgListRes {
  return {
    items:[
    {
      id: 1,
      org_name: "时空哦哦2233",
      org_file_nums: 1,
      org_assets_nums: 1,
      org_desc: '',
      create_time: '2024-12-04T09:25:02.384358Z',
      update_time: '2024-11-06T03:19:50.727528Z'
    },
    {
      id: 2,
      org_name: "时空哦wwwwwwww哦2233",
      org_file_nums: 999,
      org_assets_nums: 99,
      org_desc: '顶顶顶顶顶顶顶',
      create_time: '2024-12-04T09:25:02.384358Z',
      update_time: '2024-11-06T03:19:50.727528Z'
    },
    {
      id: 3,
      org_name: "时哦2233",
      org_file_nums: 78,
      org_assets_nums: 187,
      org_desc: '为谔谔谔谔谔谔谔谔谔谔谔谔谔谔谔谔谔谔我顶顶顶顶顶顶顶顶顶顶顶顶顶顶顶',
      create_time: '2024-12-04T09:25:02.384358Z',
      update_time: '2024-11-06T03:19:50.727528Z'
    },      
  ],
  total:3
}
}


export function querySysOrgDetailTest(pk: number): SysOrgRes {
  return {
      id: 1,
      org_name: "时空哦哦2233",
      org_file_nums: 1,
      org_assets_nums: 1,
      org_desc: '',
      create_time: '2024-12-04T09:25:02.384358Z',
      update_time: '2024-11-06T03:19:50.727528Z'
    }
}

export function createSysOrg(data: SysOrgReq) {
  console.log(data);
  return 1;
}

export function updateSysOrg(pk: number, data: SysOrgReq) {
  console.log(pk, data);
  return 1;
}

export function deleteSysOrg(params: SysOrgPickParams) {
  console.log(params);
  return 1;
}