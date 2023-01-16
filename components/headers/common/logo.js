import React, { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";

const LogoImage = ({ logo }) => {
  return (
    <Fragment>
      <Link href={"/"}>
        <a>
          {/* next image for logo, where logo is large image and next image has sized for header logo */}
          {/* <Image src={logo} alt = "" className="img-fluid" width={100} height={100} /> */}
          <img
            src={logo}
            style={{ width: "90px", height: "auto" }}
            alt=""
            className="img-fluid"
          />
        </a>
      </Link>
    </Fragment>
  );
};

export default LogoImage;
