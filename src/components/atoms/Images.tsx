import { useEffect, useState } from "react";
export default function ImageComponent({ src }: { src: string }) {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [loadingPercent, setLoadingPercent] = useState(0);
  const [blurAmount, setBlurAmount] = useState(10);

  useEffect(() => {
    const img = new Image();
    img.src = src;

    const updateBlur = () => {
      setBlurAmount((prevBlur) => {
        const diff = loadingPercent / 10 - prevBlur;
        const step = diff / 1;
        return prevBlur + step;
      });
    };

    img.onload = () => {
      setLoadingPercent(100);
      const animation = () => {
        updateBlur();
        blurAmount < loadingPercent / 10
          ? requestAnimationFrame(animation)
          : setImage(img);

        requestAnimationFrame(animation);
      };
    };

    img.onprogress = (e) => {
      if (e.lengthComputable) {
        console.log(e);
        const percent = (e.loaded / e.total) * 100;
        setLoadingPercent(percent);
      }
    };
  }, [src, blurAmount]);

  console.log(image);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "200px",
        background: "#fff",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          filter: `blur(${blurAmount}px)`,
          transition: "filter 0.5s ease-out",
        }}
      >
        {image && "asdasd"}
        {loadingPercent > 100 && image && (
          <img
            src={image.src}
            alt="example"
            style={{ width: "100%", height: "100%" }}
          />
        )}
      </div>
    </div>
  );
}
