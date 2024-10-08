interface Params {
    id: string
}

const ProductsDetails = ({ params: { id } }: { params: Params }) => {
    return (
        <div>
            ProductsDetails {id}
        </div>
    );
}

export default ProductsDetails;