import type { ProfileDetail, ProfileParams } from '@/types/profile'
import { http } from '@/utils/http'
/**
 * 获取个人信息
 */
export const GetMemberProfileAPI = () => {
  return http<ProfileDetail>({
    method: 'GET',
    url: '/member/profile',
  })
}
/**
 * 修改个人信息
 */
export const PutMemberProfileAPI = (data: ProfileParams) => {
  return http<ProfileDetail>({
    method: 'PUT',
    url: '/member/profile',
    data,
  })
}
