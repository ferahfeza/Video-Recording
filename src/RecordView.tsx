import React, { useState, useCallback } from 'react';
import { useReactMediaRecorder } from 'react-media-recorder';

const QUALITY_PRESETS = [
  { label: 'Düşük (1 Mbps)', value: 1000000 },
  { label: 'Orta (2.5 Mbps)', value: 2500000 },
  { label: 'Yüksek (5 Mbps)', value: 5000000 },
];

const RecordView: React.FC = () => {
  const [bitrate, setBitrate] = useState(2500000);
  const [recorderKey, setRecorderKey] = useState(0);

  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
    error
  } = useReactMediaRecorder({
    key: recorderKey, // force re-mount on bitrate change
    screen: true,
    mediaRecorderOptions: {
      mimeType: 'video/webm;codecs=vp9',
      videoBitsPerSecond: bitrate
    }
  });

  // Bitrate değişince kaydı sıfırla
  const handleBitrateChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setBitrate(Number(e.target.value));
    setRecorderKey(k => k + 1);
  }, []);

  return (
    <div>
      <p>Status: {status}</p>
      {error && <p style={{ color: 'red' }}>Hata: {error}</p>}
      <label>
        Video Kalitesi:
        <select value={bitrate} onChange={handleBitrateChange} style={{ marginLeft: 8 }}>
          {QUALITY_PRESETS.map(q => (
            <option key={q.value} value={q.value}>{q.label}</option>
          ))}
        </select>
      </label>
      <div style={{ margin: '16px 0' }}>
        <button onClick={startRecording}>Start Recording</button>
        <button onClick={stopRecording} style={{ marginLeft: 8 }}>Stop Recording</button>
      </div>
      <div style={{ marginTop: 16 }}>
        {mediaBlobUrl && (
          <video src={mediaBlobUrl} controls autoPlay loop style={{ width: 480 }} />
        )}
      </div>
    </div>
  );
};

export default RecordView;
