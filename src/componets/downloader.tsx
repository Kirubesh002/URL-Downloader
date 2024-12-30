import { useState } from "react";

const Downloader = () => {
  const [url, setUrl] = useState("");

  const downloadURL = () => {
    if (!url) {
      alert("Please enter a valid URL.");
      return;
    }
    console.log(`Fetching URL: ${url}`);
    fetchFile(url);
  };

  const fetchFile = (url: any) => {
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    fetch(proxyUrl + url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.blob();
      })
      .then((blob) => {
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = "downloadedFile";
        link.click();
        console.log("File downloaded successfully!");
      })
      .catch((err) => {
        console.error("Error fetching file:", err);
        alert("Failed to download the file. Check the URL or try again.");
      });
  };

  return (
    <>
      <div>
        <h1>Downloader</h1>
      </div>
      <div className="input">
        <input
          type="text"
          placeholder="Enter your URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </div>
      <div className="btn">
        <button onClick={downloadURL}>Download</button>
      </div>
    </>
  );
};

export default Downloader;
