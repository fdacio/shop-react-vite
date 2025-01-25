import { useEffect, useState } from "react";
import { useApi } from "../../context/ApiProvider/useApi";
import './style.css'
import NoImgage from '../../assets/no-image.jpeg';
import { ApiProduct } from "../../context/ApiProvider/Product/types";

const ProductPhoto = ({ product }: { product: ApiProduct }) => {

    const api = useApi();
    const [image, setImage] = useState<string>("");
    const [alt, setAlt] = useState<string>("");

    useEffect(() => {

        const getImage = async (id: number) => {

            const _call = async (id: number) => {
                try {
                    let imageBlob = await api.ApiProductContextData.RequestProductPhoto(id);
                    if (imageBlob.size > 0) {
                        let image = URL.createObjectURL(imageBlob);
                        setImage(image);
                        setAlt(product.nome);
                    } else {
                        setImage(NoImgage);
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