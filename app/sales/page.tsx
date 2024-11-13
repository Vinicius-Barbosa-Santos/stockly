import Header, { HeaderLeft, HeaderRight, HeaderSubtitle, HeaderTitle } from "../_components/header";
import { ComboboxOption } from "../_components/ui/combobox";
import { DataTable } from "../_components/ui/data-table";
import { getProducts } from "../_data-acess/product/get-products";
import { getSales } from "../_data-acess/sale/get-sales";
import UpsertSaleButton from "./_components/create-sale-button";
import { saleTableColumns } from "./_components/table-columns";

const SalesPage = async () => {
    const sales = await getSales()
    const products = await getProducts()
    const productOptions: ComboboxOption[] = products.map(product => ({
        label: product.name,
        value: product.id,
    }))

    const tableData = sales.map(sale => ({
        ...sale,
        products,
        productOptions,

    }))

    return (
        <div className="w-full rounded-lg mx-8 mt-8 space-y-8 p-8 bg-white">
            <Header>
                <HeaderLeft>
                    <HeaderSubtitle>Gestão de Venda</HeaderSubtitle>
                    <HeaderTitle>Vendas</HeaderTitle>
                </HeaderLeft>

                <HeaderRight>
                    <UpsertSaleButton products={products} productOptions={productOptions} />
                </HeaderRight>
            </Header>

            <DataTable columns={saleTableColumns} data={tableData} />
        </div>
    );
}

export default SalesPage;