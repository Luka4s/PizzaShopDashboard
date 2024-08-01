import { api } from "@/lib/axios";

export interface GetOrdersDetailsParams {
  orderId: string;
}

export interface GetOrderDatailsResponse {
  id: string;
  createdAt: string;
  status: "pending" | "canceled" | "processing" | "delivering" | "delivered";
  totalInCents: number;
  customer: {
    name: string;
    email: string;
    phone: string | null;
  };
  orderItems: {
    id: string;
    priceInCents: number;
    quantity: number;
    product: {
      name: string;
    };
  }[];
}

export async function getOrderDetails({ orderId }: GetOrdersDetailsParams) {
  const response = await api.get<GetOrderDatailsResponse>(`/orders/${orderId}`);

  return response.data;
}
