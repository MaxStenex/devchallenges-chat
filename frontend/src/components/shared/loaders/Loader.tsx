import Image from "next/image";
import React from "react";

type Props = {
  size: number;
};

export const Loader: React.FC<Props> = ({ size }) => {
  return <Image width={size} height={size} src="/images/loading.gif" alt="" />;
};
