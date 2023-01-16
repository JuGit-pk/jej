import Link from "next/link";
import { Col, Container, Row } from "reactstrap";

const MasterBanner = ({ img, title, desc, link, classes, btn, btnClass }) => {
  return (
    <div>
      <div
        className={`home ${classes ? classes : "p-right text-center"}`}
        style={{
          backgroundImage: `url(${img})`,
          backgroundSize: "cover",
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Container>
          <Row>
            <Col>
              <div className="slider-contain">
                <div
                  style={{
                    position: "absolute",
                    top: "65%",
                    left: "9%",
                  }}
                >
                  {title && <h4>{title}</h4>}
                  {desc && <h1>{desc}</h1>}
                  <Link href={link}>
                    <a className={`btn ${btnClass ? btnClass : "btn-solid"}`}>
                      {btn ? btn : "Shop Now"}{" "}
                    </a>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default MasterBanner;
