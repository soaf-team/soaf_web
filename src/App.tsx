import { useEffect } from "react";
import { ProviderGroup } from "./providers";
import { Stack } from "./stackflow";

if (import.meta.env.MODE === "production") {
  console.log = () => {};
}

function App() {
  useEffect(() => {
    const modalDiv = document.getElementById("modal");
    if (!modalDiv) {
      const div = document.createElement("div");
      div.id = "modal";
      document.body.appendChild(div);
    }
  }, []);

  return (
    <ProviderGroup>
      <div className="relative max-w-window mx-auto shadow-shadow1">
        <Stack />
      </div>
    </ProviderGroup>
  );
}

export default App;
