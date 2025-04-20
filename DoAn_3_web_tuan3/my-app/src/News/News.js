import React from 'react';
import { Container } from 'react-bootstrap';

function NewsPage() {
  return(
    <Container>
      <div className='border-bottom border-3 border-dark mt-3'></div>
      <img className="d-block w-100" src="/picture/AboutUs1.png" alt="First slide" />
      <img className="d-block w-100" src="/picture/AboutUs2.png" alt="First slide" />
      <img className="d-block w-100" src="/picture/AboutUs3.png" alt="First slide" />
      <img className="d-block w-100" src="/picture/AboutUs4.png" alt="First slide" />
      <img className="d-block w-100" src="/picture/AboutUs5.png" alt="First slide" />
      <img className="d-block w-100" src="/picture/AboutUs6.png" alt="First slide" />
    </Container>
  )
}

export default NewsPage;
