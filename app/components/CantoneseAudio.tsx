"use client";

import { useEffect, useMemo, useState } from "react";

type CantoneseAudioProps = {
  text: string;
  label?: string;
  compact?: boolean;
  rate?: number;
};

const VOICE_STORAGE_KEY = "vivid-cantonese-selected-voice";
const VOICE_CHANGED_EVENT = "vivid-cantonese-voice-changed";

function readVoices() {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return [];
  return window.speechSynthesis.getVoices();
}

function voiceLanguage(voice: SpeechSynthesisVoice) {
  return voice.lang.toLowerCase().replaceAll("_", "-").trim();
}

function voiceMetadata(voice: SpeechSynthesisVoice) {
  return `${voiceLanguage(voice)} ${voice.voiceURI.toLowerCase().replaceAll("_", "-")}`;
}

function hasCantoneseLanguageHint(voice: SpeechSynthesisVoice) {
  const language = voiceLanguage(voice);
  const metadata = voiceMetadata(voice);

  // Browsers and operating systems use several equivalent Cantonese tags:
  // yue, yue-HK, zh-HK, zh-Hant-HK, and vendor URI variants of those tags.
  if (language === "yue" || language.startsWith("yue-")) return true;
  if (language === "zh-hk" || language.startsWith("zh-hk-")) return true;
  if (language === "zh-hant-hk" || language.startsWith("zh-hant-hk-")) return true;
  if (/(?:^|[._-])yue(?:[._-]|$)/.test(metadata)) return true;
  if (/(?:^|[._-])zh(?:[._-]hant)?[._-]hk(?:[._-]|$)/.test(metadata)) return true;
  return false;
}

function hasCantoneseNameHint(voice: SpeechSynthesisVoice) {
  const name = voice.name.toLowerCase();
  return name.includes("cantonese") || name.includes("廣東話") || name.includes("粵語") || name.includes("粤语");
}

function hasHongKongNameHint(voice: SpeechSynthesisVoice) {
  const name = voice.name.toLowerCase();
  return name.includes("hong kong") || name.includes("香港");
}

function voiceLocaleScore(voice: SpeechSynthesisVoice) {
  const language = voiceLanguage(voice);
  const metadata = voiceMetadata(voice);
  if (!hasCantoneseLanguageHint(voice)) return 0;
  if (language === "yue-hk") return 1400;
  if (language === "yue") return 1380;
  if (language.startsWith("yue-")) return 1360;
  if (language === "zh-hk") return 1320;
  if (language === "zh-hant-hk") return 1300;
  if (language.startsWith("zh-hk-") || language.startsWith("zh-hant-hk-")) return 1280;
  if (/(?:^|[._-])yue(?:[._-]|$)/.test(metadata)) return 1240;
  if (/(?:^|[._-])zh(?:[._-]hant)?[._-]hk(?:[._-]|$)/.test(metadata)) return 1220;
  return 0;
}

function voiceNameScore(voice: SpeechSynthesisVoice) {
  if (hasCantoneseNameHint(voice)) return 600;
  // Only use Hong Kong in the name as a Cantonese hint when the locale is
  // already Chinese/Cantonese; this avoids accidentally showing en-HK voices.
  if (hasHongKongNameHint(voice) && /^(?:zh|yue)(?:-|$)/.test(voiceLanguage(voice))) return 520;
  return 0;
}

