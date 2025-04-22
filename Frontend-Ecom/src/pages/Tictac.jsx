import React,{useEffect, useState} from 'react'

function Tictac() {
    const [turn,setTurn]=useState('X')
    const [a1,seta1]=useState('')
    const [b1,setb1]=useState('')
    const [c1,setc1]=useState('')
    const [a2,seta2]=useState('')
    const [a3,seta3]=useState('')
    const [b2,setb2]=useState('')
    const [b3,setb3]=useState('')
    const [c2,setc2]=useState('')
    const [c3,setc3]=useState('')

    const [winner,setwinner]=useState('')
    const nextTurn=()=>{
        turn==="X"?setTurn('O'):setTurn('X')
        console.log("next turn")
        if (winner==""){
            console.log("hi")
            console.log("here",a3)
            if(a1==a2 && a2==a3 && a1!=""){
                console.log("winner")
                setwinner(a1)
            }
        }
    }

    

  return (
    <div className='mt-20 flex flex-col items-center justify-center'>
        <div className=''>Tic tac</div>
        <div className='felx flex-col space-y-2'>

        <div className='flex gap-2'>
            <div className={`w-16 h-16 bg-red-200 place-content-center text-center rounded-2xl cursor-pointer select-none ${a1==""?'':'pointer-events-none'}`} onClick={()=>{seta1(turn); nextTurn()}}>{a1}</div>
            <div className={`w-16 h-16 bg-green-200 place-content-center text-center rounded-2xl cursor-pointer select-none ${b1==""?'':'pointer-events-none'}`} onClick={()=>{setb1(turn); nextTurn()}}>{b1}</div>
            <div className={`w-16 h-16 bg-green-200 place-content-center text-center rounded-2xl cursor-pointer select-none ${c1==""?'':'pointer-events-none'}`} onClick={()=>{setc1(turn); nextTurn()}}>{c1}</div>
        </div>

        <div className='flex gap-2'>
            <div className={`w-16 h-16 bg-red-200 place-content-center text-center rounded-2xl cursor-pointer select-none ${a2==""?'':'pointer-events-none'}`} onClick={()=>{seta2(turn); nextTurn()}}>{a2}</div>
            <div className={`w-16 h-16 bg-green-200 place-content-center text-center rounded-2xl cursor-pointer select-none ${b2==""?'':'pointer-events-none'}`} onClick={()=>{setb2(turn); nextTurn()}}>{b2}</div>
            <div className={`w-16 h-16 bg-green-200 place-content-center text-center rounded-2xl cursor-pointer select-none ${c2==""?'':'pointer-events-none'}`} onClick={()=>{setc2(turn); nextTurn()}}>{c2}</div>
        </div>

        <div className='flex gap-2'>
            <div className={`w-16 h-16 bg-red-200 place-content-center text-center rounded-2xl cursor-pointer select-none ${a3==""?'':'pointer-events-none'}`} onClick={()=>{seta3(turn); nextTurn()}}>{a3}</div>
            <div className={`w-16 h-16 bg-green-200 place-content-center text-center rounded-2xl cursor-pointer select-none ${b3==""?'':'pointer-events-none'}`} onClick={()=>{setb3(turn); nextTurn()}}>{b3}</div>
            <div className={`w-16 h-16 bg-green-200 place-content-center text-center rounded-2xl cursor-pointer select-none ${c3==""?'':'pointer-events-none'}`} onClick={()=>{setc3(turn); nextTurn()}}>{c3}</div>
        </div>

        <div> Winner : {winner}</div>

        </div>
       
    </div>
  )
}

export default Tictac