import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";

export default function Footer() {
  return (
    <MDBFooter className="bg-dark text-center text-white">
      <MDBContainer className="p-4 pb-0">
        <h6>Created by </h6>

        <section className="mb-4">
          <div className="footer">
            <div>
              <h6>Timon</h6>
              <MDBBtn
                outline
                color="light"
                floating
                className="m-1"
                href="#!"
                role="button"
              >
                <a
                  href="https://www.linkedin.com/in/timonschell/"
                  target="_blank"
                >
                  <MDBIcon fab icon="linkedin-in" />
                </a>
              </MDBBtn>

              <MDBBtn
                outline
                color="light"
                floating
                className="m-1"
                href="#!"
                role="button"
              >
                <a href="https://github.com/Apollosport" target="_blank">
                  <MDBIcon fab icon="github" />
                </a>
              </MDBBtn>
            </div>
            <h6>&</h6>

            <div>
              <h6> Antonio</h6>
              <MDBBtn
                outline
                color="light"
                floating
                className="m-1"
                href="#!"
                role="button"
              >
                <a
                  href="https://www.linkedin.com/in/antonio-macan/"
                  target="_blank"
                >
                  {" "}
                  <MDBIcon fab icon="linkedin-in" />
                </a>
              </MDBBtn>

              <MDBBtn
                outline
                color="light"
                floating
                className="m-1"
                href="#!"
                role="button"
              >
                <a href="https://github.com/Macanijus" target="_blank">
                  <MDBIcon fab icon="github" />
                </a>
              </MDBBtn>
            </div>
          </div>
        </section>
      </MDBContainer>

      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        © 2023 Copyright:
        <a className="text-white" href="https://mdbootstrap.com/"></a>
        Timon&Antonio
      </div>
    </MDBFooter>
  );
}
