import { useEffect, useState } from "react";
import { useApi } from "../../context/ApiProvider/useApi";
import { ApiProduct } from "../../context/ApiProvider/types";
import './style.css'

const ProductPhoto = ({ product }: { product: ApiProduct }) => {

    const api = useApi();
    const [image, setImage] = useState<string>("");
    const [alt, setAlt] = useState<string>("");

    useEffect(() => {

        const getImage = async (id: number) => {

            const _call = async (id: number) => {
                try {
                    let imageBlob = await api.RequestProductPhoto(id);
                    if (imageBlob.size > 0) {
                        let image = URL.createObjectURL(imageBlob);
                        setImage(image);
                        setAlt(product.nome);
                    } else {
                        setImage(image);
                        setAlt("Sem imagem");
                    }
                } catch (err: any) {
                    throw err;
                }
            }
            return _call(id);
        }

        getImage(product.id);

    }, []);


    return (
        <>
           <img src={image} alt={alt} className='product-image' />
        </>
    )
}

export default ProductPhoto;