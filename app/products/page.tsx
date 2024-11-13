import { DataTable } from "../_components/ui/data-table";
import { productsTableColumns } from "./_components/table-columns";
import { getProducts } from "../_data-acess/product/get-products";
import CreateProductButton from "./_components/create-products-button";
import Header, { HeaderLeft, HeaderRight, HeaderSubtitle, HeaderTitle } from "../_components/header";

const ProductsPage = async () => {

    const products = await getProducts()

    return (
        <div className="w-full rounded-lg mx-8 mt-8 space-y-8 p-8 bg-white">
            <Header>
                <HeaderLeft>
                    <HeaderSubtitle>Gestão de Produtos</HeaderSubtitle>
                    <HeaderTitle>Produtos</HeaderTitle>
                </HeaderLeft>

                <HeaderRight>
                    <CreateProductButton />
                </HeaderRight>
            </Header>

            <DataTable columns={productsTableColumns} data={JSON.parse(JSON.stringify(products))} />
        </div>
    );
}

export default ProductsPage;