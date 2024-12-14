import { useState } from "react";

function Counter() {
    let [count, setCount] = useState(0)
    function increment() {
        setCount((prevCount)=>prevCount+1)
    }
    function decrement() {
        setCount((prevCount)=>prevCount-1)
    }

    return (
        <>
            <p className="p-11 font-extrabold" >{count}</p>
            <button className="p-11 font-extrabold" onClick={increment} >+</button>
            <button className="p-11 font-extrabold"  onClick={decrement}>-</button>
        </>
    )
}


export default Counter