import React from "react";
import RandomSong from "./components/RandomSong";

// Import date-fns for date and time formatting
import { format } from "date-fns";

const HomePage = () => {
  // Get the current date and time
  const currentDate = new Date();

  return (
    <div className="container mx-auto p-4">
      {/* Stylized date and time */}
      <div className="mt-4 text-2xl text-white">
        {/* Use the date-fns library to format the date and time */}
        {format(currentDate, "MMMM d, yyyy h:mm a")}
      </div>
      {/* Apply the gradient text class to the h1 */}
      <h1 className={`text-4xl text-center green_gradient my-6 font-semibold green_gradient`}>
        Random Song
      </h1>
      <RandomSong />
    </div>
  );
};

export default HomePage;
