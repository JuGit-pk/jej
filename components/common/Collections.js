import React from "react";
import { Container, Col } from "reactstrap";
import { GET_CATEGORY_THUMBNAILS } from "../../gql/queries";
import { useQuery } from "../../hooks";
import Link from "next/link";
import Image from "next/image";
import { nextLoader } from "../../helpers/next-image-loader";

const MasterCollections = ({ img, title, desc, link, classes }) => {
  return (
    <Col lg="2" md="6" sm="6" xs="6">
      <Link href={link}>
        <a>
          <div>
            <div className="img-part">
              <div>
                <Image
                  loader={nextLoader}
                  src={img}
                  width={300}
                  height={300}
                  className=" blur-up lazyload bg-img"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              </div>
              {/* <Media
                src={img}
                className=" blur-up lazyload bg-img"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              /> */}
            </div>
            <div className="contain-banner banner-4">
              <div>
                {title && <h4>{title}</h4>}
                {desc && <h2 className="text-dark">{desc}</h2>}
              </div>
            </div>
          </div>
        </a>
      </Link>
    </Col>
  );
};

const Collections = () => {
  const { data, loading, error } = useQuery(
    "homepage-category-thumbnails",
    GET_CATEGORY_THUMBNAILS
  );
  const categories = data?.categories?.data;
  console.log({ categories });
  return (
    <section className="banner-padding banner-furniture ratio2_1">
      <Container
        fluid
        style={{
          display: "flex",
          // justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          height: "100%",
          overflow: "auto",
          gap: "20px",
        }}
      >
        {categories &&
          categories.map(({ attributes }, i) => {
            return (
              <MasterCollections
                key={i}
                img={`${attributes.thumbnail.data.attributes.url}`}
                link={attributes.slug}
                // title={attributes.name}
                // desc={data.desc}
                // classes={data.classes}
              />
            );
          })}
      </Container>
    </section>
  );
};

export default Collections;
