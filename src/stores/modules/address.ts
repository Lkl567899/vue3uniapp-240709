import type { AddressItem } from '@/types/address'
import { defineStore } from 'pinia'
import { ref } from 'vue'

// 地址
export const useAddressStore = defineStore('address', () => {
  const addressItem = ref<AddressItem>()
  const setAddressItem = (val: AddressItem) => {
    addressItem.value = val
  }
  return {
    addressItem,
    setAddressItem,
  }
})
