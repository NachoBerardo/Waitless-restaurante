import { useState } from "react";
import Pedidos from "../components/Pedidos";
import DropDownRestaurante from "../components/DropDownRestaurante";
import axios from "axios";

type TipoPedido = {
    pedidos: string[];
    hora: string;
    id: number;
}

export interface MenuTypes {
    id: number;
    category: string;
    sideDish: boolean;
    price: string;
    name: string;
    description: string;
    image: string;
}

const handleDragEnterBasura = () => { }

//aca esta la funcionnnn
const getOrdersByCommand = async (commandId: number): Promise<any> => {
    try {
        const response = await axios.get(`https://nice-blue-salamander-sock.cyclic.app/orderByCommand/${commandId}`);
        if (response.status === 200) {
            const item = response.data;
            return item;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
};
const getFoodIdByOrder = async (orderId: number): Promise<any> => {
    try {
        const response = await axios.get(`https://nice-blue-salamander-sock.cyclic.app/orderByCustomer/${orderId}`);
        if (response.status === 200) {
            const item = response.data;
            return item;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
};
const getFoodByFood = async (foodId: number): Promise<any> => {
    try {
        const response = await axios.get(`https://nice-blue-salamander-sock.cyclic.app/menu/${foodId}`);
        if (response.status === 200) {
            const item = response.data;
            return item;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
};
getOrdersByCommand(1)
    .then((orders) => {
        console.log(orders);
    })
    .catch((error) => {
        console.error(error);
    });

const PantallaRestaurante: React.FC = () => {
    const [pedidosPendientes, setPedidosPendiente] = useState<TipoPedido[]>([
        { pedidos: ["Empanada", "Provoleta", "Matambre", "Volcan de chocolate"], hora: '12:20', id: 16 },
        { pedidos: ['Empanada', 'Churrasco'], hora: '12:15', id: 15 },
        { pedidos: ["Carne", "Churrasco"], hora: '12:25', id: 14 },
        { pedidos: ["Empanada", "Carne"], hora: '12:30', id: 13 },
        { pedidos: ["Empanada", "Flan"], hora: '12:35', id: 12 },
        { pedidos: ["Agua"], hora: '12:40', id: 11 },
        { pedidos: ["Empanada", "Vegano"], hora: '12:45', id: 10 },
        { pedidos: ["Provoleta", "Churrasco"], hora: '12:50', id: 9 },
        { pedidos: ["Empanada", "Churrasco", "Provoleta", "a", "Volcan de chocolate con helado", "Ensalada de papa y huevo"], hora: '12:55', id: 8 },
    ]);

    const [pedidosEnproceso, setpedidosEnproceso] = useState<TipoPedido[]>([
        { pedidos: ['Provoleta", "Papas fritas'], hora: '1:15', id: 7 },
        { pedidos: ["Coca", "Helado", "Ensalada de fruta", "Budin de pan", "Volcan de chocolate con helado y dulce de leche aaaaaa"], hora: '1:20', id: 6 },
        { pedidos: ["Provoleta", "Churrasco"], hora: '1:25', id: 5 },
    ]);

    const [pedidosCompletados, setpedidosCompletados] = useState<TipoPedido[]>([
        { pedidos: ["Pure", "Milanesa"], hora: '2:15', id: 4 },
        { pedidos: ["pollo", "Pasto"], hora: '2:20', id: 3 },
        { pedidos: ["Papas fritas", "Carne al horno"], hora: '2:25', id: 2 }

    ]);
    const [pendientes, setPendientes] = useState(true);
    const [enProceso, setEnProceso] = useState(true);
    const [completados, setCompletados] = useState(true);
    const [moverse, setMoverse] = useState(true);

    return <main className="no-scrollbar">
        <div className="w-full min-h-screen h-full bg-white no-scrollbar">
            <header className="h-fit w-full flex shadow-lg items-center">
                <div className="pl-8 flex items-center h-full w-fit py-[10px] xl:py-5 ">
                    <img src="/TresLineas.svg" className="w-16 h-16" />
                    <button className="px-[84px]">
                        <h3 className="text-black px-7 py-4 rounded-lg hover:bg-LineaPedido active:bg-ActiveHeaderRestaurante">Comandas</h3>
                    </button>
                    <button className="pr-[84px] ">
                        <h3 className="text-black px-7 py-4 rounded-lg hover:bg-LineaPedido active:bg-ActiveHeaderRestaurante">Resumen</h3>
                    </button>
                    <button className="">
                        <h3 className="text-black px-7 py-4 rounded-lg hover:bg-LineaPedido active:bg-ActiveHeaderRestaurante">Pedidos</h3>
                    </button>
                </div>
                <img src="/Logo.svg" className="h-[72px] w-24 absolute right-0 mr-8">

                </img>
            </header>
            <DropDownRestaurante setPendientes={setPendientes} setCompletados={setCompletados} setEnProceso={setEnProceso} setMoverse={setMoverse} />

            <div className="grid grid-cols-3 justify-around m-auto monitor:pt-6 xl:pt-11 z-10 ">
                <div className="ml-20">
                    {pendientes ? (
                        <div className="custombp:h-[660px] notebook:h-[570px]  border-4 rounded-[10px] border-solid border-BorderPedidosRestaurante overflow-scroll no-scrollbar">
                            <h4 className="text-BorderPedidosRestaurante pl-5 pt-5 pb-11">Pendientes</h4>
                            {pedidosPendientes.map((pedidosMap, key) => (
                                <div key={key}>
                                    <Pedidos
                                        setPedidoActual={setPedidosPendiente}
                                        pedidoEntero={pedidosPendientes}
                                        pedidoActual={pedidosMap}
                                        pedidos={pedidosMap.pedidos}
                                        id={pedidosMap.id}
                                        hora={pedidosMap.hora}
                                        color={"rojo"}
                                        key={key}
                                        setPedidoDerecha={setpedidosEnproceso}
                                        setPedidoIzquierda={setpedidosCompletados}
                                        PedidoDerecha={true}
                                        PedidoIzquierda={false}
                                        moverse={moverse}
                                    ></Pedidos>
                                </div>
                            ))}
                        </div>
                    ) : (<></>)}

                </div>
                <div className="ml-6 mr-6 ">
                    {enProceso ? (
                        <div className="custombp:h-[660px] notebook:h-[570px]  border-4 rounded-[10px] border-solid border-BorderPedidosRestaurante overflow-scroll no-scrollbar">
                            <h4 className="text-BorderPedidosRestaurante pl-5 pt-5 pb-11">En Proceso</h4>
                            {pedidosEnproceso.map((pedidosMap, key) => (
                                <div key={key}>
                                    <Pedidos setPedidoActual={setpedidosEnproceso}
                                        pedidoActual={pedidosMap}
                                        pedidoEntero={pedidosEnproceso}
                                        pedidos={pedidosMap.pedidos}
                                        id={pedidosMap.id}
                                        hora={pedidosMap.hora}
                                        color={"amarillo"}
                                        key={key}
                                        setPedidoDerecha={setpedidosCompletados}
                                        setPedidoIzquierda={setPedidosPendiente}
                                        PedidoDerecha={true}
                                        PedidoIzquierda={true}
                                        moverse={moverse}
                                    ></Pedidos>
                                </div>
                            ))}
                        </div>
                    ) : (<></>)}

                </div>
                <div className="mr-20">
                    {completados ? (
                        <div className="custombp:h-[660px] notebook:h-[570px]  border-4 rounded-[10px] border-solid border-BorderPedidosRestaurante overflow-scroll no-scrollbar">
                            <h4 className="text-BorderPedidosRestaurante pl-5 pt-5 pb-11">Completados</h4>
                            {pedidosCompletados.map((pedidosMap, key) => (
                                <div key={key}>
                                    <Pedidos setPedidoActual={setpedidosCompletados}
                                        pedidoEntero={pedidosCompletados}
                                        pedidoActual={pedidosMap}
                                        pedidos={pedidosMap.pedidos}
                                        id={pedidosMap.id}
                                        hora={pedidosMap.hora}
                                        color={"verde"}
                                        key={key}
                                        setPedidoDerecha={setPedidosPendiente}
                                        setPedidoIzquierda={setpedidosEnproceso}
                                        PedidoDerecha={false}
                                        PedidoIzquierda={true}
                                        moverse={moverse}
                                    ></Pedidos>
                                </div>
                            ))}
                        </div>
                    ) : (<></>)}
                </div>
            </div>

            <footer className="absolute bottom-0 w-full h-fit flex justify-center items-center pb-3 pt-5" >
                <button>
                </button>
            </footer>
        </div>

    </main>;

}

export default PantallaRestaurante


