import { createBrowserRouter } from "react-router-dom";
import ImageGallary from "../../ImageGallary/ImageGallary";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <ImageGallary />,
  },
]);
