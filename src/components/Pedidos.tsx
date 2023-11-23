import { useState, useRef } from "react";


interface Props { 
    pedidos: string[];
    id:number;
    hora:string;
    color:keyof ColorVariants;
    key: number;
    pedidoEntero: TipoPedido[]; 
    pedidoActual: TipoPedido; 
    setPedidoActual: React.Dispatch<React.SetStateAction<TipoPedido[]>>;
    setPedidoIzquierda: React.Dispatch<React.SetStateAction<TipoPedido[]>>;
    setPedidoDerecha: React.Dispatch<React.SetStateAction<TipoPedido[]>>;
    PedidoIzquierda: boolean;
    PedidoDerecha: boolean;
    moverse: boolean;

}
  type TipoPedido= {
    pedidos: string[];
    hora: string;
    id: number;
}

  interface ColorVariants {
    verde: string[];
    amarillo: string[];
    rojo: string[];
}

const Pedidos: React.FC<Props> = ({ pedidos, color, key, id, pedidoActual, hora, setPedidoActual, pedidoEntero, setPedidoDerecha, setPedidoIzquierda, PedidoIzquierda, PedidoDerecha, moverse}) => {
//-------------------------Constantes de rotacion y colores-----------------------------

    const [rotation, setRotation] = useState(false);
    
    const handleClickRotation = () => {
        setRotation(!rotation);
    };
    const colorvariants:ColorVariants ={
        verde: ['bg-[#00B493]', 'bg-[#00b42f33]'],
        amarillo: ['bg-[#D29B2ECC]', 'bg-[#d29b2e40]'],
        rojo: ['bg-RojoPedido', 'bg-[#d2382e33]'],
    };

    const handleClickIzquierda = () =>{
        if (PedidoIzquierda){
            if (moverse){
                console.log("entró")
                setPedidoIzquierda(pedidoviejo => [...pedidoviejo, pedidoActual])
                setPedidoActual(pedidoEntero.filter(item => item.id !== id));  
                setRotation(false);
                //state = pendiente
            }
           
        }
    };

    const precio =[2000, 3600, 7200, 1700]
    const handleClickDerecha = () =>{
        if (PedidoDerecha){
            if(moverse){
                console.log("entró")
                setPedidoDerecha(pedidoviejo => [...pedidoviejo, pedidoActual])
                setRotation(false);
                setPedidoActual(pedidoEntero.filter(item => item.id !== id)); 
                //state = listo 
            }
        }
    };

    const handleRemoveItem = () => {
        setPedidoActual(pedidoEntero.filter(item => item.id !== id));
                    setRotation(false);
        //state = eliminado

        // console.log(pedidoEntero);
      };
//----------------------------------- HTML ---------------------------------------
    
    return <div className={`grid mb-5  mx-10 cursor-pointer `} >
        <div className={` ${colorvariants[color][0]} flex justify-around items-center rounded-lg`}>
            <h5 className="py-4 text-black">#{id}</h5>
            <h5 className="py-4 text-black">{hora}hs</h5>
            <button
                style={{ transform: `rotate(${rotation ? "0deg" : "180deg"})` }}
                onClick={handleClickRotation}
                className={"h-[16px] w-[16px] transform  focus:rotate-0 transition-transform "}
            >
                <img src="arrow-up.svg" alt="" />
            </button>
        </div>
        {rotation ? (
            <div className="grid ">
                {pedidos.map((pedido, key)=>(
                <div className={`z-20 px-4 py-1 flex justify-between items-center ${colorvariants[color][1]} border-t border-black w-full`}>
                    <p className="text-black">{pedido}</p>
                    {id==1?<p className="text-black">1000</p>:<p className="text-black">{precio[key]}</p>}
                </div>
                ))}
                <div className={`z-20 px-4 py-3 flex justify-between items-center ${colorvariants[color][1]} border-t border-black w-full`}>
                    <button>
                        <img src="arrow-up.svg" alt="" className="-rotate-90 h-[16px] w-[16px]" onClick={handleClickIzquierda}/>
                    </button>
                    <button>
                      <img src="tacho.svg" alt="" className="w-[40px] h-[40px]" onClick={handleRemoveItem}/>
                    </button>
                    <button>
                       <img src="arrow-up.svg" alt="" className="rotate-90 h-[16px] w-[16px]" onClick={handleClickDerecha}/>    
                    </button>
                </div>
                
            </div>
            
        ) : (
            <></>
        )}
    </div>
        
}
export default Pedidos