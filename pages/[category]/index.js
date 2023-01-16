import React, { useEffect, useState } from "react";
import CommonLayout from "../../components/shop/common-layout";
import { Container, Media, Row, Col } from "reactstrap";
import one from "../../public/assets/images/collection/1.jpg";
import { GET_SUBCAT_FROM_CAT } from "../../gql/queries";
import { useQuery } from "../../hooks";
import { useRouter } from "next/router";
import Link from "next/link";

const MasterCollection = ({ img, totalProducts, type, about, link, btn }) => {
  return (
    <Col lg="3" md="6">
      <div className="collection-block">
        <div>
          <Media
            src={img}
            className="img-fluid blur-up lazyload bg-img"
            alt=""
          />
        </div>
        <div className="collection-content">
          <h4>{totalProducts}</h4>
          <h3>{type}</h3>
          <p>{about}</p>
          <Link href={link}>
            <a className="btn btn-outline">{btn}</a>
          </Link>
        </div>
      </div>
    </Col>
  );
};

const Collection = () => {
  const [subCats, setSubCats] = useState([]);
  const router = useRouter();
  const { category } = router.query;

  const { data } = useQuery("subcategories", GET_SUBCAT_FROM_CAT, {
    modelName: "category",
    slug: category,
  });
  const mapDataToState = (data) => {
    return data.findSlug.data.attributes.sub_categories.data.map(
      ({ attributes }) => {
        const { name, slug } = attributes;
        const buttonText = "View Products";
        const link = `/${category}/${slug}`;
        return {
          name,
          slug,
          buttonText,
          link,
          img: one,
        };
      }
    );
  };
  useEffect(() => {
    if (data) {
      setSubCats(mapDataToState(data));
    }
  }, [data]);
  return (
    <CommonLayout title="home" subTitle="collection">
      <section className="collection section-b-space ratio_square ">
        <Container>
          <Row className="partition-collection">
            {subCats.map((data, i) => {
              return (
                <MasterCollection
                  key={i}
                  img={data.img.src}
                  // totalProducts={data.totalProducts}
                  type={data.name}
                  // about={data.about}
                  link={data.link}
                  btn={data.buttonText}
                />
              );
            })}
          </Row>
        </Container>
      </section>
    </CommonLayout>
  );
};

export default Collection;
