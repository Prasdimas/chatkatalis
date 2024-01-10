import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";

export default function Translation({ doStuff, setInput, name, description,awal,result,click }) {
  const [autoTypedResult, setAutoTypedResult] = useState("");
  useEffect(() => {
    if (result.length > 0) {
      autoTypeResult(result);
    }
  }, [result]);

  useEffect(() => {
    setAutoTypedResult("");
  }, [result]);
  

  const autoTypeResult = (text) => {
    let index = 0;
    let interval = setInterval(() => {
      if (index < text.length) {
        setAutoTypedResult((prevResult) => prevResult + text.charAt(index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 10);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFont("times", "roman");
    doc.setFontSize(12);
  
    const pageWidth = doc.internal.pageSize.getWidth();
    const splitText = doc.splitTextToSize(autoTypedResult, pageWidth - 20);
  
    let yPos = 10;
  
    splitText.forEach((text, index) => {
      if (yPos > doc.internal.pageSize.getHeight() - 20) {
        doc.addPage();
        yPos = 10;
      }
  
      doc.text(10, yPos, text);
      yPos += 12;
    });
  
    // Tambahkan nilai dari textarea kedua ke PDF
    const textarea2Text = document.querySelector(".text-area").value;
    const splitTextarea2Text = doc.splitTextToSize(textarea2Text, pageWidth - 20);
  
    splitTextarea2Text.forEach((text, index) => {
      if (yPos > doc.internal.pageSize.getHeight() - 20) {
        doc.addPage();
        yPos = 10;
      }
  
      doc.text(10, yPos, text);
      yPos += 12;
    });
  
    doc.save("chatGPT katalis.pdf");
  };

  return (
    <div>
            <h3 className='button is-normal is-link mt-5'>{name}</h3>
      <p>{description}</p>
      <textarea
        className="text-area"
        cols={30}
        rows={5}
        onChange={(e) => setInput(`${awal} ${e.target.value}`)}
        placeholder="Masukkan teks kesini dengan spesifik"
      ></textarea>
      <button className="action-btn" onClick={() => {
  if (click > 0) {
    doStuff();
  } else {
    alert('Maaf Token anda Habis.');
  }
}}>
        Proses Sekarang
      </button>
      <button className="action-btn" onClick={exportToPDF}>
        Export ke PDF
      </button>
 <textarea
    cols="200" 
    rows="5"
  value={autoTypedResult || "Hasil Akan Muncul Disini "} 
  className="result-text"
></textarea>
    </div>
  );
}
