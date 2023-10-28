import { Inter } from "next/font/google";
import { type } from "os";
import { useEffect, useState } from "react";
import ScrollBar from "../components/scrollbar";
import HeaderMenu from "../components/headerMenu";
import PopUp from "../components/PopUp";
import FooterMenu from "../components/footerMenu";
import ContenidoPedido from "../components/ContenidoPedido";
import { useQuery } from '@tanstack/react-query';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { table } from "console";

export interface MenuTypes {
  idFood: number;
  category: string;
  sideDish: boolean;
  price: string;
  name: string;
  description: string;
  image: string;
}

interface CommandData {
  idCommand: number;
  sendedAt: Date;
  total: number;
  tableId: number;
}

interface FoodOrder {
  foodName: string,
  foodId: number,
  amount: number
}

const inter = Inter({ subsets: ["latin"] });

export default function Menu() {
  const [menu, setMenu] = useState<MenuTypes[]>([]);
  const [pedido, setPedido] = useState<FoodOrder[]>([]);

  const getAllMenus = async () => {
    try {
      return await axios.get("https://perfect-teal-beetle.cyclic.cloud/menu").then((response) => {
        console.log(response.data.data)
        return response.data.data
      }).catch((err) => console.log(err))
    } catch (error) {
      console.log(error)
    }
  }

  const getAllCommand = async () => {
    try {
      return await axios.get("https://perfect-teal-beetle.cyclic.cloud/command").then((response) => {
        console.log(response.data.data)
        return response.data.data
      }).catch((err) => console.log(err))
    } catch (error) {
      console.log(error)
    }
  }
  // const getCommandByTable = async (table: number): Promise<CommandData> => {
  //   try {
  //     const response = await axios.get<CommandData>(`https://perfect-teal-beetle.cyclic.cloud/command/${table}`);
  //     return response.data;
  //   } catch (error) {
  //     console.error(error);
  //     throw error;
  //   }
  // };
  //console.log("This is the command of the table 1", getCommandByTable(1));

  const getCommandByTable = async (table: number, fieldName?: string) => {
    try {
      const response = await axios.get(`https://perfect-teal-beetle.cyclic.cloud/command/${table}`);
      if (response.status === 200) {
        const item = response.data;
        if (fieldName) {
          const fieldValue = item[fieldName];
          return fieldValue;
        } else {
          return item;
        }
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  const [numeroMesa, setNumeroMesa] = useState(0);

  //Como llamar la funcion ns si te sirve Nacho :）


  // Queries
  const {
    data: allMenu,
    isLoading: isMenuLoading,
    isError: isMenuError
  } = useQuery({ queryKey: ['menu'], queryFn: getAllMenus })

  const {
    data: Command,
    isLoading: isCommandLoading,
    isError: isCommandError,
  } = useQuery({ queryKey: ['command'], queryFn: getAllCommand })

  const separateMenuItemsByCategory = (menuItems: MenuTypes[]): MenuTypes[][] => {
    let platoEntrada: MenuTypes[] = [];
    let platoPrincipal: MenuTypes[] = [];
    let platoPostre: MenuTypes[] = [];

    //console.log(menuItems);

    const entradas = menuItems.filter((item) => item.category === "entrada");
    const principales = menuItems.filter((item) => item.category === "plato principal");
    const postres = menuItems.filter((item) => item.category === "postre");

    return [entradas, principales, postres];
  };

  const [combinedArray, setCombinedArray] = useState<MenuTypes[][]>();

  useEffect(() => {
    if (allMenu)
      setCombinedArray(separateMenuItemsByCategory(allMenu));
  }, [allMenu]);


  const MaxLength = (description: string, MaxCharcters: number): string => {
    if (description.length <= MaxCharcters) {
      return description;
    }
    let descrptionShort = description.substring(0, MaxCharcters);
    const LastSpace = descrptionShort.lastIndexOf(" ");

    if (LastSpace !== -1) {
      descrptionShort = descrptionShort.substring(0, LastSpace);
    } else {
      return descrptionShort;
    }

    return descrptionShort + " ...";
  };

  const [showPopUP, setShowPopUP] = useState(false);
  const [comanda, setComanda] = useState(false);
  const [showMenu, setShowMenu] = useState(true);
  const [showPedido, setShowPedido] = useState(false);
  const [showFotterMenu, setShowFotterMenu] = useState(false);
  const [a, seta] = useState(true);
  const [showRegistro, setshowRegistro] = useState(true);
  const [keyPlato, setKeyPlato] = useState(0);
  const [arrayUsed, setarrayUsed] = useState(0);
  const [nombre, setNombre] = useState('');
  const [nombreError, setNombreError] = useState('');
  const [numeroMesaError, setNumeroMesaError] = useState('');


  const handleclick = (key: number, estado: boolean, array: number) => {
    setShowPopUP(estado);
    setShowMenu(!estado)
    setKeyPlato(key);
    setarrayUsed(array);
  };

  const handleClickArrowBack = (pedido: boolean, Menu: boolean) => {
    setShowPedido(pedido);
    setShowMenu(Menu);

  }

  const handleClickRegistro = () => {
    console.log(numeroMesa)
    if (nombre === '') {
      setNombreError('El nombre es obligatorio');
    } else {
      setNombreError('');
    }

    if (numeroMesa === 0 || Number.isNaN(numeroMesa)) {
      setNumeroMesaError('El número de mesa es obligatorio');
    } else {
      setNumeroMesaError('');
    }
    if (numeroMesa < 0) {
      setNumeroMesaError('Numero invalido');
    } 

    if (nombre !== '' && !Number.isNaN(numeroMesa) && numeroMesa !== 0 && numeroMesa>0) {
      // Data is valid; you can proceed with whatever you need to do
      console.log('Nombre:', nombre);
      console.log('Numero de mesa:', numeroMesa);
      setShowMenu(true);
      setshowRegistro(false);
      getCommandByTable(numeroMesa, "total")
        .then(data => {
          if (data !== null) {
            console.log(`Field Value: $${data}`);
            setShowFotterMenu(true);
          }
        })
        .catch(error => {
          console.error(error);
          seta(false)
        });
    }
  }
  if (a == false) {
    getCommandByTable(numeroMesa, "total")
      .then(data => {
        if (data !== null) {
          console.log(`Field Value: $${data}`);
          setShowFotterMenu(true);
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  return (
    <main className="">
      <div className="h-screen w-screen pb-[7px] bg-background overflow-x-hidden no-scrollbar" id="general">
        {/* {isMenuLoading && <h1 className="animate-spin text-black">Loading</h1>}
        {isMenuError && <h1 className="text-RojoPedido animate-bounce">Error</h1>} */}
        {showRegistro ? (
          <div className="grid w-full h-full absolute z-40 backdrop-blur-sm backdrop-brightness-90 justify-center content-center ">
            <div className=" bg-white rounded-lg m-10 px-9 grid justify-center ">
              <h4 className="text-black mt-8 mb-7">Ingresar los siguientes datos para ser atendido:</h4>
              <input type="text" className="w-full pl-2 h-10 border-BorderRegister rounded-lg border-2 bg-input text-black outline-none" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
              {nombreError && <div className="text-RojoPedido ml-1 ">{nombreError}</div>}
              <input type="number" className="w-full pl-2 h-10 mt-4 border-BorderRegister rounded-lg border-2 bg-input text-black outline-none placeholder:" placeholder="Número de mesa" onChange={(e) => setNumeroMesa(e.target.valueAsNumber)} />
              {numeroMesaError && <div className="text-RojoPedido ml-1">{numeroMesaError}</div>}
              <button className="bg-btngreen rounded-2xl right-0 mt-10 h-[38px] w-full mb-11" onClick={handleClickRegistro}>Enviar</button>
            </div>
          </div>
        ) : (<></>)}
        {showPopUP && !isMenuLoading && !isMenuError &&
          <PopUp
            combinedArray={combinedArray!}
            arrayUsed={arrayUsed}
            keyPlato={keyPlato}
            pedido={pedido}
            setShowPopUP={setShowPopUP}
            setShowMenu={setShowMenu}
            setPedido={setPedido}
          ></PopUp>
        }
        {!isMenuLoading && !isMenuError && combinedArray && showMenu ? (
          <>
            <HeaderMenu />
            <ScrollBar />

            <h3 className="text-black text mt-4 ml-4" id="entradas">
              Entradas
            </h3>
            <div className="grid grid-cols-2 gap-x-2 justify-center m-auto w-[360px]" id="div1">
              {combinedArray[0].map((comida, key) => (
                <div
                  onClick={(event) => handleclick(key, true, 0)}
                  className="container m-2 h-fit content-center"
                  key={key}
                >
                  <div className="h-[105px] w-[150px] mx-2 mt-1 overflow-hidden grid content-center">
                    <img
                      src={comida.image}
                      alt=""
                      className="rounded-lg min-h-full min-w-full"
                    >
                    </img>
                  </div>
                  <div className="pl-3 max-w-[160px] ">
                    <h5 className=" text-black leading-snug overflow-hidden">
                      {comida.name}
                    </h5>
                    <p className="text-populetter leading-snug pb-2 max-h- overflow-hidden text-ellipsis">
                      {MaxLength(comida.description, 35)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <h3 className="text-black text mt-4 ml-4" id="principales" >
              Platos principales
            </h3>

            <div className="grid grid-cols-2 gap-x-2 justify-center m-auto w-[360px]">
              {combinedArray[1].map((comida, key) => (
                <div
                  onClick={(event) => handleclick(key, true, 1)}
                  className="container m-2 h-fit content-center"
                  key={key}
                >
                  <div className="h-[105px] w-[150px] mx-2 mt-1 overflow-hidden grid content-center">
                    <img
                      src={comida.image}
                      alt=""
                      className="rounded-lg min-h-full min-w-full"
                    />
                  </div>
                  <div className="pl-3 max-w-[160px] ">
                    <h5 className=" text-black leading-snug overflow-hidden">
                      {comida.name}
                    </h5>
                    <p className="text-populetter leading-snug pb-2 max-h- overflow-hidden text-ellipsis">
                      {MaxLength(comida.description, 35)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <h3 className="text-black text mt-4 ml-4" id="postres">
              Postres
            </h3>
            <div className="grid grid-cols-2 gap-x-2 justify-center m-auto w-[360px]">
              {combinedArray[2].map((comida, key) => (
                <div
                  onClick={(event) => handleclick(key, true, 2)}
                  className="container m-2 h-fit content-center pb-28"
                  key={key}
                >
                  <div className="h-[105px] w-[150px] mx-2 mt-1 overflow-hidden grid content-center">
                    <img
                      src={comida.image}
                      alt=""
                      className="rounded-lg min-h-full min-w-full"
                    />
                  </div>
                  <div className="pl-3 max-w-[160px] ">
                    <h5 className=" text-black leading-snug overflow-hidden">
                      {comida.name}
                    </h5>
                    <p className="text-populetter leading-snug pb-2 max-h- overflow-hidden text-ellipsis">
                      {MaxLength(comida.description, 35)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {showFotterMenu ? (<FooterMenu setShowPedido={setShowPedido} setShowMenu={setShowMenu} setShowPedidoEnviado={setShowMenu} EstadoPedidoEnviado={false} EstadoPedido={true} EstadoMenu={false} txtBoton="Ver Pedido" />) : (<></>)}
          </>
        ) : (<></>)}
        {showPedido ? (
          <>
            <ContenidoPedido setShowMenu={setShowMenu} setShowPedido={setShowPedido} />
          </>
        ) : (<></>)}
      </div>
    </main >
  );
}