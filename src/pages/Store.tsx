import { Col, Form, FormGroup, Row } from 'react-bootstrap';
import StoreProduct from '../components/StoreProduct';
import products from '../data/products.json'
import 'bootstrap/dist/css/bootstrap.min.css'
import { BsSearch } from 'react-icons/bs'
import { useState } from 'react';

const Store = () => {

    const [search, setsearch] = useState('');
    const [searchResults, setsearchResults] = useState<{ id: number, name: string, price: number, imgUrl: string }[] | undefined>()

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter') {
            setsearch(e.target.value)
            const lowerCaseSearch = search.toLowerCase()
            const query = products && products?.length > 0 && search.length > 0 ?
                products?.filter(product => product.name.toLowerCase().includes(lowerCaseSearch)) : undefined
            setsearchResults(query)
        }
    }

    const handleClickSearch = () => {
        const lowerCaseSearch = search.toLowerCase()
        const query = products && products?.length > 0 && search.length > 0 ?
            products?.filter(product => product.name.toLowerCase().includes(lowerCaseSearch)) : undefined
        setsearchResults(query)
        console.log(searchResults)
    }

    return (
        <>
            <Form className='mb-6 mt-4 d-flex' onSubmit={(e) => e.preventDefault()}>
                <FormGroup className='px-2 py-1 rounded col-md-5 w-70 mx-auto d-flex align-items-center justify-content-between bg-light' style={{ borderColor: 'white' }}>
                    <Form.Control
                        className='w-75 col-md-6 form-control-lg bg-transparent border border-0 '
                        type='search'
                        placeholder='Digite aqui o que procura'
                        onChange={(e) => setsearch(e.target.value)}
                        onKeyUp={handleSearch}
                        value={search}
                    >
                    </Form.Control>
                    <BsSearch fill='#084bae' style={{ width: '30px', height: '30px', }} onClick={handleClickSearch} />

                </FormGroup>

            </Form>

            {searchResults && searchResults.length > 0 && searchResults !== undefined &&
                <h2 className='text-center mt-3 text-white'>Resultados de busca</h2>
            }

            {searchResults && searchResults.length <= 0 &&
                <h2 className='text-center mt-4 mb-5 text-white'>
                    Não foram encontrados resultados de busca para: {search}
                </h2>
            }

            <Row m2={1} xs={1} lg={4} className='g-3 mt-2'>
                {searchResults && searchResults.length > 0 && searchResults?.map(result => (
                    <Col key={result.id}>
                        <StoreProduct key={result.id} {...result} />
                    </Col>
                ))}

            </Row>

            {searchResults && searchResults.length > 0 &&
                <hr className='text-white' />
            }
            <h1 className='text-center mt-4 text-light'>Produtos em estoque</h1>
            <Row m2={1} xs={1} lg={4} className='g-3 mt-2'>
                {products.map(product => (
                    <Col key={product.id}>
                        <StoreProduct {...product} />
                    </Col>
                ))}

            </Row>

        </>

    );
}

export default Store;
