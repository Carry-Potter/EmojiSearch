import React, { useState, useEffect } from "react";
import "./emoji.css";

const EmojiSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [emojis, setEmojis] = useState([]);

  // Efekt za dohvatanje podataka o emojijima s udaljenog servera
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://gist.githubusercontent.com/VPetar/e1cd462371d438ff863e09983072007b/raw/52087f314f4f763ae0a81fcb9f340bf0a1f2a41a/json"
        );
        const data = await response.json();
        setEmojis(data);
      } catch (error) {
        console.error("Pogreška prilikom dohvaćanja emojija:", error);
      }
    };

    fetchData();
  }, []);

  // Funkcija za praćenje promene unosa u pretraživaču
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Funkcija koja se poziva prilikom klika na emoji, kopira ga prikazuje poruku
  const handleEmojiClick = (emoji) => {
    navigator.clipboard.writeText(emoji.symbol);
    alert(`Emoji ${emoji.title} is copied to clipboard`);
  };

  // Filtriranje emojija ovisno o unesenom pojmu i prikaz samo prvih 10 rezultata
  const filteredEmojis = emojis
    .filter((emoji) => {
      const searchTerms = searchTerm.toLowerCase().split(" ");
      return searchTerms.every((term) =>
        emoji.keywords
          .toLowerCase()
          .split(" ")
          .some((keyword) => keyword.startsWith(term))
      );
    })
    .slice(0, 10);

  
  return (
    <div class="form">
      <div className="emoji">
        {filteredEmojis.map((emoji) => (
          <span
            key={emoji.title}
            onClick={() => handleEmojiClick(emoji)}
            style={{ cursor: "pointer", margin: "5px" }}
            title={emoji.title}
          >
            {emoji.symbol}
          </span>
        ))}
      </div>
      <br />
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleInputChange}
        className="form__input"
      />
    </div>
  );
};

export default EmojiSearch;
