import React from "react";
import { SizeClient } from "./components/client";
import prismadb from "@/lib/prismadb";
import { ColorColumn } from "./components/column";
import { format } from "date-fns";

const Sizes = async ({ params }: { params: { storeId: string } }) => {
  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedColors: ColorColumn[] = colors.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeClient data={formattedColors} />
      </div>
    </div>
  );
};

export default Sizes;
