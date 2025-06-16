import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const facebookPosts = [
  'https://www.facebook.com/DirtyCoins.VN/posts/pfbid02XJjn6URR497XVA46zwAnEzFbGgCLbR47Jk3oUV5DJPiYmUhLfchfSvkghby5aSCKl',
  'https://www.facebook.com/DirtyCoins.VN/posts/pfbid0ozLjDLGmqnQEGgeL2i5hTEoGMyLzLu4QoHhoSeTZx86nyziYdDaCpSkSgqaQzXzml',
  'https://www.facebook.com/DirtyCoins.VN/posts/pfbid0neFnWRdv4MZv7V6cJnb3gm79hmH3xX5Bc4iNCsfGkgBFRraVoiwUXeuWGzJ9hYsLl',
  'https://www.facebook.com/DirtyCoins.VN/posts/pfbid027auhXGGfTLXbPxY33Gh4DwEhLbmXA3CxkpVX6JYf1qYQizo8x7vger5y99dDPHWUl',
  'https://www.facebook.com/DirtyCoins.VN/posts/pfbid02AkP8dkE37hHq1S6mfzFpZc4oP8kG9daRxFPbpzaU9HmUzg6qE62v7Xd9eVrZwDDhl',
  'https://www.facebook.com/DirtyCoins.VN/posts/pfbid02vn9ihhJpGgFshbFm79m4GUQsQKqgS4haUX2nN1ELmHnHga2fo2oNnE9cE96w8yQfl',
];

function NewsPage() {
  // Tách các bài viết thành từng hàng có 2 cột
  const rows = [];
  for (let i = 0; i < facebookPosts.length; i += 2) {
    rows.push(facebookPosts.slice(i, i + 2));
  }

  return (
    <Container className="mt-3">
      <div className="border-bottom border-3 border-dark mb-4"></div>

      {rows.map((pair, rowIndex) => (
        <Row key={rowIndex} className="mb-4">
          {pair.map((postUrl, colIndex) => {
            const encodedUrl = encodeURIComponent(postUrl);
            return (
              <Col key={colIndex} md={6} className="d-flex justify-content-center">
                <iframe
                  title={`Facebook Post ${rowIndex * 2 + colIndex + 1}`}
                  src={`https://www.facebook.com/plugins/post.php?href=${encodedUrl}&show_text=true&width=500`}
                  width="100%"
                  height="650"
                  style={{ border: 'none', overflow: 'hidden', maxWidth: '500px' }}
                  scrolling="no"
                  frameBorder="0"
                  allowFullScreen={true}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                ></iframe>
              </Col>
            );
          })}
        </Row>
      ))}
    </Container>
  );
}

export default NewsPage;
