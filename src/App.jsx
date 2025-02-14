import React, { useState, useEffect } from "react";
import { Card, CardContent } from "./components/Card.jsx";
import { Button } from "./components/Button.jsx";
import { Input } from "./components/Input.jsx";
import { Textarea } from "./components/Textarea.jsx";
import { Save, Upload, Star, WineGlass, Beer, Honey } from "lucide-react"; // Icons für die Kategorien

const categories = [
  { name: "Wein", icon: <WineGlass className="w-6 h-6 text-red-600" /> },
  { name: "Met", icon: <Honey className="w-6 h-6 text-yellow-600" /> },
  { name: "Bier", icon: <Beer className="w-6 h-6 text-yellow-800" /> },
];

export default function FeedbackApp() {
  const [feedbacks, setFeedbacks] = useState(() => {
    const saved = localStorage.getItem("feedbacks");
    return saved ? JSON.parse(saved) : { Wein: [], Met: [], Bier: [] };
  });
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    localStorage.setItem("feedbacks", JSON.stringify(feedbacks));
  }, [feedbacks]);

  const submitFeedback = () => {
    if (!selectedCategory || rating === null) return;
    setFeedbacks((prev) => {
      const updated = {
        ...prev,
        [selectedCategory]: [...prev[selectedCategory], { rating, comment }],
      };
      localStorage.setItem("feedbacks", JSON.stringify(updated));
      return updated;
    });
    setSelectedCategory(null);
    setRating(null);
    setComment("");
  };

  const getAverageRating = (category) => {
    const ratings = feedbacks[category].map((f) => f.rating);
    if (ratings.length === 0) return "-";
    return (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1);
  };

  const exportData = () => {
    const blob = new Blob([JSON.stringify(feedbacks, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "feedbacks.json";
    a.click();
  };

  const importData = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setFeedbacks(JSON.parse(e.target.result));
    };
    reader.readAsText(file);
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-lg rounded-lg">
      {!selectedCategory ? (
        <div>
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Feedback Übersicht</h1>
          {categories.map((cat) => (
            <Card
              key={cat.name}
              onClick={() => setSelectedCategory(cat.name)}
              className="mb-4 p-4 cursor-pointer hover:bg-gray-100 rounded-lg transition"
            >
              <CardContent className="flex items-center justify-between">
                <div className="flex items-center">
                  {cat.icon}
                  <span className="ml-2 text-xl text-gray-800">{cat.name}</span>
                </div>
                <span className="font-bold text-lg text-gray-700">{getAverageRating(cat.name)}</span>
              </CardContent>
            </Card>
          ))}
          <div className="flex justify-between mt-6">
            <Button onClick={exportData} className="flex items-center bg-blue-500 text-white hover:bg-blue-600 transition p-2 rounded">
              <Save className="mr-2" /> Export
            </Button>
            <label className="flex items-center cursor-pointer text-blue-500 hover:text-blue-600 transition">
              <Upload className="mr-2" /> Import
              <input type="file" onChange={importData} className="hidden" />
            </label>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-bold mb-4 text-center text-gray-800">{selectedCategory} bewerten</h2>
          <div className="mb-6 flex justify-center">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <Button
                key={num}
                onClick={() => setRating(num)}
                className={`m-1 p-2 rounded-full border border-gray-300 ${
                  rating === num ? "bg-blue-500 text-white" : "bg-white text-gray-800"
                } hover:bg-blue-400 hover:text-white transition`}
              >
                <Star className="mr-1" /> {num}
              </Button>
            ))}
          </div>
          <Textarea
            placeholder="Dein Kommentar"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="mb-6 w-full p-2 border border-gray-300 rounded text-gray-800"
          />
          <Button onClick={submitFeedback} className="w-full bg-green-500 text-white hover:bg-green-600 transition py-2 rounded">
            Abschicken
          </Button>
        </div>
      )}
    </div>
  );
}
