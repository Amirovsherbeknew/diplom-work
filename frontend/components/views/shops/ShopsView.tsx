'use client'
import { useQuery } from '@tanstack/react-query'
import { Button, Spin, Alert } from 'antd'
import { useState } from 'react'
import CreateShopsModal from '@/components/dialogs/CreateShopsModal'
import Card from '@/components/widgets/Card'
import axios_ from '@/plugins/axios'
async function fetchShops() {
  const res = await axios_('/shop', {
    method: 'GET',
    cache: 'no-store', // cache bo‘lmasin
  });
  if (!res.ok) throw new Error('Xatolik yuz berdi!');
  return res.json();
}

export default function ShopsView() {
  const [isModal, setIsModal] = useState(false)

  const { data: shops, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['shops'],
    queryFn: fetchShops,
    cacheTime: 0,        // caching yo‘q
    staleTime: 0,        // har safar yangidan request bo‘lsin
    refetchOnWindowFocus: false, // tab o‘zgarsa qayta fetch qilinmasin
  })

  return (
    <Card>
      <Button onClick={() => setIsModal(true)}>Modal ochish</Button>
      {isModal && <CreateShopsModal modelValue={isModal} onChange={setIsModal} />}

      {/* Loading */}
{JSON.stringify(isError)}
      {isLoading && <Spin tip="Ma'lumotlar yuklanmoqda..." />}
      {/* Error */}
      {isError && <Alert message="Xatolik" description={(error as Error).message} type="error" showIcon />}

      {/* Ma'lumotlar */}
      {!isLoading && !isError && (
        <ul>
          {shops?.map((shop: any) => (
            <li key={shop.id}>{shop.name}</li>
          ))}
        </ul>
      )}
    </Card>
  )
}
