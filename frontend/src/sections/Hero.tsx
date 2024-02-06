import HeroBackground from "@/components/HeroBackground";
import { Textarea } from "@/components/ui/textarea";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Map from "@/components/Map";

const Hero = () => {
  const [response, setResponse] = useState(null);

  const handlePredict = async () => {
    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: "your_query_here" }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setResponse(data);
    } catch (error: any) {
      console.error("Error:", error.message);
    }
  };

  return (
    <section
      className="w-full flex xl:flex-row flex-col justify-center min-h-screen gap-10 max-container"
    >
      <div className="relative xl:w-2/5 flex flex-col justify-center items-start w-full  max-xl:padding-x">
        <h1 className="font-palanquin text-6xl max-sm:text-[72px] max-sm:leading-[82px] font-bold">
          <span className="xl:bg-white xl:whitespace-nowrap relative z-10 pr-10">
            Find origin of text
          </span>
        </h1>

        <p className="font-montserrat text-slate-gray text-lg leading-8 mt-6 mb-6 sm:max-w-sm">
          Enter the text you want to find the location it came from.
        </p>

        <Textarea></Textarea>

        <Button className="mt-10">
          Get Location <MapPin className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="relative flex-1 flex justify-center items-center xl:min-h-screen max-xl:py-40 bg-primary bg-cover bg-center">
        <Map />
      </div>
    </section>
  );
};

export default Hero;
