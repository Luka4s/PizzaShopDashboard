import { api } from "@/lib/axios";

export interface GetMonthRevenueProps {
  receipt: number;
  diffFromLastMonth: number;
}

export async function getMonthRevenue() {
  const response = await api.get<GetMonthRevenueProps>(
    "/metrics/month-receipt"
  );
  return response.data;
}
