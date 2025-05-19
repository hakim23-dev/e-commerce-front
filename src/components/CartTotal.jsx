import React from 'react'
import Title from './Title'
import { useSelector } from 'react-redux'

export default function CartTotal() {
  const totalPrice=useSelector(state=>state.cart.totalPrice)
  return (
    <div className='w-full'>
      <div className='text-2xl'>
        <Title text1={'CART'} text2={'TOTALS'} />
      </div>
      <div className='flex flex-col gap-2 mt-2 text-sm'>
        <div className='flex justify-between'>
          <p>Subtotal</p>
          <p>{totalPrice}</p>
        </div>
        <hr />
        <div className='flex justify-between'>
          <p>Free Shipping</p>
          <p>$ 0</p>
        </div>
        <hr />
        <div className='flex justify-between'>
          <b>Total</b>
          <b>$ {totalPrice}</b>
        </div>
      </div>
    </div>
  )
}
