/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import "./VoiceCapture.scss";

const translates: Record<string, Record<string, string>> = {
  en: {
    speakNow: "Speak now...",
    noSpeech: "No speech detected.",
    audioCapture: "Audio capture failed.",
    enableMicrophone: "Please enable your microphone.",
  },
};

const VoiceCapture = ({
  start,
  lang = "en",
  mode = "fullscreen",
  onVoiceTranscript,
  onDeactivate,
}: any) => {
  const [recognizing, setRecognizing] = useState(false);
  const [animationButton, setAnimationButton] = useState(false);
  const recognitionRef = useRef<any>(null);
  const textTipRef = useRef<HTMLParagraphElement | null>(null);
  const finalTranscriptRef = useRef<string>("");

  useEffect(() => {
    if ("webkitSpeechRecognition" in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.lang = lang;
      recognition.interimResults = true;

      recognition.onstart = () => {
        setRecognizing(true);
        updateText("speakNow");
        setAnimationButton(true);
      };

      recognition.onerror = (event: any) => {
        console.error("Recognition error:", event.error);
        setAnimationButton(false);
        handleError(event.error);
      };

      recognition.onend = () => {
        setRecognizing(false);
        setAnimationButton(false);
        if (finalTranscriptRef.current) {
          updateText("");
          onVoiceTranscript(finalTranscriptRef.current);
        } else {
          console.warn("Recognition stopped without result.");
          updateText("noSpeech");
        }
        setTimeout(deactivateVoice, 5000);
      };

      recognition.onresult = handleResults;

      recognitionRef.current = recognition;
    } else {
      console.warn(
        "SpeechRecognition not supported, please update your browser."
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang, onVoiceTranscript]);

  useEffect(() => {
    start ? activateVoice() : deactivateVoice();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [start]);

  const activateVoice = () => {
    if (!recognizing && recognitionRef.current) {
      recognitionRef.current.lang = lang;
      finalTranscriptRef.current = "";
      setRecognizing(true);
      recognitionRef.current.start();
    }
  };

  const deactivateVoice = () => {
    setRecognizing(false);
    setAnimationButton(false);
    recognitionRef.current.stop();
    onDeactivate && onDeactivate();
  };

  const handleError = (error: string) => {
    console.warn("Handling error:", error);
    updateText(error);

    switch (error) {
      case "no-speech":
        updateText("noSpeech");
        break;
      case "audio-capture":
        updateText("audioCapture");
        break;
      case "not-allowed":
        updateText("enableMicrophone");
        break;
      default:
        console.warn("Unknown error:", error);
        break;
    }

    setTimeout(deactivateVoice, 5000);
  };

  const handleResults = (event: any) => {
    let interimTranscript = "";

    for (let i = event.resultIndex; i < event.results.length; ++i) {
      if (event.results[i].isFinal) {
        finalTranscriptRef.current += event.results[i][0].transcript;
      } else {
        interimTranscript += event.results[i][0].transcript;
      }
    }

    updateText(interimTranscript || finalTranscriptRef.current);

    if (finalTranscriptRef.current) {
      onVoiceTranscript(finalTranscriptRef.current);
      deactivateVoice();
    }
  };

  const updateText = (key: string) => {
    if (textTipRef.current) {
      textTipRef.current.textContent = getTranslation(key);
    }
  };

  const getTranslation = (key: string): string => {
    const translationsForLang = translates[lang] || translates["en"];
    return translationsForLang[key] || key;
  };

  return (
    <section
      className={`voicecapture ${start ? "active" : ""} ${mode ? mode : ""}`}
      onClick={() => deactivateVoice()}
    >
      <button className="exit" type="button" onClick={() => deactivateVoice}>
        <i className="icon icon-exit">X</i>
      </button>
      <p ref={textTipRef} className="text-tip"></p>
      <button
        type="button"
        className={`btn-voice ${animationButton ? "active" : ""}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path d="M17 11.998c0 2.76-2.23 5-4.99 5l-.002.002a4.994 4.994 0 01-4.979-5h-2c0 3.52 2.59 6.433 5.98 6.92v3.078h.01V22h2v-3.08h-.01A6.982 6.982 0 0019 11.998z" />
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M12 15c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v7c0 1.66 1.34 3 3 3z" />
        </svg>
      </button>
    </section>
  );
};

export default VoiceCapture;
