import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { db } from "@/server/db";
import { usersTable } from "@/server/db/schema";

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local",
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  // Do something with the payload
  // For this guide, you simply log the payload to the console
  const eventType = evt.type;
  if (eventType === "user.created") {
    const { id, first_name, email_addresses, last_name, phone_numbers } =
      evt.data;
    const phoneNumber = phone_numbers[0]?.phone_number;

    if (!id || !email_addresses) {
      return new Response("Error occurred -- missing data", { status: 400 });
    }

    
    type userTYpe = typeof usersTable.$inferInsert
    const user:userTYpe = {
      externalId: id,
      firstName:first_name??"",
      lastName:last_name,
      phoneNumber: phoneNumber ?? '',
      email: email_addresses[0]?.email_address ?? '',
      id:crypto.randomUUID()
    };
    try {
   const [use] =await db.insert(usersTable).values(user).returning();
      console.log("user added succusfully ",use);
      
    } catch (err) {
      console.log(err)
    }
  }

  
  return new Response("", { status: 200 });
}
