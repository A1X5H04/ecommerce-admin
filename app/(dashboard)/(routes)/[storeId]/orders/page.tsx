import prismadb from "@/lib/prismadb";
import { formatCurrency } from "@/lib/utils";
import { OrderColumn } from "./_components/columns";
import OrderClient from "./_components/client";

async function OrdersPage({ params }: { params: { storeId: string } }) {
  const orders = await prismadb.order.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const ordersFormatted: OrderColumn[] = orders.map((item) => ({
    id: item.id,
    phone: item.phone,
    address: item.address,
    isPaid: item.isPaid,
    product: item.orderItems
      .map((orderItem) => orderItem.product.name)
      .join(", "),
    total: formatCurrency(
      item.orderItems.reduce((acc, curr) => acc + Number(curr.product.price), 0)
    ),
    createdAt: new Date(item.createdAt).toLocaleDateString(),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6 ">
        <OrderClient data={ordersFormatted} />
      </div>
    </div>
  );
}

export default OrdersPage;
