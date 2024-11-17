import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Login = () =>{
    return (
        // <Container>
        //     <Row>
        //         <Col sm={8} md={8} lg={8} xl={8} xxl={8}>sm=8</Col>
        //         <Col sm={4} md={4} lg={4} xl={4} xxl={4}>sm=8</Col>
        //     </Row>
        // </Container>
        <div className='container'>
            <div className='row'>
                <div className='col-8'>col-8</div>
                <div className='col-4'>col-8</div>
            </div>
        </div>
    )
}

export default Login;