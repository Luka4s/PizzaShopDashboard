export type OrderStatus =
  | "pending"
  | "canceled"
  | "processing"
  | "delivering"
  | "delivered";

interface OrderStatusProps {
  status: OrderStatus;
}
/* aqui passamos esse Record para sinalizar que essa const é um 
objeto que depende das informações de OrderStatus e que seus valores são strings */
const orderStatusMap: Record<OrderStatus, string> = {
  pending: "Pendente",
  canceled: "Cancelado",
  delivered: "Entregue",
  delivering: "Em entrega",
  processing: "Em preparo",
};

export function OrderStatus({ status }: OrderStatusProps) {
  return (
    <div className="flex items-center gap-2">
      {status === "pending" && (
        <span className="h-2 w-2 rounded-full bg-slate-400" />
      )}
      {status === "canceled" && (
        <span className="h-2 w-2 rounded-full bg-rose-500" />
      )}
      {status === "delivered" && (
        <span className="h-2 w-2 rounded-full bg-emerald-500" />
      )}
      {["processing", "delivering"].includes(status) && (
        <span className="h-2 w-2 rounded-full bg-amber-700" />
      )}
      <span className="font-medium text-muted-foreground">
        {orderStatusMap[status]}
      </span>
    </div>
  );
}
