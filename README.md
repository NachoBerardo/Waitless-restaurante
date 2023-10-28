# Waitless
Repositorio de Proyecto final 5to año

JS
import { useQuery, QueryClient } from '@tanstack/react-query'
//import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
//const myModule = require( '@tanstack/react-query').useQuery;
import { getFoodWithPrisma, getAllFoodWithPrisma, createFoodWithPrisma, updateFoodWithPrisma, deleteFoodWithPrisma, getAllOrdersWithPrisma, createOrderWithPrisma } from '../index.js'
//, getOrderWithPrisma, createOrderWithPrisma, updateOrderWithPrisma, deleteOrderWithPrisma s
/*
const getFood = require('../index.js').getFoodWithPrisma;
const getAllFood = require('../index.js').getAllFoodWithPrisma;
const createFood = require('../index.js').createFoodWithPrisma;
const updateFood = require('../index.js').updateFoodWithPrisma;
const deleteFood = require('../index.js').deleteFoodWithPrisma;
*/

const queryClient = new QueryClient();
export function llamarTodoMenu() {
    // Access the client
    //Main poner un <QueryClientProvider client={queryClient}>
    const queryClient = useQueryClient()
    // Queries
    const allMenu = useQuery({ queryKey: ['todoMenu'], queryFn: getAllFoodWithPrisma })
}
export function llamarComida() {
    // Access the client
    const queryClient = useQueryClient()
    // Queries
    const menuFood = useQuery({ queryKey: ['menuComida'], queryFn: getFoodWithPrisma })
}
export function crearComida() {
    // Access the client
    const queryClient = useQueryClient()
    // Queries
    const nuevoPedido = useQuery({ queryKey: ['creadoComida'], queryFn: createFoodWithPrisma })
}
export function borrarComida() {
    // Access the client
    const queryClient = useQueryClient()
    // Queries
    const noPedido = useQuery({ queryKey: ['borradoComida'], queryFn: deleteFoodWithPrisma })
}
export function actualizarComida() {
    // Access the client
    const queryClient = useQueryClient()
    // Queries
    const cambioComida = useQuery({ queryKey: ['actualizadoComida'], queryFn: updateFoodWithPrisma })
}
export function crearPedido() {
  // Access the client
  const queryClient = useQueryClient()
  // Queries
  const nuevoPedido = useQuery({ queryKey: ['creadoOrder'], queryFn: createOrderWithPrisma })
}

//PEDIDOS
export function llamarTodoPedidos() {
    const queryClient = useQueryClient()
    const allOrder = useQuery({ queryKey: ['todoPedidos'], queryFn: getAllOrdersWithPrisma })
}
/*export function llamarPedido() {
  // Access the client
  const queryClient = useQueryClient()
  // Queries
  const menuFood = useQuery({ queryKey: ['menuComida'], queryFn: getFoodWithPrisma })
}
export function crearComida() {
  // Access the client
  const queryClient = useQueryClient()
  // Queries
  const nuevoPedido = useQuery({ queryKey: ['creadoComida'], queryFn: createFoodWithPrisma })
}
export function borrarComida() {
  // Access the client
  const queryClient = useQueryClient()
  // Queries
  const noPedido = useQuery({ queryKey: ['borradoComida'], queryFn: deleteFoodWithPrisma })
}
export function actualizarComida() {
  // Access the client
  const queryClient = useQueryClient()
  // Queries
  const cambioComida = useQuery({ queryKey: ['actualizadoComida'], queryFn: updateFoodWithPrisma })
}*/


/*
    return(
      <div>
        <ul>
          {allMenu.data?.map((todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
          {menuFood.data?.map((todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
          {nuevoPedido.data?.map((todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
          {noPedido.data?.map((todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
          {cambioComida.data?.map((todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
        </div>
  )

  {menuFood.data?.map((todo) => (
              <li key={todo.idFood}>{todo.name}</li>
            ))}
            {nuevoPedido.data?(todo) => (
              <li key={todo.idFood}>{todo.name}</li>
            ))}
            {noPedido.data?.map((todo) => (
              <li key={todo.idFood}>{todo.name}</li>
            ))}
            {cambioComida.data?.map((todo) => (
              <li key={todo.idFood}>{todo.name}</li>
            ))}
  */
