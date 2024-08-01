import { api } from "@/lib/axios";

interface ApproveOrderParams {
  orderId: string;
}

export async function approveOrder({ orderId }: ApproveOrderParams) {
  const response = await api.patch(`/orders/${orderId}/approve`);

  return response.data;
}
