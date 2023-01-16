import React from "react";
import { Container, Row, Col } from "reactstrap";
import Link from "next/link";

const Breadcrumbs = ({ title, subTitle }) => {
  return (
    <div className="breadcrumb-section">
      <Container>
        <Row>
          {title && (
            <Col>
              <nav aria-label="breadcrumb" className="theme-breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link href={`/${title.slug}`}>
                      <a>{title.name}</a>
                    </Link>
                  </li>
                  {subTitle && subTitle.name && subTitle.slug ? (
                    <li className="breadcrumb-item active" aria-current="page">
                      {subTitle.name}
                    </li>
                  ) : (
                    ""
                  )}
                </ol>
              </nav>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default Breadcrumbs;
