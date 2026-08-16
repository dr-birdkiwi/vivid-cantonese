"use client";

import { useEffect, useMemo, useState } from "react";

type CantoneseAudioProps = {
  text: string;
  label?: string;
  compact?: boolean;
};

function readVoices() {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return [];
  return window.speechSynthesis.getVoices();
}

function voiceLanguage(voice: SpeechSynthesisVoice) {
  return voice.lang.toLowerCase().replaceAll("_", "-").trim();
}

function voiceLocaleScore(voice: SpeechSynthesisVoice) {
  const language = voiceLanguage(voice);
  if (language === "yue-hk") return 1200;
  if (language === "yue") return 1150;
  if (language === "zh-hk" || language === "zh-hant-hk") return 1100;
  if (language.startsWith("yue-")) return 1050;
  if (language.startsWith("zh-") && language.endsWith("-hk")) return 1000;
  return 0;
}

function voiceNameScore(voice: SpeechSynthesisVoice) {
  const name = voice.name.toLowerCase();
  if (name.includes("cantonese") || name.includes("廣東話") || name.includes("粵語") || name.includes("粤语")) return 500;
  if (name.includes("hong kong") || name.includes("香港")) return 450;
  return 0;
}

function voiceScore(voice: SpeechSynthesisVoice) {
  let score = voiceLocaleScore(voice) + voiceNameScore(voice);
  if (!score) return 0;
  const name = voice.name.toLowerCase();
  if (name.includes("premium")) score += 80;
  if (name.includes("enhanced")) score += 70;
  if (name.includes("natural")) score += 70;
  if (name.includes("neural")) score += 70;
  if (name.includes("microsoft")) score += 30;
  if (name.includes("google")) score += 25;
  if (name.includes("apple")) score += 20;
  if (voice.localService) score += 5;
  return score;
}

function chooseCantoneseVoice(voices: SpeechSynthesisVoice[]) {
  return voices
    .filter((voice) => voiceScore(voice) > 0)
    .sort((left, right) => voiceScore(right) - voiceScore(left))[0];
}

function toChineseSpeechText(text: string) {
  const chineseOnly = text.replace(/[A-Za-z0-9\u00C0-\u024F]/g, "").replace(/\s+/g, " ").trim();
  return chineseOnly || text;
}

function useSpeechVoices() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const updateVoices = () => setVoices(readVoices());
    window.speechSynthesis.addEventListener("voiceschanged", updateVoices);
    const timers = [0, 100, 300, 700, 1500].map((delay) => window.setTimeout(updateVoices, delay));
    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      window.speechSynthesis.removeEventListener("voiceschanged", updateVoices);
    };
  }, []);

  return voices;
}

export function CantoneseAudio({ text, label = `播放：${text}`, compact = false }: CantoneseAudioProps) {
  const voices = useSpeechVoices();
  const preferredVoice = useMemo(() => chooseCantoneseVoice(voices), [voices]);
  const speechText = useMemo(() => toChineseSpeechText(text), [text]);
  const [speaking, setSpeaking] = useState(false);
  const [audioError, setAudioError] = useState(false);

  function speak() {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setAudioError(true);
      return;
    }

    setAudioError(false);
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(speechText);
    const currentVoice = preferredVoice || chooseCantoneseVoice(readVoices());
    utterance.lang = currentVoice?.lang || "zh-HK";
    utterance.rate = 0.72;
    utterance.pitch = 1;
    if (currentVoice) utterance.voice = currentVoice;
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => {
      setSpeaking(false);
      setAudioError(true);
    };
    window.speechSynthesis.speak(utterance);
  }

  const voiceHint = preferredVoice ? `使用：${preferredVoice.name}` : voices.length ? "未检测到香港粤语音色，将尝试系统粤语发音" : "正在加载香港粤语音色";

  return (
    <button
      className={`speak-button${compact ? " compact" : ""}${speaking ? " is-speaking" : ""}`}
      onClick={speak}
      aria-label={label}
      title={`${label} · ${voiceHint}`}
      type="button"
    >
      <span aria-hidden="true">{speaking ? "◼" : "▶"}</span>
      {speaking ? "播放中" : compact ? "试听" : "试听粤语"}
      {audioError ? <small className="audio-error">重试</small> : null}
    </button>
  );
}

export function CantoneseAudioSettings() {
  const voices = useSpeechVoices();
  const preferredVoice = useMemo(() => chooseCantoneseVoice(voices), [voices]);
  const status = preferredVoice ? `香港粤语 · ${preferredVoice.name}` : voices.length ? "未检测到香港粤语音色，将尝试系统粤语发音" : "正在读取设备音色…";

  return (
    <div className="audio-settings" aria-label="粤语语音设置">
      <div>
        <span className="audio-settings-label">粤语语音</span>
        <strong>{status}</strong>
        <small>优先使用 premium / enhanced / natural 香港粤语音色；实际音质取决于设备已安装的声音。</small>
      </div>
      <CantoneseAudio text="早晨，今日點呀？" label="试听：早晨，今日點呀？" compact />
    </div>
  );
}
