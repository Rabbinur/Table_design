import React, { useRef, useState } from "react";
import Draggable from "react-draggable";
import TShirt from "../assets/thsirt.jpeg";

const TShirtDesigner = () => {
  const [logo, setLogo] = useState(null);
  const [logoSize, setLogoSize] = useState({ width: 100, height: 100 });
  const [logoPosition, setLogoPosition] = useState({ x: 150, y: 150 });
  const canvasRef = useRef(null);

  // Handle logo upload
  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setLogo(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle logo resizing
  const handleLogoResize = (e) => {
    const scale = parseInt(e.target.value, 10);
    setLogoSize({ width: scale, height: scale });
  };

  // Generate the final T-shirt image with the logo
  const generateFinalImage = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
  
    const tShirtImg = new Image();
    tShirtImg.src = TShirt;
  
    tShirtImg.onload = () => {
      // Set canvas dimensions to match T-shirt image dimensions
      canvas.width = tShirtImg.width;
      canvas.height = tShirtImg.height;
      ctx.drawImage(tShirtImg, 0, 0);
  
      if (logo) {
        const logoImg = new Image();
        logoImg.src = logo;
  
        logoImg.onload = () => {
          // Calculate scaling factors between preview and actual T-shirt image
          const scaleX = tShirtImg.width / 400; // Preview width (400px)
          const scaleY = tShirtImg.height / 500; // Preview height (500px)
  
          // Map the logo's position and size from preview to canvas
          const mappedX = logoPosition.x * scaleX;
          const mappedY = logoPosition.y * scaleY;
          const mappedWidth = logoSize.width * scaleX;
          const mappedHeight = logoSize.height * scaleY;
  
          // Clamp position to ensure it doesn't exceed the canvas boundary
          const clampedX = Math.max(
            0,
            Math.min(mappedX, canvas.width - mappedWidth)
          );
          const clampedY = Math.max(
            0,
            Math.min(mappedY, canvas.height - mappedHeight)
          );
  
          // Draw the logo on the canvas
          ctx.drawImage(
            logoImg,
            clampedX,
            clampedY,
            mappedWidth,
            mappedHeight
          );
  
          // Generate and download the final image
          const finalImage = canvas.toDataURL("image/png");
          const link = document.createElement("a");
          link.href = finalImage;
          link.download = "tshirt-with-logo.png";
          link.click();
        };
      }
    };
  };
  

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">T-Shirt Designer</h1>

      {/* Upload Logo */}
      <div className="mb-4">
        <label className="block font-medium mb-2">Upload Logo:</label>
        <input type="file" accept="image/*" onChange={handleLogoUpload} />
      </div>

      {/* Resize Logo */}
      {logo && (
        <div className="mb-4">
          <label className="block font-medium mb-2">Resize Logo:</label>
          <input
            type="range"
            min="50"
            max="200"
            value={logoSize.width}
            onChange={handleLogoResize}
          />
        </div>
      )}

      {/* T-shirt Preview */}
      <div className="relative flex border border-gray-300 inline-block">
        <img
          src={TShirt}
          alt="T-Shirt"
          className="block"
          style={{ width: 400, height: 500 }}
        />

        {logo && (
          <Draggable
            defaultPosition={{ x: logoPosition.x, y: logoPosition.y }}
            onStop={(e, data) => {
              setLogoPosition({ x: data.x, y: data.y });
            }}
          >
            <img
              src={logo}
              alt="Logo"
              style={{
                width: logoSize.width,
                height: logoSize.height,
                position: "absolute",
                cursor: "move",
              }}
            />
          </Draggable>
        )}
      </div>
      <canvas ref={canvasRef} className="hidden"></canvas>
      {/* Generate Final Image */}
    <div>
    <button
        onClick={generateFinalImage}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
      >
        Generate T-Shirt with Logo
      </button>
    </div>

      {/* Hidden Canvas for Final Image */}
      
    </div>
  );
};

export default TShirtDesigner;
