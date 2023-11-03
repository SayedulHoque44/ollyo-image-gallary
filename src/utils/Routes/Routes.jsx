import { createBrowserRouter } from "react-router-dom";
import Error from "../../Error/Error";
import ImageGallary from "../../ImageGallary/ImageGallary";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ImageGallary />,
    errorElement: <Error />,
  },
]);
