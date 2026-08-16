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
  return voice.lang.toLowerCase().replaceAll("_", "-");
}

function voiceScore(voice: SpeechSynthesisVoice) {
  const name = voice.name.toLowerCase();
  let score = voiceLanguage(voice) === "zh-hk" ? 1000 : 0;
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
    .filter((voice) => voiceLanguage(voice) === "zh-hk")
    .sort((left, right) => voiceScore(right) - voiceScore(left))[0];
}

function useSpeechVoices() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const updateVoices = () => setVoices(readVoices());
    window.speechSynthesis.addEventListener("voiceschanged", updateVoices);
    const timer = window.setTimeout(updateVoices, 0);
    return () => {
      window.clearTimeout(timer);
      window.speechSynthesis.removeEventListener("voiceschanged", updateVoices);
    };
  }, []);

  return voices;
}

export function CantoneseAudio({ text, label = `播放：${text}`, compact = false }: CantoneseAudioProps) {
  const voices = useSpeechVoices();
  const preferredVoice = useMemo(() => chooseCantoneseVoice(voices), [voices]);
  const [speaking, setSpeaking] = useState(false);
  const [audioError, setAudioError] = useState(false);

  function speak() {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setAudioError(true);
      return;
    }

    setAudioError(false);
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "zh-HK";
    utterance.rate = 0.72;
    utterance.pitch = 1;
    if (preferredVoice) utterance.voice = preferredVoice;
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => {
      setSpeaking(false);
      setAudioError(true);
    };
    window.speechSynthesis.speak(utterance);
  }

  const voiceHint = preferredVoice ? `使用：${preferredVoice.name}` : voices.length ? "未检测到 zh-HK 音色，将尝试系统粤语发音" : "正在加载香港粤语音色";

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
  const status = preferredVoice ? `香港粤语 · ${preferredVoice.name}` : voices.length ? "未检测到 zh-HK 音色，将尝试系统粤语发音" : "正在读取设备音色…";

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
