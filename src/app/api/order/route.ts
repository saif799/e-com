// import { orderToGoogleSheet } from "@/actions/orderToGoogleSheet";
// import Order from "@/lib/models/Order";
// import { connectToDB } from "@/lib/mongoDB";
import { CartOrderType } from "@/lib/types";
import { NextResponse } from "next/server";


export async function POST(req: Request) {


    try {
        // await connectToDB()

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const data :CartOrderType= await req.json()
        
        // const order = await Order.create(
        //     data
        // );

        // await orderToGoogleSheet(order)

        // return NextResponse.json(order);

    } catch (error) {
        console.log('[ADD ORDERS]', error);
        return new NextResponse('error creating order', { status: 500 });
    }
}