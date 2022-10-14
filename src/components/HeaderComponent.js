import { Container, Row } from 'react-bootstrap';

function HeaderComponent() {
    return (
        <header class="bg-dark py-5">
            <Row className="px-4 px-lg-5 my-5">
                <Row className="text-center text-white">
                    <h1 class="display-4 fw-bolder">Header</h1>
                    <p class="lead fw-normal text-white-50 mb-0">With this header hompeage template</p>
                </Row>
            </Row>
        </header>
    )

}

export default HeaderComponent;