import React from "react";
import { BillBoardClient } from "./components/client";
import prismadb from "@/lib/prismadb";
import { BillBoardColumn } from "./components/column";
import { format } from "date-fns";
import { formmater } from "@/lib/utils";

const Products = async ({ params }: { params: { storeId: string } }) => {
  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      category: true,
      size: true,
      color: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedProducts: BillBoardColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    isFeatured: item.isFeatured,
    isArchive: item.isArchive,
    price: formmater.format(item.price.toNumber()),
    category: item.category.name,
    size: item.size.name,
    color: item.color.name,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillBoardClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default Products;
