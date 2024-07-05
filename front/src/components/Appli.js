import React, { useState, useRef, useEffect } from "react";
import "./App.css";

const App = () => {
  const canvasRef = useRef(null);
  const [context, setContext] = useState(null);
  const [tool, setTool] = useState("pencil");
  const [color, setColor] = useState("#000000");
  const [fillColor, setFillColor] = useState("#ffffff");
  const [pencilWidth, setPencilWidth] = useState(2);
  const [isDrawing, setIsDrawing] = useState(false);
  const [text, setText] = useState("");
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [endPoint, setEndPoint] = useState({ x: 0, y: 0 });
  const [isSaving, setIsSaving] = useState(false);
  const [isTextEditing, setIsTextEditing] = useState(false);
  const [textPosition, setTextPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.8;
    const ctx = canvas.getContext("2d");
    ctx.lineCap = "round";
    setContext(ctx);
  }, []);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    setStartPoint({ x: offsetX, y: offsetY });
    if (tool === "pencil" || tool === "eraser" || tool === "rectangle" || tool === "circle" || tool === "line") {
      setIsDrawing(true);
    } else if (tool === "text") {
      setTextPosition({ x: offsetX, y: offsetY });
      setIsTextEditing(true);
    }
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    switch (tool) {
      case "pencil":
        drawPencilLine(offsetX, offsetY);
        break;
      case "eraser":
        erase(offsetX, offsetY);
        break;
      case "rectangle":
        setEndPoint({ x: offsetX, y: offsetY });
        break;
      case "circle":
        setEndPoint({ x: offsetX, y: offsetY });
        break;
      case "line":
        setEndPoint({ x: offsetX, y: offsetY });
        break;
      default:
        break;
    }
  };

  const endDrawing = () => {
    setIsDrawing(false);
    if (tool === "rectangle") {
      drawRectangle();
    } else if (tool === "circle") {
      drawCircle();
    } else if (tool === "line") {
      drawLine();
    }
  };

  const drawPencilLine = (x, y) => {
    context.strokeStyle = color;
    context.lineWidth = pencilWidth;
    context.lineTo(x, y);
    context.stroke();
  };

  const erase = (x, y) => {
    context.clearRect(x - 5, y - 5, 10, 10);
  };

  const drawRectangle = () => {
    context.strokeStyle = color;
    context.strokeRect(startPoint.x, startPoint.y, endPoint.x - startPoint.x, endPoint.y - startPoint.y);
  };

  const drawCircle = () => {
    const radius = Math.sqrt(Math.pow(endPoint.x - startPoint.x, 2) + Math.pow(endPoint.y - startPoint.y, 2));
    context.beginPath();
    context.arc(startPoint.x, startPoint.y, radius, 0, 2 * Math.PI);
    context.stroke();
  };

  const drawLine = () => {
    context.strokeStyle = color;
    context.beginPath();
    context.moveTo(startPoint.x, startPoint.y);
    context.lineTo(endPoint.x, endPoint.y);
    context.stroke();
  };

  const saveImage = () => {
    setIsSaving(true);
    const link = document.createElement("a");
    link.download = "canvas_image.png";
    link.href = canvasRef.current.toDataURL();
    link.click();
    setIsSaving(false);
  };

  const handleFill = () => {
    context.fillStyle = fillColor;
    context.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const handleText = () => {
    setIsTextEditing(true);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleTextSubmit = (e) => {
    e.preventDefault();
    context.font = "25px Arial";
    context.fillStyle = color;
    context.fillText(text, textPosition.x, textPosition.y + 16); // Adjusting y position for proper text display
    setText("");
    setIsTextEditing(false);
  };

  const clearCanvas = () => {
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  return (
    <div className="App">
      <nav className="navbar">
        <button onClick={() => setTool("pencil")}>Pencil</button>
        <button onClick={() => setTool("eraser")}>Eraser</button>
        <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
        <input
          type="range"
          min="1"
          max="20"
          value={pencilWidth}
          onChange={(e) => setPencilWidth(e.target.value)}
        />
        <button onClick={() => setTool("rectangle")}>Rectangle</button>
        <button onClick={() => setTool("circle")}>Circle</button>
        <button onClick={() => setTool("line")}>Line</button>
        <button onClick={handleText}>Text</button>
        {isTextEditing && (
          <form onSubmit={handleTextSubmit}>
            <input type="text" value={text} onChange={handleTextChange} />
            <button type="submit">Submit</button>
          </form>
        )}
        <button onClick={handleFill}>Fill</button>
        <input type="color" value={fillColor} onChange={(e) => setFillColor(e.target.value)} />
        <button onClick={saveImage} disabled={isSaving}>
          Save
        </button>
        <button onClick={clearCanvas}>Clear</button>
      </nav>
      <canvas
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={endDrawing}
        onMouseLeave={endDrawing}
      />
    </div>
  );
};

export default App;
