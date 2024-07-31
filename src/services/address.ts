import type { AddressItem, AddressParams } from '@/types/address'
import { http } from '@/utils/http'
/**
 * 获取收货地址列表
 */
export const getMemberAddressAPI = () => {
  return http<AddressItem[]>({
    method: 'GET',
    url: '/member/address',
  })
}
/**
 * 删除收货地址
 *  @param id 地址id(路径参数)
 */
export const delMemberAddressIdAPI = (id: string) => {
  return http({
    method: 'DELETE',
    url: `/member/address/${id}`,
  })
}
/**
 * 新增收货地址
 */
export const postMemberAddressAPI = (data: AddressParams) => {
  return http({
    method: 'POST',
    url: '/member/address',
    data,
  })
}
/**
 * 获取收货地址详情
 */
export const getMemberAddressIdAPI = (id: string) => {
  return http<AddressItem>({
    method: 'GET',
    url: `/member/address/${id}`,
  })
}
/**
 * 编辑收货地址
 */
export const putMemberAddressIdAPI = (id: string, data: AddressParams) => {
  return http({
    method: 'PUT',
    url: `/member/address/${id}`,
    data,
  })
}
