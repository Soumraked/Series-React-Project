import React from "react";
import Series from "../components/LastChapters/LastChapters";

//import axios from "axios";

function Home() {
  // React.useEffect(() => {
  //   const obtenerInfo = async () => {
  //     try {
  //       const token =
  //         "eyJhbGciOiJSUzI1NiIsImtpZCI6IjIxODQ1OWJiYTE2NGJiN2I5MWMzMjhmODkxZjBiNTY1M2UzYjM4YmYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20va29vbmdhIiwiYXVkIjoia29vbmdhIiwiYXV0aF90aW1lIjoxNTk0OTQyNzUzLCJ1c2VyX2lkIjoiUGkxcVZzdjd5ZVk2V0xhUExFVllXcEdmNEJqMSIsInN1YiI6IlBpMXFWc3Y3eWVZNldMYVBMRVZZV3BHZjRCajEiLCJpYXQiOjE1OTQ5NDI3NTMsImV4cCI6MTU5NDk0NjM1MywiZW1haWwiOiJzb3VtcmFrQGtvb2dhLnRrIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInNvdW1yYWtAa29vZ2EudGsiXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.mOrvkN4Z7gifNgCplHmb26hIWRa8jYNVk3QMvM29eqkRfbWa4g5chcHw3HBf5ZdHNNJH_SL31fIuGR5h1eSp-dCz1E5ciDnOrlSFbwrBehP5LiVXv_x0MJq2IxWix9uYLWHsXU_NmTXDKKUpqYFAoC8ZU7oixb_4gYjaNe12Rhn7iqNn0G9eF0h5V8bHAML1XLDbxdxaOxdctNeVjCfRwiOykOMB4IRETiCDth0wRT8AVlVwkSUvLsh4uxKhCz0J7VAbI7DuU6JhiEk4iVzgYMFQP1aso1Tx3KQB2VohFFCOdCOGzG4yGkCPozeCyRbEzN-92PQp5aSBK61Rg4ijNA";
  //       const res = await axios.post(
  //         "https://us-central1-koonga.cloudfunctions.net/api/auth/itemAuth",
  //         {},
  //         {
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       console.log(res.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   obtenerInfo();
  // }, []);
  return <Series />;
}

export default Home;
