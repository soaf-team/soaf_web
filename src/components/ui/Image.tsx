import { useFlow } from "@/stackflow";

type ImageProps = {
  src: string;
  alt: string;
} & Omit<React.HTMLAttributes<HTMLImageElement>, "src" | "alt">;

export const Image = ({ src, ...props }: ImageProps) => {
  const { push } = useFlow();

  const handleClickImage = () => {
    const imageId = src.split("/").pop()?.split(".")[0] || "";
    const encodedImageId = encodeURIComponent(imageId);

    push("ImageDetailPage", { src: encodedImageId, alt: "image" });
  };

  return <img onClick={handleClickImage} {...props} src={src} />;
};
