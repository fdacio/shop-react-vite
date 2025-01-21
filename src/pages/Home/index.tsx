import { useEffect, useRef } from 'react';
import ProductsGrid from '../../components/ProductsGrid';
import { ProductsGridSearch } from '../../components/ProductsGrid/types';
import RootLayout from '../layout';

const Home = () => {
    
    const refProductGrid = useRef<ProductsGridSearch>(null);

    useEffect(() => {
        console.log("ref product grid in home");
        console.log(refProductGrid);
    }, []);
    
    return (

        <RootLayout>
            <ProductsGrid ref={refProductGrid} />
        </RootLayout>

    )
}

export default Home;


