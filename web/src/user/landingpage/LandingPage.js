import React from 'react';
import { Container, Row, Col, Button} from 'reactstrap';
import BodyClassName from 'react-body-classname';

const LandingPage = (props) => {
    return (
      <BodyClassName className="-landingpage">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <h1 className="mb-3">RWB Eagle Leader Training</h1>
              <section className="mb-3">
                {props.loading ? <p>Fetching user data... <br /><img src="../assets/icon-loading.svg"/></p> : <Button size="sm" color="primary" onClick={props.onClick}>Sign in with RWB</Button>}
              </section>
              <p>If you are a serious astronomy fanatic like a lot of us are, you can probably remember that one event in childhood that started…</p>
            </Col>
          </Row>
        </Container>
      </BodyClassName>
    );
}


export default LandingPage;
