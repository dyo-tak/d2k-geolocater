import React, { useState, useRef } from "react";
import { MapPin } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Map from "@/components/Map";

interface Coordinates {
  latitude: number;
  longitude: number;
}

const Hero: React.FC = () => {
  const [response, setResponse] = useState<any>(null);
  const [coordinates, setCoordinates] = useState<Coordinates>({
    latitude: 0,
    longitude: 0,
  });
  const [enteredText, setEnteredText] = useState("");

  const handlePredict = async () => {
    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: enteredText }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setResponse(data);

      setCoordinates({
        latitude: data.latitude,
        longitude: data.longitude,
      });
    } catch (error: any) {
      console.error("Error:", error.message);
    }
  };

  return (
    <section className="w-full flex xl:flex-row flex-col justify-center min-h-screen gap-10 max-container">
      <div className="relative xl:w-2/5 flex flex-col justify-center items-start w-full  max-xl:padding-x">
        <h1 className="font-palanquin text-6xl max-sm:mt-10 max-sm:text-[48px] max-sm:leading-[60px] font-bold">
          <span className="xl:bg-white xl:whitespace-nowrap relative z-10 pr-10">
            Find origin of text
          </span>
        </h1>

        <p className="font-montserrat text-slate-gray text-lg leading-8 mt-6 mb-6 sm:max-w-sm">
          Enter the text you want to find the location it came from.
        </p>

        <Textarea
          placeholder="Enter your text here"
          value={enteredText}
          onChange={(e) => setEnteredText(e.target.value)}
        />
        <Button className="mt-10" onClick={handlePredict}>
          Get Location <MapPin className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="sm:hidden">
        <Map coordinates={coordinates} />
      </div>

      <div className="max-sm:hidden relative flex-1 flex justify-center items-center xl:min-h-screen max-xl:py-40 bg-[#303436] bg-cover bg-center">
        <Map coordinates={coordinates} />
      </div>
    </section>
  );
};

export default Hero;
