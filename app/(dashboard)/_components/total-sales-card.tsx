import { CircleDollarSign } from "lucide-react";
import SummaryCard, { SummaryCardIcon, SummaryCardTitle, SummaryCardValue } from "./summary-card";
import { getTotalSales } from "@/app/_data-acess/dashboard/get-total-sales";

const TotalSalesCard = async () => {
  await new Promise((resolve) => setTimeout(resolve, 5000));

    const totalSales = await getTotalSales()

    return (
        <SummaryCard>
          <SummaryCardIcon>
            <CircleDollarSign />
          </SummaryCardIcon>

          <SummaryCardTitle>Vendas Totais</SummaryCardTitle>
          <SummaryCardValue>{totalSales}</SummaryCardValue>
        </SummaryCard>
    );
}

export default TotalSalesCard;