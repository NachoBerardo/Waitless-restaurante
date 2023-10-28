//const mysql = require('../mysql2');
import dotenv from 'dotenv'
import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();
//dotenv  = require ('../dotenv');
dotenv.config()

// COMIDA DEL MENU
export const getAllFoodWithPrisma = async (req, res) => {
    try {
        const getFood = await prisma.food.findMany()

        if (!getFood) return console.log("not food found")

        return res.json({ message: "Food found", data: getFood })
    } catch (error) {
        console.log(error)
    }
}

export const getFoodWithPrisma = async (id) => {
    try {
        const getFood = await prisma.food.findUnique({
            where: {
                id: id
            }
        })

        if (!getFood) return console.log("not food found")

        return getFood
    } catch (error) {
        console.log(error)
    }
}

export const createFoodWithPrisma = async (name, description, category, price, image, sideDish) => {
    try {
        const createFood = await prisma.pedido.create({
            data: {
                name: name,
                description: description,
                category: category,
                price: price,
                image: image,
                sideDish: sideDish
            }
        })

        if (!createFood) return console.log("not food found")

        return createFood
    } catch (error) {
        console.log(error)
    }
}

export const addFoodToOrder = async (orderId, foodId, customerId, amount) => {
    try {
        const newFood = await prisma.orderFoodbyCustumer.create({
            data: {
                quantity: amount,
                order: {
                    connect: {
                        id: orderId
                    }
                },
                food: {
                    connect: {
                        id: foodId
                    }
                },
                customer: {
                    connect: {
                        id: customerId
                    }
                }
            }
        });

        return newFood
    } catch (error) {
        console.log(error)
    }
}

export const updateFoodWithPrisma = async (name, description, category, price, image, sideDish, id) => {
    try {
        const updateFood = await prisma.food.update({
            where: {
                id: id
            },
            data: {
                name: name,
                description: description,
                category: category,
                price: price,
                image: image,
                sideDish: sideDish
            }
        })

        if (!updateFood) return console.log("not food found")

        return updateFood
    } catch (error) {
        console.log(error)
    }
}

export const deleteFoodWithPrisma = async (name, description, category, price, image, sideDish, id) => {
    try {
        const deleteFood = await prisma.food.delete({
            where: {
                id: id
            },
            data: {
                name: name,
                description: description,
                category: category,
                price: price,
                image: image,
                sideDish: sideDish
            }
        })

        if (!deleteFood) return console.log("not food found")

        return deleteFood
    } catch (error) {
        console.log(error)
    }
}

//ORDENES-PEDIDOS

export const getAllOrderWithPrisma = async (req, res) => {
    try {
        const getOrder = await prisma.order.findMany()

        if (!getOrder) return console.log("order not found")

        return res.json({ message: "Order found", data: getOrder })
    } catch (error) {
        console.log(error)
    }
}
export const getOrderByPrismaID = async (id) => {
    try {
        const getOrder = await prisma.order.findUnique({
            where: {
                id: id
            }
        })

        if (!getOrder) return console.log("not Order found")

        return getOrder
    } catch (error) {
        console.log(error)
    }
}

export const createOrderWithPrisma = async (aclaration, sendedAt) => {
    try {
        const createOrder = await prisma.order.create({
            data: {
                id: id,
                aclaration: aclaration,
                sendedAt: sendedAt
            }
        })

        if (!createOrder) return console.log("not food found")

        return createOrder
    } catch (error) {
        console.log(error)
    }
}

export const updateOrderWithPrisma = async (name, description, category, price, image, sideDish, id) => {
    try {
        const updateOrder = await prisma.order.update({
            where: {
                id: id
            },
            data: {
                name: name,
                description: description,
                category: category,
                price: price,
                image: image,
                sideDish: sideDish
            }
        })

        if (!updateOrder) return console.log("not food found")

        return updateOrder
    } catch (error) {
        console.log(error)
    }
}

export const deleteOrderWithPrisma = async (aclaration, sendedAt, id) => {
    try {
        const deleteOrder = await prisma.order.delete({
            where: {
                id: id
            },
            data: {
                aclaration: aclaration,
                sendedAt: sendedAt
            }
        })

        if (!deleteOrder) return console.log("not food found")

        return deleteOrder
    } catch (error) {
        console.log(error)
    }
}

// CUSTOMERS

export const getCustomerithPrisma = async (id) => {
    try {
        const getCustomer = await prisma.customer.findUnique({
            where: {
                id: id
            }
        })

        if (!getCustomer) return console.log("not food found")

        return getFood
    } catch (error) {
        console.log(error)
    }
}

export const createCustomerWithPrisma = async (id, name) => {
    try {
        const createCustomer = await prisma.customer.create({
            data: {
                id: id,
                name: name
            }
        })

        if (!createCustomer) return console.log("not food found")

        return createCustomer
    } catch (error) {
        console.log(error)
    }
}

export const deleteCustomerWithPrisma = async (name, id) => {
    try {
        const deleteCustomer = await prisma.customer.delete({
            where: {
                id: id
            },
            data: {
                name: name,
            }
        })

        if (!deleteCustomer) return console.log("not food found")

        return deleteCustomer
    } catch (error) {
        console.log(error)
    }
}