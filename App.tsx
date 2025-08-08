import React, { useState, useEffect } from "react";
import { Button } from "./components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import {
  Mic,
  MicOff,
  Volume2,
  RefreshCw,
  Square,
} from "lucide-react";

const BARK_TRANSLATIONS = [
  "I demand a raise in treats.",
  "The cat started it. I swear.",
  "Why do you leave the room every time I fart?",
  "Is this... is this the vet again?!",
  "I dream of chasing mailmen. But also... dreams scare me.",
  "Let's discuss the squirrels. We have a problem.",
  "You left me for 4 minutes. It felt like 4 eternities.",
  "The mailman is clearly a threat to democracy.",
  "I have existential questions about tennis balls.",
  "Why does the vacuum cleaner hate me specifically?",
  "I saw a leaf move. This is not a drill.",
  "My food bowl is 90% full. This is basically starvation.",
  "The doorbell is a portal to hell and I must protect you.",
  "I've been thinking... what if cats are the real masterminds?",
  "That squirrel outside? Yeah, we have history.",
  "I would like to file a complaint about bath time.",
  "The couch is my office and I take my job very seriously.",
  "I need you to know that I love you but also your sandwich.",
  "The garbage truck is my nemesis and today we settle this.",
  "I have thoughts about your choice in house guests.",
  "Why do you keep fake throwing the ball? This is psychological warfare.",
  "I'm not fat, I'm just cultivating mass for winter.",
  "That bird outside just insulted my mother. Probably.",
  "I have a business proposal: more belly rubs, fewer baths.",
  "The doormat is suspicious and I don't trust it.",
  "Shabari think he is shabari but he is shubari.",
];

const BARK_PERSONALITIES = [
  "Anxious Philosopher",
  "Drama Queen",
  "Food-Driven Economist",
  "Paranoid Security Chief",
  "Nap Enthusiast",
  "Chaos Agent",
  "Existential Crisis Manager",
  "Professional Treat Negotiator",
  "Amateur Squirrel Investigator",
  "Couch Potato Overlord",
];

const ANALYZING_MESSAGES = [
  "Analyzing bark waves...",
  "Decoding woofs and ruffs...",
  "Consulting dog dictionary...",
  "Processing tail wag data...",
  "Interpreting snout signals...",
  "Accessing bark database...",
  "Translating good boy language...",
];

export default function App() {
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [translation, setTranslation] = useState("");
  const [personality, setPersonality] = useState("");
  const [analyzingMessage, setAnalyzingMessage] = useState("");
  const [recordingTime, setRecordingTime] = useState(0);
  const [isHoldMode, setIsHoldMode] = useState(false);

  // Recording timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 0.1);
      }, 100);
    } else {
      setRecordingTime(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  // Analyzing message rotation effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAnalyzing) {
      interval = setInterval(() => {
        const randomMessage =
          ANALYZING_MESSAGES[
            Math.floor(
              Math.random() * ANALYZING_MESSAGES.length,
            )
          ];
        setAnalyzingMessage(randomMessage);
      }, 800);
    }
    return () => clearInterval(interval);
  }, [isAnalyzing]);

  const startRecording = () => {
    setIsRecording(true);
    setTranslation("");
    setPersonality("");
  };

  const stopRecording = () => {
    if (recordingTime < 0.5) return; // Minimum recording time

    setIsRecording(false);
    setIsAnalyzing(true);
    setIsHoldMode(false);

    // Simulate analysis time
    setTimeout(() => {
      const randomTranslation =
        BARK_TRANSLATIONS[
          Math.floor(Math.random() * BARK_TRANSLATIONS.length)
        ];
      const randomPersonality =
        BARK_PERSONALITIES[
          Math.floor(Math.random() * BARK_PERSONALITIES.length)
        ];

      setTranslation(randomTranslation);
      setPersonality(randomPersonality);
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleMouseDown = () => {
    setIsHoldMode(true);
    startRecording();
  };

  const handleMouseUp = () => {
    if (isHoldMode) {
      stopRecording();
    }
  };

  const handleClick = () => {
    // Only handle click if not in hold mode
    if (!isHoldMode) {
      if (isRecording) {
        stopRecording();
      } else {
        startRecording();
      }
    }
  };

  const generateNew = () => {
    const randomTranslation =
      BARK_TRANSLATIONS[
        Math.floor(Math.random() * BARK_TRANSLATIONS.length)
      ];
    const randomPersonality =
      BARK_PERSONALITIES[
        Math.floor(Math.random() * BARK_PERSONALITIES.length)
      ];
    setTranslation(randomTranslation);
    setPersonality(randomPersonality);
  };

  const speakTranslation = () => {
    if (translation && "speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(
        translation,
      );
      utterance.rate = 0.8;
      utterance.pitch = 1.2;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-md mx-auto pt-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl mb-2">🐶 BarkGPT</h1>
          <p className="text-muted-foreground">
            The world's most accurate* dog translator
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            *100% scientifically inaccurate
          </p>
        </div>

        {/* Recording Interface */}
        <Card className="mb-6">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-lg">
              Ready to Translate?
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="relative mb-4">
              <Button
                size="lg"
                variant={
                  isRecording ? "destructive" : "default"
                }
                className={`w-24 h-24 rounded-full ${
                  isRecording ? "animate-pulse" : ""
                }`}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onTouchStart={handleMouseDown}
                onTouchEnd={handleMouseUp}
                onClick={handleClick}
                disabled={isAnalyzing}
              >
                {isRecording ? (
                  <Square className="w-8 h-8" />
                ) : (
                  <Mic className="w-8 h-8" />
                )}
              </Button>

              {isRecording && (
                <div className="absolute -inset-2 rounded-full border-4 border-red-300 animate-ping" />
              )}
            </div>

            <p className="text-sm text-muted-foreground mb-2">
              {isRecording
                ? `Recording... ${recordingTime.toFixed(1)}s`
                : "Click to start or hold to record"}
            </p>

            {isRecording && (
              <Button
                variant="outline"
                size="sm"
                onClick={stopRecording}
                className="flex items-center gap-2"
              >
                <Square className="w-4 h-4" />
                Stop Recording
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Analysis State */}
        {isAnalyzing && (
          <Card className="mb-6">
            <CardContent className="text-center py-8">
              <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4" />
              <p className="text-sm">{analyzingMessage}</p>
            </CardContent>
          </Card>
        )}

        {/* Translation Results */}
        {translation && !isAnalyzing && (
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">
                  Translation Result
                </CardTitle>
                {personality && (
                  <Badge
                    variant="secondary"
                    className="text-xs"
                  >
                    {personality}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-lg mb-4">
                <p className="text-center italic">
                  "{translation}"
                </p>
              </div>

              <div className="flex gap-2 justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={speakTranslation}
                  className="flex items-center gap-2"
                >
                  <Volume2 className="w-4 h-4" />
                  Speak
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={generateNew}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  New Translation
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <div className="text-center text-xs text-muted-foreground">
          <p>
            No actual dogs were harmed in the making of this
            translation.
          </p>
          <p className="mt-1">
            Results may vary. Side effects include excessive
            laughter.
          </p>
        </div>
      </div>
    </div>
  );
}