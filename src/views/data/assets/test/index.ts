
import qs from 'query-string';

export interface SysAssetsParams {
  ip_addr: string;
  assets_name: string;
  assets_ports?: string[];
  assets_services?: string[];
  assets_desc?: string;
  assets_status: boolean;
  assets_remarks: string[];
  create_time: string;
  update_time?: string;
}

export interface SysAssetsReq {
  assets_name?: string;
  page?: number;
  size?: number;
}

export interface SysAssetsRes extends SysAssetsParams {
  id: number;
}

export interface SysAssetsListRes {
  items: SysAssetsRes[];
  total: number;
}

export interface SysAssetsPickParams {
  pk: number[];
}


export function querySysAssetsListTest(params: SysAssetsParams): SysAssetsListRes {
  return {
      items:[
      {
        id: 1,
        ip_addr: '172.16.1.16',
        assets_name: 'bjdx',
        assets_ports: ['80', '8080', '12000', '233'],
        assets_services: [],
        assets_desc: 'wefjjjjjjjjjjjjjjjjjjjjjfnnnnnnnnnnnnnnnnnnnnnn',
        assets_status: true,
        assets_remarks: ['sdijf', 'fwfee'],
        create_time: '2024-12-04T09:25:02.384358Z',
        update_time: '2024-11-06T03:19:50.727528Z'
      },
      {
        id: 2,
        ip_addr: '192.168.21.200',
        assets_name: 'bjwwdx',
        assets_ports: ['8012'],
        assets_services: ['wd', 'ce'],
        assets_desc: 'weqdnnnnnnnnnnnnnnnnnnnnnn',
        assets_status: true,
        assets_remarks: ['sdijf', 'fwfee'],
        create_time: '2024-12-04T09:25:02.384358Z',
        update_time: '2024-11-06T03:19:50.727528Z'
      },
      {
        id: 3,
        ip_addr: '192.168.1.16',
        assets_name: 'bjdx',
        assets_ports: [],
        assets_services: [],
        assets_desc: 'wefjjjjjjjjjjjjjwnnnnnnnnnnnnnnn',
        assets_status: false,
        assets_remarks: ['sdijf', 'fwfee'],
        create_time: '2024-12-04T09:25:02.384358Z',
        update_time: '2024-11-06T03:19:50.727528Z'
      },  
    ],
    total:3
  }
}


export function querySysAssetsDetailTest(pk: number): SysAssetsRes {
  return  {
    id: 3,
    ip_addr: '192.168.1.16',
    assets_name: 'bjdx',
    assets_ports: [],
    assets_services: [],
    assets_desc: 'wefjjjjjjjjjjjjjwnnnnnnnnnnnnnnn',
    assets_status: false,
    assets_remarks: ['sdijf', 'fwfee'],
    create_time: '2024-12-04T09:25:02.384358Z',
    update_time: '2024-11-06T03:19:50.727528Z'
  }
}

export function createSysAssets(data: SysAssetsReq) {
  console.log(data);
  return 1;
}

export function updateSysAssets(pk: number, data: SysAssetsReq) {
  console.log(pk, data);
  return 1;
}

export function deleteSysAssets(params: SysAssetsPickParams) {
  console.log(params);
  return 1;
}