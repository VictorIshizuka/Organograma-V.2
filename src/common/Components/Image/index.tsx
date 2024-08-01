import { useEffect, useState } from "react";

import { Avatar, SxProps } from "@mui/material";

interface ImageProps {
  image?: string;
  name?: string;
  sx?: SxProps;
  sizes?: "small" | "large";
}

export const ImageComponent = ({
  image,
  name,
  sx,
  ...rest
}: ImageProps): JSX.Element => {
  const profileImage =
    "https://www.bing.com/images/search?view=detailV2&ccid=GqGVPkLp&id=94002B2B27577511EBF1D290A93BF5F409734B2A&thid=OIP.GqGVPkLpUlSo5SmeDogUdwHaHa&mediaurl=https%3a%2f%2fstatic.vecteezy.com%2fsystem%2fresources%2fpreviews%2f005%2f544%2f718%2foriginal%2fprofile-icon-design-free-vector.jpg&cdnurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.1aa1953e42e95254a8e5299e0e881477%3frik%3dKktzCfT1O6mQ0g%26pid%3dImgRaw%26r%3d0&exph=1920&expw=1920&q=Profile+Icon&simid=608008172643186906&FORM=IRPRST&ck=6943E90F38D662B28E0EAED729261C37&selectedIndex=0&itb=0";
  const [hasImage, setHasImage] = useState(image);

  useEffect(() => {
    if (hasImage === null) return setHasImage(profileImage);
  }, [hasImage]);

  return <Avatar {...rest} src={image} sx={sx} alt={name} />;
};
