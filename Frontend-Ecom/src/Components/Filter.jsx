import React, { useState } from 'react'
import { IoIosArrowDropdown ,IoIosArrowDropup} from "react-icons/io";
import { RxCross2 ,RxPlus} from "react-icons/rx";





function Filter() {
    const [category,setCategory]=useState(true)
    const [size, setSize]=useState(true)
    const [color,setColor]=useState(true)
    const [price, setPrice]=useState(true)

    const [categoryFilter,setCategoryFilter]=useState([])
    const [sizeFilter,setSizeFilter]=useState([])
    const [priceFilter,setPriceFilter]=useState([])
    const [colorFilter,setColorFilter]=useState([])

    const clearFilter=()=>{
        setCategoryFilter([])
        setColorFilter([])
        setPriceFilter([])
        setSizeFilter([])
        console.log("All cleared !!!")
    }


    const handleCategoryCheckbox=(e)=>{
        const value=e.target.value
        console.log("Value in category filter is ",categoryFilter)
        if(e.target.checked){
            setCategoryFilter(prev=>[...prev,value])
        }
        else{
            setCategoryFilter(prev=>prev.filter(items=>items!=value))
        }
    }

    const handleSizeCheckbox=(e)=>{
        const value=e.target.value
        console.log("Value in size filter is ",sizeFilter)
        if(e.target.checked){
            setSizeFilter(prev=>[...prev,value])
        }
        else{
            setSizeFilter(prev=>prev.filter(items=>items!=value))
        }
    }


    const handlePriceCheckbox=(e)=>{
        const value=e.target.value
        console.log("Value in price Filter is ",priceFilter)
        if(e.target.checked){
            setPriceFilter(prev=>[...prev,value])
        }
        else{
            setPriceFilter(prev=>prev.filter(items=>items!=value))
        }
    }


    const handleColorCheckbox=(e)=>{
        const value=e.target.value
        console.log("Value in color Filter is ",colorFilter)
        if(e.target.checked){
            setColorFilter(prev=>[...prev,value])
        }
        else{
            setColorFilter(prev=>prev.filter(items=>items!=value))
        }
    }

  return (
    <div className='w-full flex h-screen '>

        <div className='w-1/4 mt-25 mx-5 p-6 space-y-6 flex flex-col items-center h-screen rounded-2xl border-1 select-none '>
            <p className='text-left w-full text-2xl font-semibold'>Filter</p>

            <div className='w-full '>
                <div className='flex justify-between mb-2 text-lg font-semibold'>
                    <p>Category</p>
                    <p onClick={()=>{setCategory(prev=>!prev); console.log('Hi',category)}} className='cursor-pointer'> {category?<IoIosArrowDropup  className='size-5'/> :<IoIosArrowDropdown className='size-5' />}</p>
                </div>
                {category && (['Shirt','Pants','Dress','Jackets'].map((items,indx)=>{
                    return (
                    <div key={items+indx} className='flex gap-2 items-center'>
                        <input type='checkbox' className='size-4' value={items} checked={categoryFilter.includes(items)} onChange={handleCategoryCheckbox}/>
                        <p>{items}</p>

                    </div>)
                }))}

                <hr className='mt-4'></hr>
            </div>

            <div className='w-full'>
                <div className='flex justify-between mb-2 text-lg font-semibold'>
                    <p>Sizes</p>
                    <p onClick={()=>setSize(prev=>!prev)} className='cursor-pointer'>{size?<IoIosArrowDropup  className='size-5'/> :<IoIosArrowDropdown className='size-5' />}</p>
                </div>
                {size && (['XS','S','L','XL'].map((items,indx)=>{
                    return (
                    <div key={items+indx} className='flex gap-2 items-center'>
                        <input type='checkbox' className='size-4' value={items} checked={sizeFilter.includes(items)} onChange={handleSizeCheckbox}/>
                        <p>{items}</p>

                    </div>)
                }))}
                <hr className='mt-4'></hr>
            </div>

            <div className='w-full'>
                <div className='flex justify-between mb-2 text-lg font-semibold'>
                    <p>Color</p>
                    <p onClick={()=>setColor(prev=>!prev)} className='cursor-pointer'>{color?<IoIosArrowDropup  className='size-5'/> :<IoIosArrowDropdown className='size-5' />}</p>
                </div>
                {color && (['Black','Blue','Red','White'].map((items,indx)=>{
                    return (
                    <div key={items+indx} className='flex gap-2 items-center'>
                        <input type='checkbox' className='size-4' value={items} checked={colorFilter.includes(items)} onChange={handleColorCheckbox}/>
                        <p>{items}</p>

                    </div>)
                }))}
                <hr className='mt-4'></hr>
            </div>

            <div className='w-full'>
                <div className='flex justify-between mb-2 text-lg font-semibold'>
                    <p>Price</p>
                    <p onClick={()=>setPrice(prev=>!prev)} className='cursor-pointer'>{price?<IoIosArrowDropup  className='size-5'/> :<IoIosArrowDropdown className='size-5' />}</p>
                </div>
                {price && (['Under $25','$25 - $50','$50 - $100','Over $100'].map((items,indx)=>{
                    return (
                    <div key={items+indx} className='flex gap-2 items-center'>
                        <input type='checkbox' className='size-4' value={items} checked={priceFilter.includes(items)} onChange={handlePriceCheckbox}/>
                        <p>{items}</p>

                    </div>)
                }))}
                <hr className='mt-4'></hr>
            </div>

            {(categoryFilter.length!=0 || sizeFilter.length!=0 || priceFilter.length!=0 || colorFilter.length!=0 )&& (<div className='w-3/4 flex justify-center rounded-xl hover:bg-blue-300 duration-300'>
                <p className='py-2' onClick={clearFilter}>Clear Filter</p>
            </div>)}

        </div>
        <div className='w-3/4 h-screen mt-25 flex justify-between'>
            <div className='flex space-x-2 h-min'>
                <div className='py-1 px-3 h-min rounded-lg border-1 flex items-center bg-black text-white'>FILTERS</div>
                <p className='border-1 py-1 h-8 mr-4 ml-2 '> </p>
                <div className='flex flex-wrap gap-2'>
                { categoryFilter && (categoryFilter.map((items)=>{
                    return(
                        <div key={items} className='py-1 px-3 h-min rounded-lg border-1 flex items-center'>
                            {items} <RxCross2 className='ml-2' onClick={()=>setCategoryFilter(prev=>prev.filter(item=>item!=items))}/>
                        </div>
                    )
                }))}
                { sizeFilter && (sizeFilter.map((items)=>{
                    return(
                        <div key={items} className='py-1 px-3 h-min rounded-lg border-1 flex items-center'>
                            {items} <RxCross2 className='ml-2' onClick={()=>setSizeFilter(prev=>prev.filter(item=>item!=items))}/>
                        </div>
                    )
                }))}
                  { colorFilter && (colorFilter.map((items)=>{
                    return(
                        <div key={items} className='py-1 px-3 h-min rounded-lg border-1 flex items-center'>
                            {items} <RxCross2 className='ml-2' onClick={()=>setColorFilter(prev=>prev.filter(item=>item!=items))}/>
                        </div>
                    )
                }))}
                </div>
              
            </div>
            <div className='py-1 ml-5 mr-5 px-3 h-min rounded-lg border-1 flex items-center'><p className='whitespace-nowrap'>SORT BY</p><RxPlus className=' ml-2'/>
            </div>
        </div>
      
    </div>
  )
}

export default Filter