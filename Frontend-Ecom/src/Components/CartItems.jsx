import React, { useEffect, useState } from 'react';
import { nanoid } from '@reduxjs/toolkit';
import Input from './Input';
import dbService from '../appwrite/config';
import { removeFromCart } from '../Context/shopSlice';
import { useDispatch } from 'react-redux';

function CartItems() {
  const dispatch=useDispatch()
  const [all_item, setAllItem] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  const removeItem = async (id,productId) => {
    try {
      console.log('Removing item with ID:', id);
      const item = await dbService.deleteCartItem(id);
      if (item) {
        console.log('Item successfully deleted'); 
        dispatch(removeFromCart(productId))
        // Update the local state to remove the deleted item
        setAllItem((prevItems) => prevItems.filter((item) => item.$id !== id));
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const posts = await dbService.getCartItem();
        if (posts) {
          console.log('Fetched cart items:', posts.documents);
          setAllItem(posts.documents);
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, []);

  useEffect(() => {
    // Calculate subtotal whenever `all_item` changes
    const calculateSubtotal = () => {
      const total = all_item.reduce(
        (acc, item) => acc + Number(item.Price) * Number(item.Quantity),
        0
      );
      setSubtotal(total);
    };

    calculateSubtotal();
  }, [all_item]);

  console.log(all_item)
  return (
    <div className="w-screen mt-14">
      <div key={nanoid()} className="w-4/5 justify-self-center">

        <div className="py-4 mx-6 grid grid-cols-12">
          <p key="12" className="col-span-1">Products</p>
          <p key="43" className="col-span-3">Name</p>
          <p key="14" className="col-span-2">Price</p>
          <p key="15" className="col-span-2">Quantity</p>
          <p key="16" className="col-span-2">Size</p>
          <p key="17" className="col-span-2">Remove</p>
        </div>

        <hr />

        {all_item.length > 0 &&
          all_item.map((items) => (
            <React.Fragment key={items.$id}>
              <div className="py-4 mx-6 grid grid-cols-12 items-center">
                <img
                  className="w-12 h-14 col-span-1"
                  src={items.Image}
                  alt="Product"
                />
                <p className="col-span-3">{items.Name}</p>
                <p className="col-span-2">{items.Price}</p>
                <p className="col-span-2">{items.Quantity}</p>
                <p className="col-span-2">
                  {/* {Number(items.Price) * Number(items.Quantity)} */}
                  {items.Size}
                </p>
                <p
                  onClick={() => removeItem(items.$id,items.ProductId)}
                  className="col-span-2 cursor-pointer text-2xl"
                >
                  X
                </p>
              </div>
              <hr />
            </React.Fragment>
          ))}


<div>
        <div className="flex justify-between mt-20">

          <div className="flex flex-col w-1/2 pr-20">
            <p className="text-2xl text-left mb-7">Cart Totals</p>
            <div className="flex justify-between p-2">
              <p>Subtotal</p>
              <p>$ {subtotal}</p>
            </div>
            <hr />
            <div className="flex justify-between p-2">
              <p>Delivery</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="flex justify-between p-2 bg-slate-200">
              <p>Total</p>
              <p>$ {subtotal}</p>
            </div>
          </div>

          <div className="items-start flex flex-col  w-1/2 pl-20">
            <p>Promo Code</p>
            <div className="flex w-full justify-evenly items-baseline">
              <Input
                placeholder="promo code"
                className="bg-slate-200 w-full h-14 px-4 mt-4"
              />
              <button className="bg-black text-white w-1/3 h-14">
                Submit
              </button>
            </div>
          </div>
          </div>
          <div className='w-1/3 mt-10 px-5 py-2 text-xl text-center text-white bg-red-500 hover:bg-red-600 duration-300 rounded-md cursor-pointer '>
            Continue to checkout
          </div>

     

        </div>
      </div>
    </div>
  );
}

export default CartItems;
