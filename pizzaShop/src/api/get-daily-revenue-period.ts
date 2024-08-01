import { api } from "@/lib/axios";

export interface GetDailyRevenueInPeriodQuery {
  from?: Date;
  to?: Date;
}

export type GetDailyRevenuePeriodResponse = {
  date: string;
  receipt: number;
}[];

export async function getDailyRevenuePeriod({
  from,
  to,
}: GetDailyRevenueInPeriodQuery) {
  const response = await api.get<GetDailyRevenuePeriodResponse>(
    "/metrics/daily-receipt-in-period",
    {
      params: {
        from,
        to,
      },
    }
  );

  return response.data;
}
