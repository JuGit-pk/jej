import React, { useEffect, useState } from "react";
import CommonLayout from "../../../components/shop/common-layout";
import ProductList from "../../../components/shop/productList";
import { Container, Row } from "reactstrap";
import FilterPage from "../../../components/shop/filter";
import useBreadcrumbs from "../../../hooks/useBreadcrumbs";
import { useRouter } from "next/router";
import { useQuery } from "../../../hooks";
import { GET_PRODUCTS_BY_SUB_CATEGORY } from "../../../gql/queries";

const SubCategory = () => {
  const [sidebarView, setSidebarView] = useState(false);
  const [products, setProducts] = useState([]);
  const [cat, subCat] = useBreadcrumbs(router);

  const router = useRouter();
  const { subCategory } = router.query;

  const { data: productsData } = useQuery(
    "subcategory-products",
    GET_PRODUCTS_BY_SUB_CATEGORY,
    {
      subCategory,
    }
  );

  const openCloseSidebar = () => {
    if (sidebarView) {
      setSidebarView(!sidebarView);
    } else {
      setSidebarView(!sidebarView);
    }
  };

  const mapDataToProps = (data) => {
    data.products.data.map(({ attributes }) => {
      // extracting product fields

      setProducts((pre) => [...pre, { ...attributes }]);
    });
  };

  useEffect(() => {
    if (productsData) {
      mapDataToProps(productsData);
    }
  }, [productsData]);

  return (
    <CommonLayout title={cat} subTitle={subCat}>
      <section className="section-b-space ratio_asos">
        <div className="collection-wrapper">
          <Container>
            <Row>
              <FilterPage
                sm="3"
                sidebarView={sidebarView}
                closeSidebar={() => openCloseSidebar(sidebarView)}
              />
              <ProductList
                colClass="col-xl-3 col-6 col-grid-box"
                layoutList=""
                openSidebar={() => openCloseSidebar(sidebarView)}
                data={products}
              />
            </Row>
          </Container>
        </div>
      </section>
    </CommonLayout>
  );
};

export default SubCategory;
