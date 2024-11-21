import { getTotalRevenue } from "@/app/_data-acess/dashboard/get-total-revenue";
import SummaryCard, { SummaryCardIcon, SummaryCardTitle, SummaryCardValue } from "./summary-card";
import { DollarSign } from "lucide-react";
import { formatCurrency } from "@/app/_helpers/currency";

const TotalRevenueCard = async () => {
    await new Promise((resolve) => setTimeout(resolve, 5000));

    const totalRevenue = await getTotalRevenue()

    return (
        <SummaryCard>
            <SummaryCardIcon>
                <DollarSign />
            </SummaryCardIcon>

            <SummaryCardTitle>Receita Total</SummaryCardTitle>
            <SummaryCardValue>{formatCurrency(totalRevenue)}</SummaryCardValue>
        </SummaryCard>
    );
}

export default TotalRevenueCard;