function voiceScore(voice: SpeechSynthesisVoice) {
  let score = voiceLocaleScore(voice) + voiceNameScore(voice);
  if (!score && hasCantoneseNameHint(voice)) score = 1000;
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

function voiceKey(voice: SpeechSynthesisVoice) {
  return voice.voiceURI || `${voice.name}::${voice.lang}`;
}

function listCantoneseVoices(voices: SpeechSynthesisVoice[]) {
  const seen = new Set<string>();
  return voices
    .filter((voice) => voiceScore(voice) > 0)
    .filter((voice) => {
      const key = voiceKey(voice);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .sort((left, right) => voiceScore(right) - voiceScore(left) || left.name.localeCompare(right.name));
}

function chooseCantoneseVoice(voices: SpeechSynthesisVoice[]) {
  return listCantoneseVoices(voices)[0];
}

function readSelectedVoiceKey() {
  if (typeof window === "undefined") return "";
  try {
    return window.localStorage.getItem(VOICE_STORAGE_KEY) || "";
  } catch {
    return "";
  }
}

function saveSelectedVoice(voice: SpeechSynthesisVoice) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(VOICE_STORAGE_KEY, voiceKey(voice));
  } catch {
    // Some private browsing modes block preference storage; playback still works.
  }
  window.dispatchEvent(new CustomEvent(VOICE_CHANGED_EVENT));
}

function voiceQualityLabel(voice: SpeechSynthesisVoice) {
  const name = voice.name.toLowerCase();
  if (name.includes("premium")) return "Premium";
  if (name.includes("enhanced")) return "Enhanced";
  if (name.includes("natural") || name.includes("neural")) return "Natural";
  return voice.localService ? "本机音色" : "系统音色";
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

export function CantoneseAudio({ text, label = `播放：${text}`, compact = false, rate = 0.72 }: CantoneseAudioProps) {
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
    const selectedKey = readSelectedVoiceKey();
    const currentVoices = listCantoneseVoices(readVoices());
    const currentVoice = currentVoices.find((voice) => voiceKey(voice) === selectedKey) || preferredVoice || currentVoices[0];
    utterance.lang = currentVoice?.lang || "zh-HK";
    utterance.rate = rate;
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
  const availableVoices = useMemo(() => listCantoneseVoices(voices), [voices]);
  const [selectedKey, setSelectedKey] = useState("");
  const [expanded, setExpanded] = useState(false);
  const preferredVoice = useMemo(() => availableVoices.find((voice) => voiceKey(voice) === selectedKey) || availableVoices[0], [availableVoices, selectedKey]);

  useEffect(() => {
    const syncSelectedVoice = () => setSelectedKey(readSelectedVoiceKey());
    syncSelectedVoice();
    window.addEventListener(VOICE_CHANGED_EVENT, syncSelectedVoice);
    return () => window.removeEventListener(VOICE_CHANGED_EVENT, syncSelectedVoice);
  }, []);

  function selectVoice(voice: SpeechSynthesisVoice) {
    saveSelectedVoice(voice);
    setSelectedKey(voiceKey(voice));
  }

  const status = preferredVoice ? `香港粤语 · ${preferredVoice.name}` : voices.length ? "未检测到香港粤语音色，将尝试系统粤语发音" : "正在读取设备音色…";
  const preferredKey = preferredVoice ? voiceKey(preferredVoice) : "";

  return (
    <div className="audio-settings" aria-label="粤语语音设置">
      <div className="audio-settings-main">
        <span className="audio-settings-label">粤语语音</span>
        <strong>{status}</strong>
        <small>可展开查看当前设备已被浏览器读取的全部粤语音色，并手动选择试听声音。</small>
      </div>
      <div className="audio-settings-actions">
        <CantoneseAudio text="早晨，今日點呀？" label="试听：早晨，今日點呀？" compact />
        <button className="voice-list-toggle" type="button" aria-expanded={expanded} onClick={() => setExpanded((open) => !open)}>{expanded ? "收起音色" : `查看全部音色${availableVoices.length ? `（${availableVoices.length}）` : ""}`} <span>{expanded ? "↑" : "↓"}</span></button>
      </div>
      {expanded ? <div className="voice-choice-list" role="listbox" aria-label="可用粤语音色">{availableVoices.length ? availableVoices.map((voice) => { const selected = voiceKey(voice) === preferredKey; return <button className={`voice-choice${selected ? " selected" : ""}`} key={voiceKey(voice)} type="button" role="option" aria-selected={selected} onClick={() => selectVoice(voice)}><span className="voice-choice-mark" aria-hidden="true">{selected ? "✓" : "○"}</span><span className="voice-choice-copy"><strong>{voice.name}</strong><small>{voice.lang} · {voice.localService ? "本机已安装" : "系统提供"}</small></span><em>{voiceQualityLabel(voice)}</em></button>; }) : <p className="voice-empty">语音列表仍在加载中。请先点一次试听，或稍等片刻后重新展开。</p>}</div> : null}
    </div>
  );
}
