import { getTotalInStock } from "@/app/_data-acess/dashboard/get-total-in-stock";
import { PackageIcon } from "lucide-react";
import SummaryCard, { SummaryCardIcon, SummaryCardTitle, SummaryCardValue } from "./summary-card";

const TotalInStockCard = async () => {

    const totalStock = await getTotalInStock()

    return (
        <SummaryCard>
            <SummaryCardIcon>
                <PackageIcon />
            </SummaryCardIcon>

            <SummaryCardTitle>Total em Estoque</SummaryCardTitle>
            <SummaryCardValue>{totalStock}</SummaryCardValue>
        </SummaryCard>
    );
}

export default TotalInStockCard;