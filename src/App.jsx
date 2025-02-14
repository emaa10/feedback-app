import React, { useState, useEffect } from "react";
import { Card, CardContent } from "./components/Card.jsx";
import { Button } from "./components/Button.jsx";
import { Input } from "./components/Input.jsx";
import { Textarea } from "./components/Textarea.jsx";
import { Save, Upload, Star } from "lucide-react";

const categories = ["Wein", "Met", "Bier"];

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
    <div className="p-4 max-w-md mx-auto">
      {!selectedCategory ? (
        <div>
          <h1 className="text-xl font-bold mb-4">Feedback Übersicht</h1>
          {categories.map((cat) => (
            <Card key={cat} onClick={() => setSelectedCategory(cat)} className="mb-2 p-4 cursor-pointer">
              <CardContent className="flex justify-between">
                <span>{cat}</span>
                <span className="font-bold">{getAverageRating(cat)}</span>
              </CardContent>
            </Card>
          ))}
          <div className="flex justify-between mt-4">
            <Button onClick={exportData} className="flex items-center"><Save className="mr-2" /> Export</Button>
            <label className="flex items-center cursor-pointer">
              <Upload className="mr-2" /> Import
              <input type="file" onChange={importData} className="hidden" />
            </label>
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-lg font-bold mb-2">{selectedCategory} bewerten</h2>
          <div className="mb-4 flex">
            {[1, 2, 3, 4, 5, 6].map((num) => (
              <Button key={num} onClick={() => setRating(num)} className={`m-1 flex items-center ${rating === num ? "bg-blue-500 text-white" : ""}`}>
                <Star className="mr-1" /> {num}
              </Button>
            ))}
          </div>
          <Textarea placeholder="Dein Kommentar" value={comment} onChange={(e) => setComment(e.target.value)} className="mb-4 w-full" />
          <Button onClick={submitFeedback} className="w-full">Abschicken</Button>
        </div>
      )}
    </div>
  );
}

